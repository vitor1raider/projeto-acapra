console.log("✅ O arquivo scripts.js foi carregado e está sendo executado.");

const buscarAnimais = async () => {
            try {
                // Passo 1: A lógica do fetch corrigida
                const response = await fetch('http://localhost:3000/animais');
                const data = await response.json();
                console.log('Animais encontrados:', data);
            } catch (error) {
                console.error('Falha ao buscar animais:', error);
            }
        }

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

    const data = await response.json();

    if (response.ok) {
      console.log('Login realizado');
      
      // Se quiser, redireciona para a página que quiser, por exemplo:
      window.location.href = 'dadosAdm.html';
    } else {
      console.log('Falha no login');
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor.');
    console.error(error);
  }
});
// // Obtem os dados do animal com base no ID do animal
// function dadosAnimais(animalId) {
//   const apiDadosAnimais = `http://localhost:3000/api/dadosAnimais`;
//   fetch(apiDadosAnimais) 
//     .then(response => response.json())  // Converte a resposta da API em JSON
//     .then(animais => {
//       // Encontra o animal correspondente pelo ID
//       const animal = animais.find(a => a.id === animalId);

//       // Obtem as informações do animal
//       if (animal) {
//         document.getElementById('modal-titulo').textContent = animal.tituloModal;
//         document.getElementById('modal-sobre').textContent = animal.descricao;
//         document.getElementById('modal-observacao').textContent = animal.observacao;
//         document.getElementById('modal-imagem').src = animal.imagem;
//         document.getElementById('modal-imagem').alt = animal.alt;

//         // Abre o modal do bootstrap
//         const modal = new bootstrap.Modal(document.getElementById('modalAnimal'));
//         modal.show();
//       } else {
//         console.error('Animal não encontrado');
//       }
//     })
//     .catch(error => {
//       console.error('Erro ao carregar os dados do animal:', error);
//   });
// }

// // Exibe os dados do animal num modal
// function mostrarDados() {
//   const botaoAnimal = document.querySelectorAll('.conhecer-animal');
//   botaoAnimal.forEach(botao => {
//     botao.addEventListener('click', function() {
//       const animalId = parseInt(this.getAttribute('data-id'));
//       dadosAnimais(animalId); 
//     });
//   });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   mostrarDados();
// });
