const express = require('express');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'discoverbook-secret',
  resave: false,
  saveUninitialized: false
}));

const authRoutes = require('./routes/auth');
const doacaoRoutes = require('./routes/doacao');

app.use('/', authRoutes);
app.use('/', doacaoRoutes);

app.listen(3000, () => {
  console.log('DiscoverBook rodando em http://localhost:3000');
});