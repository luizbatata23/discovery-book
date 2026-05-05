// DADOS DOS LIVROS
/*const livros = {
    "livro-1": {
        titulo: "Aventuras no Bosque",
        sinopse: "Uma história encantadora sobre amizade, coragem e magia em um bosque misterioso.",
        capa: "../img/ex de logo.png"
    },
    "livro-2": {
        titulo: "O Segredo da Lua",
        sinopse: "Um mistério oculto nas sombras da lua cheia transforma a vida de uma jovem.",
        capa: "../img/ex de logo.png"
    },
    "livro-3": {
        titulo: "Romance ao Entardecer",
        sinopse: "Dois desconhecidos cruzam seus destinos enquanto o sol se põe.",
        capa: "../img/ex de logo.png"
    }
};

const id = localStorage.getItem("livro_atual");
const livro = livros[id];

// CARREGAR INFO
document.getElementById("tituloLivro").innerText = livro.titulo;
document.getElementById("sinopseLivro").innerText = livro.sinopse;
document.getElementById("capaLivro").src = livro.capa;

// ⭐ AVALIAÇÃO DO LIVRO
const estrelas = document.getElementById("avaliacaoLivro");

estrelas.innerHTML = "★★★★★".split("").map((s, i) =>
    `<span data-star="${i+1}">★</span>`
).join("");

document.querySelectorAll("#avaliacaoLivro span").forEach(star => {
    star.addEventListener("click", () => {
        const n = star.getAttribute("data-star");
        localStorage.setItem("estrela_" + id, n);
        atualizar();
    });
});

function atualizar() {
    const salvo = localStorage.getItem("estrela_" + id) || 0;
    document.querySelectorAll("#avaliacaoLivro span").forEach((s, i) => {
        s.classList.toggle("ativo", i < salvo);
    });
}

atualizar();

// COMENTÁRIOS
function carregarComentarios() {
    const box = document.getElementById("listaComentarios");
    box.innerHTML = "";

    const lista = JSON.parse(localStorage.getItem("coment_" + id) || "[]");

    lista.forEach(c => {
        const div = document.createElement("div");
        div.className = "comentario-item";
        div.innerText = c;
        box.appendChild(div);
    });
}

function enviarComentario() {
    const texto = document.getElementById("inputComentario").value;

    if (texto.trim() === "") return;

    const lista = JSON.parse(localStorage.getItem("coment_" + id) || "[]");
    lista.push(texto);

    localStorage.setItem("coment_" + id, JSON.stringify(lista));

    document.getElementById("inputComentario").value = "";
    carregarComentarios();
}

carregarComentarios(); */
