function mostrarModal() {
    const fadeElement = document.querySelector("#fade");
    const messageElement = document.querySelector("#message");
    const mensagemErro = document.querySelector("#message p");
  
    mensagemErro.innerText = 'Ação inválida';
  
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");

    const closeButton = document.querySelector("#close-message");
    closeButton.addEventListener("click", () => {
        mostrarModal();
        document.querySelector(".loader").style.display = "none";
        document.querySelector("#btnConsulta").style.display = "inline-block";
    });
};