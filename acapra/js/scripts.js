// Obtem os dados do animal com base no ID do animal
function dadosAnimais(animalId) {
  const apiDadosAnimais = `http://localhost:3000/api/dadosAnimais`;
  fetch(apiDadosAnimais) 
    .then(response => response.json())  // Converte a resposta da API em JSON
    .then(animais => {
      // Encontra o animal correspondente pelo ID
      const animal = animais.find(a => a.id === animalId);

      // Obtem as informações do animal
      if (animal) {
        document.getElementById('modal-titulo').textContent = animal.tituloModal;
        document.getElementById('modal-sobre').textContent = animal.descricao;
        document.getElementById('modal-observacao').textContent = animal.observacao;
        document.getElementById('modal-imagem').src = animal.imagem;
        document.getElementById('modal-imagem').alt = animal.alt;

        // Abre o modal do bootstrap
        const modal = new bootstrap.Modal(document.getElementById('modalAnimal'));
        modal.show();
      } else {
        console.error('Animal não encontrado');
      }
    })
    .catch(error => {
      console.error('Erro ao carregar os dados do animal:', error);
  });
}

// Exibe os dados do animal num modal
function mostrarDados() {
  const botaoAnimal = document.querySelectorAll('.conhecer-animal');
  botaoAnimal.forEach(botao => {
    botao.addEventListener('click', function() {
      const animalId = parseInt(this.getAttribute('data-id'));
      dadosAnimais(animalId); 
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  mostrarDados();
});
