
import { cardAnimal } from './cards.js';
import { modalAnimal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {


  const container = document.getElementById('card-pets');


  if (!container) {
    return;
  }


  const verTodosBtn = document.getElementById('verTodos');
  const filtroEspecie = document.getElementById('especie');
  const filtroSexo = document.getElementById('sexo');
  const filtroPorte = document.getElementById('porte');


  const todosOsFiltros = [filtroEspecie, filtroSexo, filtroPorte];


  async function buscarEExibirAnimais(limitar = false) {
    try {

      const params = new URLSearchParams();
      if (filtroEspecie.value && filtroEspecie.value !== 'selecione') {
        params.append('especie', filtroEspecie.value);
      }
      if (filtroSexo.value && filtroSexo.value !== 'selecione') {
        params.append('sexo', filtroSexo.value);
      }
      if (filtroPorte.value && filtroPorte.value !== 'selecione') {
        params.append('porte', filtroPorte.value);
      }

      const query = params.toString();


      const response = await fetch(`/animais?${query}`);


      if (!response.ok) {

        throw new Error(`Erro do servidor: ${response.status}`);
      }

      let animais = await response.json();


      container.innerHTML = '';


      if (limitar) {
        animais = animais.slice(0, 3);
        verTodosBtn.style.display = 'block';
      } else {
        verTodosBtn.style.display = 'none';
        container.style.flexFlow = 'wrap';
      }


      if (animais.length === 0) {
        container.innerHTML = '<p class="text-center w-100">Nenhum animal encontrado com esses filtros.</p>';
      } else {
        animais.forEach(animal => {
          container.insertAdjacentHTML('beforeend', cardAnimal(animal));
        });
      }

      botaoConhecerMais();

    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      container.innerHTML = '<p class="text-center w-100">Erro ao carregar os animais.</p>';
    }
  }

  function botaoConhecerMais() {
    const botaoConhecerMais = document.querySelectorAll('.conhecer-animal');
    try {
      botaoConhecerMais.forEach(botao => {
        botao.addEventListener("click", () => {
          const id_animal = botao.getAttribute('data-id');
          fetch(`/animais/${id_animal}`)
            .then(response => response.json())
            .then(animal => {
              modalAnimal(animal);
            })
            .catch(error => console.error("Erro ao buscar detalhes do animal:", error));
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  buscarEExibirAnimais(true);


  verTodosBtn.addEventListener("click", () => {
    todosOsFiltros.forEach(filtro => {
      if (filtro) {
        filtro.value = 'selecione';
      }
    });
    buscarEExibirAnimais(false);
  });


  todosOsFiltros.forEach(filtro => {
    if (filtro) {
      filtro.addEventListener('change', () => {
        buscarEExibirAnimais(false);
      });
    }
  });
}); 