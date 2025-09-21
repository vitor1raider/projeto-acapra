import { cardAnimal } from './cards.js';
import { modalAnimal } from './modal.js';

// Captura os 3 primeiros animais do banco de dados e exibe na página inicial
function consultaAnimais() {
  fetch('/animais')
    .then(response => response.json())
    .then(animais => {
      // Pegue os 3 primeiros animais da API
      const animaisCards = animais.slice(0, 3);
      const container = document.getElementById('card-pets');
      container.innerHTML = ''; // Limpa o conteúdo atual

      animaisCards.forEach(animal => {
        container.insertAdjacentHTML('beforeend', cardAnimal(animal));
      });
      botaoConhecerMais()
  }) 
}
consultaAnimais();

// Exibe todos os animais contidos no banco de dados no elemento verTodos
const verTodos = document.getElementById('verTodos');
verTodos.addEventListener("click", async () => {
  verTodos.textContent = ''; 
  try {
    fetch('/animais')
    .then(response => response.json())
    .then(animais => {
      const cardPets = document.getElementById('card-pets');
      cardPets.innerHTML = ''; // Limpa o conteúdo para não multiplicar o conteúdo
      cardPets.style.flexFlow = "wrap";
      animais.forEach(animal => {
        cardPets.insertAdjacentHTML('beforeend', cardAnimal(animal));
      })
      botaoConhecerMais()
    })
  } catch (error) {
    console.error(error);
  }
});

// Exibe o modal do animal selecionado para ver detalhes
function botaoConhecerMais() {
  const botaoConhecerMais = document.querySelectorAll('.conhecer-animal');
  try {
    botaoConhecerMais.forEach(botao => {
    botao.addEventListener("click", () => {
    const id_animal = botao.getAttribute('data-id')
    fetch(`http://localhost:3000/animais/${id_animal}`)
      .then(response => response.json())
        .then(animal => {
          modalAnimal(animal)
        })
      })
    })
  } catch (error) {
    console.log(error)
  }
}