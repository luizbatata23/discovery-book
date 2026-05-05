
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
        ".sub-assinatura, .assinatura-card"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target); 
                    // aparece uma vez só (mais elegante)
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    elements.forEach(el => observer.observe(el));
});

// MENU
function toggleMenu() {
    const menu = document.getElementById("menuCat");
    menu.classList.toggle("ativo");
}

// MENU
function toggleMenu() {
    const menu = document.getElementById("menuCat");
    menu.classList.toggle("ativo");
}

// BUSCA
function buscarLivros() {

    const input = document.getElementById("searchInput");
    const filtro = input.value.toLowerCase();

    const livros = document.querySelectorAll(".livro-card");

    livros.forEach(livro => {
        const titulo = livro.querySelector("h3").innerText.toLowerCase();
        const sinopse = livro.querySelector(".sinopse").innerText.toLowerCase();

        if (titulo.includes(filtro) || sinopse.includes(filtro)) {
            livro.style.display = "block";
        } else {
            livro.style.display = "none";
        }
    });
}

// ENTER também funciona
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchInput");

    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            buscarLivros();
        }
    });
});


/*function buscarLivros() {
    const input = document.getElementById("searchInput").value.toLowerCase()
    const livros = document.querySelectorAll(".livro-card")

    livros.forEach(livro => {
        const titulo = livro.querySelector("h3").innerText.toLowerCase()

        if (titulo.includes(input)) {
            livro.style.display = "block"
        } else {
            livro.style.display = "none"
        }
    })
}

document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        buscarLivros();
    }
}); */



const input = document.getElementById("searchInput");
const resultados = document.getElementById("resultadosBusca");

input.addEventListener("input", () => {
    let valor = input.value.toLowerCase();

    resultados.innerHTML = "";

    if (valor === "") {
        resultados.style.display = "none";
        return;
    }

    const livros = document.querySelectorAll(".livro-card");

    livros.forEach(livro => {
        const titulo = livro.querySelector("h3").innerText;
        const imagem = livro.querySelector("img").src;

        if (titulo.toLowerCase().includes(valor)) {

            resultados.innerHTML += `
                <div class="resultado-item" onclick="irParaElemento('${titulo}')">
                    <img src="${imagem}">
                    <div>
                        <h4>${titulo}</h4>
                    </div>
                </div>
            `;
        }
    });

    resultados.style.display = "block";
});

function irParaElemento(titulo) {
    const livros = document.querySelectorAll(".livro-card");

    livros.forEach(livro => {
        const nome = livro.querySelector("h3").innerText;

        if (nome === titulo) {
            livro.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
}