document.addEventListener("DOMContentLoaded", () => {
    const olhos = document.querySelectorAll(".olho-senha");

    olhos.forEach(olho => {
        olho.addEventListener("click", () => {
            const inputSenha = olho.previousElementSibling;
            
            // Verificação de segurança para não quebrar se não achar o input
            if (inputSenha) {
                if (inputSenha.type === "password") {
                    inputSenha.type = "text";
                    olho.classList.remove("fa-eye");
                    olho.classList.add("fa-eye-slash");
                } else {
                    inputSenha.type = "password";
                    olho.classList.remove("fa-eye-slash");
                    olho.classList.add("fa-eye");
                }
            }
        });
    });
});