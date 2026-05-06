const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/db');

function autenticado(req, res, next) {
  if (req.session && req.session.email) return next();
  res.redirect('/login');
}

// Páginas estáticas
router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', (req, res) => res.render('home', { usuario: req.session.usuario_nome || null }));
router.get('/sobre', (req, res) => res.render('sobre', { usuario: req.session.usuario_nome || null }));
router.get('/infantil', (req, res) => res.render('infantil', { usuario: req.session.usuario_nome || null }));
router.get('/livro', (req, res) => res.render('livro', { usuario: req.session.usuario_nome || null }));

// Login
router.get('/login', (req, res) => {
  res.render('login', {
    erro: req.query.erro || null,
    sucesso: req.query.sucesso || null,
    sucesso_redefinir: req.query.sucesso_redefinir || null
  });
});

router.post('/login', (req, res) => {
  const { email_id, senha } = req.body;

  db.get('SELECT * FROM usuarios WHERE email = ?', [email_id], async (err, usuario) => {
    if (err || !usuario) return res.redirect('/login?erro=1');

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (senhaCorreta) {
      req.session.email = usuario.email;
      req.session.usuario_id = usuario.id;
      req.session.usuario_nome = usuario.nome;
      res.redirect('/home');
    } else {
      res.redirect('/login?erro=1');
    }
  });
});

// Cadastro
router.get('/cadastro', (req, res) => {
  res.render('cadastro', { erro: req.query.erro || null });
});

router.post('/cadastro', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  db.get('SELECT id FROM usuarios WHERE email = ?', [email], async (err, existe) => {
    if (err) return res.redirect('/cadastro?erro=sistema');
    if (existe) return res.redirect('/cadastro?erro=email_existe');

    const hash = await bcrypt.hash(senha, 10);
    db.run(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, hash, tipo || 'doador'],
      (err) => {
        if (err) return res.redirect('/cadastro?erro=sistema');
        res.redirect('/login?sucesso=1');
      }
    );
  });
});

// Esqueci a senha
router.get('/esqueci', (req, res) => {
  res.render('esqueci', { erro: req.query.erro || null });
});

router.post('/redefinir', async (req, res) => {
  const { email, nome, nova_senha } = req.body;

  db.get('SELECT id FROM usuarios WHERE email = ? AND nome = ?', [email, nome], async (err, usuario) => {
    if (err) return res.redirect('/esqueci?erro=sistema');
    if (!usuario) return res.redirect('/esqueci?erro=dados_invalidos');

    const hash = await bcrypt.hash(nova_senha, 10);
    db.run('UPDATE usuarios SET senha = ? WHERE email = ?', [hash, email], function (err) {
      if (err) return res.redirect('/esqueci?erro=sistema');
      if (this.changes > 0) res.redirect('/login?sucesso_redefinir=1');
      else res.redirect('/esqueci?erro=senha_igual');
    });
  });
});

// home
router.get('/home', autenticado, (req, res) => {
  res.render('home', { nome: req.session.usuario_nome });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;