const form = document.getElementById("cadastroAnimal");
const nome = document.querySelector("#nome");
const idade = document.getElementById("idade");
const informacoes = document.getElementById("informacoes");
const sexo = document.getElementById("sexo");
const especie = document.getElementById("especie");
const vacinado = document.getElementById("vacinado");
const castrado = document.getElementById("castrado");
const imagem = document.getElementById("imagem");

const dadosAnimais = document.querySelector("#dadosAnimais");

if (form) {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome.value);
    formData.append("idade", idade.value);
    formData.append("sobre", informacoes.value);
    formData.append("sexo", formataValor(sexo.value));
    formData.append("especie", formataValor(especie.value));
    formData.append("vacina", formataValor(vacinado.value));
    formData.append("castracao", formataValor(castrado.value));

    if (imagem.files.length > 0) {
      formData.append("imagem", imagem.files[0]);
    }

    try {
      const response = await fetch("http://localhost:3000/animais", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Animal cadastrado com sucesso!");
        limparFormulario();
      } else {
        alert("Erro ao cadastrar animal");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };
}

// Limpa os inputs após o submit
function limparFormulario() {
  // Limpa os inputs
  nome.value = "";
  idade.value = "";
  informacoes.value = "";
  sexo.value = "";
  especie.value = "";
  vacinado.value = "";
  castrado.value = "";

  // Coloca o foco no input de nome
  nome.focus()
}

// Converte a primeira letra de uma string para maíuscula
function formataValor(valor) {
  if (!valor) return "";
  return valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
}

// Adiciona os dados no banco de dados (animais)
async function inserirDadosTabela() {
  try {
    await fetch('/animais')
      .then(response => response.json())
      .then(animais => {
        const totalAnimaisCadastrados = document.querySelector('#totalAnimaisCadastrados');
        const dadosAnimais = document.querySelector("#dadosAnimais");
        if (!dadosAnimais) return;
        if (totalAnimaisCadastrados) totalAnimaisCadastrados.textContent = `${animais.length}`;

        const totalGatosCadastrados = document.querySelector('#totalGatosCadastrados')
        const totalCachorrosCadastrados = document.querySelector('#totalCachorrosCadastrados')
        const quantidadeGatos = animais.filter(item => item.especie === 'Gato').length;
        const quantidadeCachorros = animais.filter(item => item.especie === 'Cachorro').length;
        totalGatosCadastrados.textContent = quantidadeGatos;
        totalCachorrosCadastrados.textContent = quantidadeCachorros;

        animais.forEach(animal => {
          const dadosTabela = `
            <tr>
              <td>${animal.id_animal}</td>
              <td>${animal.nome}</td>
              <td>${animal.idade}</td>
              <td>${animal.sexo}</td>
              <td>${animal.especie}</td>
              <td class="d-flex justify-content-between acoes">
              <div class="remove-button" data-id="${animal.id_animal}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill"
                  viewBox="0 0 16 16">
                  <path 
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </div>
              <div class="edit-button" data-id="${animal.id_animal}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path 
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
              </div>
            </tr>
            `;
          dadosAnimais.insertAdjacentHTML('beforeend', dadosTabela);
        })
      })
  } catch (error) {
    console.log(error)
  }
  filtroPesquisa()
}
inserirDadosTabela()

if (dadosAnimais) {
  dadosAnimais.addEventListener("click", async function (event) {
    // Captura o clique no elemento com a classe .remove-button
    const botaoRemover = event.target.closest(".remove-button")
    if (botaoRemover) {
      // Dialog para confirmar a remoção do dado
      const mensagemConfirmacao = confirm("Tem certeza que deseja remover este animal?")
      // Se confirmado, remove os dados do animal
      if (mensagemConfirmacao) {
        const id = botaoRemover.dataset.id;
        try {
          const res = await fetch(`http://localhost:3000/animais/${id}`, {
            method: "DELETE"
          });

          if (res.ok) {
            alert("Animal removido com sucesso!");
          } else {
            alert("Erro ao remover animal.");
          }
        } catch (err) {
          console.error("Erro ao deletar:", err);
        }
      }
    }

    // Captura o clique no elemento com a classe .edit-button
    const botaoEdicao = event.target.closest(".edit-button")
    if (botaoEdicao) {
      console.log("Em desenvolvimento")
      // Dialog para confirmar a edição do dado
      const confirmar = confirm("Você deseja editar este animal?");

      if (!confirmar) return;

      try {
        const response = await fetch(`http://localhost:3000/animais/${idAnimal}`, {
          method: "GET"
        })
          .then(response => response.json())
          .then(animais => {
            animais
          })
      } catch (error) {
        console.log("Não foi possível editar o animal: ", error)
      }
    }
  })
}

// Filtro de pesquisa dos animais cadastrados
function filtroPesquisa() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (event) => {
    const value = formataString(event.target.value);

    const tabela = document.getElementsByTagName('table');

    Array.from(tabela).forEach((element) => {
      const linhas = element.querySelectorAll('tbody tr')

      linhas.forEach((linha) => {
        const colunas = linha.querySelectorAll('td');

        const corresponde = Array.from(colunas).some(coluna =>
          formataString(coluna.textContent).includes(value)
        );
        linha.style.display = corresponde ? "" : "none";
      });
    });
  });
}

// Efetua a formatação de uma string removendo acentos 
function formataString(value) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normaliza para separar os acentos
    .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos
}