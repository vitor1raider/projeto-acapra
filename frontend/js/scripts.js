const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // evita o reload da página

  const email = form.email.value;
  const senha = form.senha.value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      window.location.href = 'dadosAdm.html';
    } else {
      console.log('Falha no login');
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor.');
    console.error(error);
  }
});

let listaAnimais = [];

function consultaAnimais() {
  fetch('http://localhost:3000/animais')
    .then(response => response.json())
    .then(animais => {
      listaAnimais = animais;
      // Pegue os 3 primeiros animais da API
      const animaisCards = animais.slice(0, 3);
      const container = document.getElementById('card-pets');
      container.innerHTML = ''; // Limpa o conteúdo atual

      animaisCards.forEach(animal => {
        const cardHTML = `
          <div class="card-img d-flex flex-column">
            <div class="box-img">
              <img src="${animal.imagem || '../img/default.png'}" alt="${animal.nome}">
            </div>
            <div class="info-pet p-2">
              <h3>${animal.nome}</h3>
              <div class="d-flex gap-1">
                <p class="${animal.sexo === 'Fêmea' ? 'filtro-femea' : 'filtro-macho'}">${animal.sexo}</p>
                <p class="filtro-idade">${animal.idade}</p>
              </div>
              <button class="conhecer-animal" data-id="${animal.id}">Conhecer mais</button>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
      });

      modalAnimal();
    }) 
    .catch(error => {
      console.error('Erro ao buscar dados dos animais:', error);
    });
}

function modalAnimal() {
  const botoesAnimal = document.querySelectorAll('.conhecer-animal');
  botoesAnimal.forEach(botao => {
    botao.addEventListener('click', function () {
      const modalHTML = `
      <div class="modal fade" id="modalAnimal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" style="pointer-events: visible;">
          <div class="modal-body">
            <div class="adocao-container">
              <div class="descricao">
                  <div style="text-align: right; padding-bottom: 15px;">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="d-flex" style="gap: 50px;">
                    <div style="width: 470px;" class="d-flex flex-column justify-content-between">
                      <div class="d-flex justify-content-between">
                        <h4 id="modalAnimalNome" class="nome-animal">${animal.nome}</h4>
                      </div>
                      <p id="modalSexo">Gato | Macho | 3 meses | Castrado | Vacinado</p>
                      <p><strong>Negativo para FIV e FELV.</strong></p>
                      <p><strong>Sobre:</strong> <span id="modalSobreAnimal"></span></p>
                      <button type="button" class="btn-adotar" style="width: 200px;">
                        <a href="formulario.html" target="_blank" class="a">Quero adotar</a>
                      </button>
                    </div>
                    <div class="imagem">
                      <img id="modal-imagem" src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>`;
      // const card = this.closest('.card-img');
      // const nome = card.querySelector('h3').innerText;
      // const sexo = card.querySelector('.filtro-femea, .filtro-macho').innerText;
      // const idade = card.querySelector('.filtro-idade').innerText;
      // const imagem = card.querySelector('img').getAttribute('src');

      // // Preenche o modal com os dados do card
      // document.getElementById('modalAnimalNome').innerText = nome;
      // document.getElementById('modalSexo').innerText = sexo;

      document.body.insertAdjacentHTML('beforeend', modalHTML);

      // Abre o modal
      const modal = new bootstrap.Modal(document.getElementById('modalAnimal'));
      modal.show();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  consultaAnimais(); // Carrega os 3 cards ao carregar a página
});