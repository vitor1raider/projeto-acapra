// Função para exibir o modal com os dados do animal
export function modalAnimal(animal) {
  const modalExistente = document.getElementById('modalAnimal');
  if (modalExistente) {
    modalExistente.remove();
  }

  const modalHTML = `
    <div class="modal fade" id="modalAnimal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="adocao-container">
              <div class="descricao">
                <div style="text-align: right; padding-bottom: 15px;">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex" style="gap: 50px;">
                  <div style="width: 50%;" class="d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-between">
                      <h4 id="modalAnimalNome" class="nome-animal">${animal.nome}</h4>
                    </div>
                    <p id="modalSexo">${animal.especie} | ${animal.sexo} | ${animal.idade} | ${animal.porte}</p>
                    <p><strong>Informações:</strong> <span id="modalSobreAnimal">${animal.sobre}</span></p>
                    <button type="button" class="btn-adotar" style="width: 200px;">
                      <a href="/formulario" target="_blank" class="a">Quero adotar</a>
                    </button>
                  </div>
                  <div class="imagem-responsividade">
                    <img id="modal-imagem" src="http://localhost:3000/uploads/${animal.imagem}" alt="${animal.nome}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = new bootstrap.Modal(document.getElementById('modalAnimal'));
  modal.show();
}