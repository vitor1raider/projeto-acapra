
import { cardAnimal } from './cards.js';
import { modalAnimal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- CLÁUSULA DE GUARDA ---
  // Tenta encontrar o container principal.
  const container = document.getElementById('card-pets');


  if (!container) {
    return;
  }


  const verTodosBtn = document.getElementById('verTodos');
  const filtroEspecie = document.getElementById('especie');
  const filtroSexo = document.getElementById('sexo');
  const filtroIdade = document.getElementById('idade');


  const todosOsFiltros = [filtroEspecie, filtroSexo, filtroIdade];


  async function buscarEExibirAnimais(limitar = false) {
    try {

      const params = new URLSearchParams();
      if (filtroEspecie.value && filtroEspecie.value !== 'selecione') {
        params.append('especie', filtroEspecie.value);
      }
      if (filtroSexo.value && filtroSexo.value !== 'selecione') {
        params.append('sexo', filtroSexo.value);
      }
      if (filtroIdade.value && filtroIdade.value !== 'selecione') {
        params.append('idade', filtroIdade.value);
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
        verTodosBtn.style.display = 'block'; // Mostra o botão "Ver Todos"
      } else {
        verTodosBtn.style.display = 'none'; // Esconde o botão "Ver Todos"
        container.style.flexFlow = 'wrap';
      }

      // 2e. Renderiza os cards
      if (animais.length === 0) {
        container.innerHTML = '<p class="text-center w-100">Nenhum animal encontrado com esses filtros.</p>';
      } else {
        animais.forEach(animal => {
          container.insertAdjacentHTML('beforeend', cardAnimal(animal));
        });
      }

      // 2f. Re-adiciona os eventos de clique para os modais
      botaoConhecerMais();

    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      container.innerHTML = '<p class="text-center w-100">Erro ao carregar os animais.</p>';
    }
  }

  // --- 3. Função para abrir o Modal ---
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

  // --- 4. Adiciona os Event Listeners ---

  // Ao carregar a página, busca os 3 primeiros animais (sem filtro)
  buscarEExibirAnimais(true); // true = limitar a 3

  // Ao clicar em "Ver Todos", busca TODOS os animais (sem filtro)
  verTodosBtn.addEventListener("click", () => {
    // Limpa os filtros para "selecione" para garantir que todos venham
    todosOsFiltros.forEach(filtro => {
      if (filtro) { // <--- ADICIONE ESTA LINHA
        filtro.value = 'selecione';
      } // <--- E ESTA LINHA
    });
    buscarEExibirAnimais(false); // false = não limitar
  });


  todosOsFiltros.forEach(filtro => {
    if (filtro) { // <--- ADICIONE ESTA LINHA
      filtro.addEventListener('change', () => {
        buscarEExibirAnimais(false); // false = não limitar
      });
    } // <--- E ESTA LINHA
  });
}); // Fim do 'DOMContentLoaded'