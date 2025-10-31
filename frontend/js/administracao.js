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

// Helpers
function formataValor(valor) {
  if (!valor) return "";
  return valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
}

function formataString(value) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function limparFormulario() {
  const form = document.getElementById("cadastroAnimal");
  if (!form) return;
  form.reset();
  const nome = document.getElementById("nome");
  nome && nome.focus();
}

// Tabela e contadores (admin)
async function inserirDadosTabela() {
  const tabelaBody = document.querySelector("#dadosAnimais");
  if (!tabelaBody) return;

  try {
    const response = await fetch('/animais');
    const animais = await response.json();

    // Contadores
    const totalAnimaisCadastrados = document.querySelector('#totalAnimaisCadastrados');
    const totalGatosCadastrados = document.querySelector('#totalGatosCadastrados');
    const totalCachorrosCadastrados = document.querySelector('#totalCachorrosCadastrados');

    totalAnimaisCadastrados && (totalAnimaisCadastrados.textContent = `${animais.length}`);
    const quantidadeGatos = animais.filter(a => a.especie === 'Gato').length;
    const quantidadeCachorros = animais.filter(a => a.especie === 'Cachorro').length;
    totalGatosCadastrados && (totalGatosCadastrados.textContent = `${quantidadeGatos}`);
    totalCachorrosCadastrados && (totalCachorrosCadastrados.textContent = `${quantidadeCachorros}`);

    // Limpa e popula tabela
    tabelaBody.innerHTML = '';
    animais.forEach(animal => {
      const row = `
        <tr>
          <td>${animal.id_animal}</td>
          <td>${animal.nome}</td>
          <td>${animal.idade}</td>
          <td>${animal.sexo}</td>
          <td>${animal.especie}</td>
          <td class="d-flex justify-content-between acoes">
            <div class="remove-button" data-id="${animal.id_animal}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zM5.5 5.5v7a.5.5 0 0 1-1 0v-7zm2.5 0v7a.5.5 0 0 1-1 0v-7zm3 .5v7a.5.5 0 0 1-1 0v-7z"/>
              </svg>
            </div>
            <div class="edit-button" data-id="${animal.id_animal}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.46 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11A1.5 1.5 0 0 0 15 13.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 2 13.5v-11A.5.5 0 0 1 2.5 2H9a.5.5 0 0 0 0-1H2.5z"/>
              </svg>
            </div>
          </td>
        </tr>`;
      tabelaBody.insertAdjacentHTML('beforeend', row);
    });
  } catch (error) {
    console.error(error);
  }

<<<<<<< HEAD
  filtroPesquisa();
=======
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
      // Dialog para confirmar a edição do dado
      const confirmar = confirm("Você deseja editar este animal?");
      // Se confirmado, edita os dados do animal
      if (confirmar) {
        const id = botaoEdicao.closest("tr").querySelector("td:first-child").textContent;

        try {
          // Buscar os dados do animal pelo ID
          const response = await fetch(`http://localhost:3000/animais/${id}`);
          const animal = await response.json();

          // Preencher o formulário com os dados do animal
          nome.value = animal.nome;
          idade.value = animal.idade;
          informacoes.value = animal.sobre;
          sexo.value = animal.sexo;
          especie.value = animal.especie;
          vacinado.value = animal.vacina;
          castrado.value = animal.castracao;

          // Atualizar o formulário para enviar uma requisição PUT
          form.onsubmit = async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append("nome", nome.value);
            formData.append("idade", idade.value.toString()); // Converte para string
            formData.append("sobre", informacoes.value);
            formData.append("sexo", formataValor(sexo.value));
            formData.append("especie", formataValor(especie.value));
            formData.append("vacina", formataValor(vacinado.value));
            formData.append("castracao", formataValor(castrado.value));

            if (imagem.files.length > 0) {
              formData.append("imagem", imagem.files[0]);
            }

            try {
              const response = await fetch(`http://localhost:3000/animais/${id}`, {
                method: "PUT",
                body: formData,
              });

              if (response.ok) {
                alert("Animal atualizado com sucesso!");
                limparFormulario();
                inserirDadosTabela(); // Atualiza a tabela
              } else {
                alert("Erro ao atualizar animal");
              }
            } catch (error) {
              console.error("Erro ao atualizar:", error);
            }
          };
        } catch (error) {
          console.error("Erro ao buscar dados do animal:", error);
        }
      }
    }
  })
>>>>>>> 34ffc13 (backup integração do formulario ao frontend)
}

// Filtro de pesquisa
function filtroPesquisa() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (event) => {
    const value = formataString(event.target.value);
    const tabelas = document.getElementsByTagName('table');

    Array.from(tabelas).forEach((table) => {
      const linhas = table.querySelectorAll('tbody tr');
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

// Inicialização por página
document.addEventListener('DOMContentLoaded', () => {
  // Página admin: monta tabela e listeners de ação
  const tabelaBody = document.querySelector('#dadosAnimais');
  if (tabelaBody) {
    inserirDadosTabela();

    if (!window.__dadosAnimaisBound) {
      window.__dadosAnimaisBound = true;

      tabelaBody.addEventListener('click', async (event) => {
        // Remover
        const botaoRemover = event.target.closest('.remove-button');
        if (botaoRemover) {
          const ok = confirm('Tem certeza que deseja remover este animal?');
          if (!ok) return;

<<<<<<< HEAD
          const id = botaoRemover.dataset.id;
          try {
            const res = await fetch(`/animais/${id}`, { method: 'DELETE' });
            if (res.ok) {
              alert('Animal removido com sucesso!');
              inserirDadosTabela();
            } else {
              alert('Erro ao remover animal.');
            }
          } catch (err) {
            console.error('Erro ao deletar:', err);
=======
      const nome = document.getElementById('nome');

      if (nome) nome.value = animal.nome ?? '';
      if (idade) idade.value = animal.idade ?? '';
      if (informacoes) informacoes.value = animal.sobre ?? '';
      if (sexo) sexo.value = animal.sexo ?? '';
      if (especie) especie.value = animal.especie ?? '';
      if (vacinado) vacinado.value = animal.vacina ?? '';
      if (castrado) castrado.value = animal.castracao ?? '';

      if (form) {
        form.onsubmit = async (e) => {
          e.preventDefault();
          const fd = new FormData(form);
          if (imagem && imagem.files.length) fd.set('imagem', imagem.files[0]);

          const resp = await fetch(`/animais/${editId}`, { method: 'PUT', body: fd });
          if (resp.ok) {
            alert('Animal atualizado com sucesso!');
            window.location.href = '/admin';
          } else {
            alert('Erro ao atualizar animal');
>>>>>>> 34ffc13 (backup integração do formulario ao frontend)
          }
          return;
        }

        // Editar: redireciona sem popup duplicado
        const botaoEdicao = event.target.closest('.edit-button');
        if (botaoEdicao) {
          const id = botaoEdicao.closest('tr')?.querySelector('td:first-child')?.textContent?.trim()
            || botaoEdicao.dataset.id;
          if (!id) return;
          // Sem confirmação para evitar múltiplos popups
          window.location.href = `/cadastrar?id=${id}`;
        }
      });
    }
  }

<<<<<<< HEAD
  // Página cadastrar: configura POST/PUT e preview da imagem
  const form = document.getElementById('cadastroAnimal');
  if (form) {
    const nome = document.getElementById('nome');
    const idade = document.getElementById('idade');
    const informacoes = document.getElementById('informacoes');
    const sexo = document.getElementById('sexo');
    const especie = document.getElementById('especie');
    const vacinado = document.getElementById('vacinado');
    const castrado = document.getElementById('castrado');
    const imagem = document.getElementById('imagem');

    // Preview da imagem (com guard)
    const boxImagem = document.getElementById('boxImagem');
    const previsualizarImagem = document.getElementById('previsualizarImagem');
    if (imagem && previsualizarImagem && boxImagem) {
      imagem.addEventListener('change', function () {
        const file = imagem.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            previsualizarImagem.src = e.target.result;
            previsualizarImagem.style.display = "flex";
            boxImagem.style.display = "flex";
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Cadastro novo (POST) por padrão
    form.onsubmit = async (event) => {
      event.preventDefault();
      const fd = new FormData();
      fd.append('nome', nome?.value ?? '');
      fd.append('idade', (idade?.value ?? '').toString());
      fd.append('sobre', informacoes?.value ?? '');
      fd.append('sexo', formataValor(sexo?.value ?? ''));
      fd.append('especie', formataValor(especie?.value ?? ''));
      fd.append('vacina', formataValor(vacinado?.value ?? ''));
      fd.append('castracao', formataValor(castrado?.value ?? ''));
      if (imagem && imagem.files.length > 0) fd.append('imagem', imagem.files[0]);

      try {
        const response = await fetch('/animais', { method: 'POST', body: fd });
        if (response.ok) {
          alert('Animal cadastrado com sucesso!');
          limparFormulario();
        } else {
          alert('Erro ao cadastrar animal');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    // Se houver ?id=... vira edição (PUT)
    const q = new URLSearchParams(window.location.search);
    const editId = q.get('id');
    if (editId) {
      (async () => {
        try {
          const res = await fetch(`/animais/${editId}`);
          if (!res.ok) throw new Error('Falha ao buscar animal');
          const animal = await res.json();

          if (nome) nome.value = animal.nome ?? '';
          if (idade) idade.value = animal.idade ?? '';
          if (informacoes) informacoes.value = animal.sobre ?? '';
          if (sexo) sexo.value = animal.sexo ?? '';
          if (especie) especie.value = animal.especie ?? '';
          if (vacinado) vacinado.value = animal.vacina ?? '';
          if (castrado) castrado.value = animal.castracao ?? '';

          form.onsubmit = async (e) => {
            e.preventDefault();
            const fd = new FormData();
            fd.append('nome', nome?.value ?? '');
            fd.append('idade', (idade?.value ?? '').toString());
            fd.append('sobre', informacoes?.value ?? '');
            fd.append('sexo', formataValor(sexo?.value ?? ''));
            fd.append('especie', formataValor(especie?.value ?? ''));
            fd.append('vacina', formataValor(vacinado?.value ?? ''));
            fd.append('castracao', formataValor(castrado?.value ?? ''));
            if (imagem && imagem.files.length > 0) fd.append('imagem', imagem.files[0]);

            try {
              const resp = await fetch(`/animais/${editId}`, { method: 'PUT', body: fd });
              if (resp.ok) {
                alert('Animal atualizado com sucesso!');
                window.location.href = '/admin';
              } else {
                alert('Erro ao atualizar animal');
              }
            } catch (err) {
              console.error('Erro ao atualizar:', err);
            }
          };
        } catch (err) {
          console.error('Falha ao preencher formulário para edição:', err);
        }
      })();
    }
  }
});
=======
// Coleta os dados preenchidos no formulario
async function dadosFormularioAdocao() {
  try {
    await fetch('/formularios')
      .then(response => response.json())
      .then(formulario => {
      const respostaFormulario = document.querySelector("#respostaFormulario")
        formulario.forEach(formularios => {
          const options = {
            timeZone: "America/Sao_Paulo",
            hour12: false,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
          const dataFormatada = new Date(formularios.criadoEm).toLocaleString("pt-BR", options);

          const dadosFormulario = `
            <div>
              <div class="card" style="padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);">
                <div>
                  <div class="d-flex justify-content-between">
                    <div>
                      <h3>${formularios.nomeCompleto}</h3>
                      <p style="font-family: monospace; font-size: 0.75rem; line-height: 1rem;">Identificação do formulário: ${formularios.id}</p>
                    </div>
                    <span class="badge text-black">${dataFormatada}</span>
                  </div>
                </div>
                
                <div class="g-2">
                  <div class="d-flex justify-content-between">
                    <div class="w-25"><span class="text-muted">Animal:</span> <span class="fw-semibold">${formularios.animalInteresse}</span></div>
                    <div class="w-25"><span class="text-muted">Idade:</span> <span class="fw-semibold">${formularios.idade}</span></div>
                    <div class="w-25"><span class="text-muted">Tel:</span> <span class="fw-semibold">${formularios.telefoneContato}</span></div>
                    <div class="w-25"><span class="text-muted">Moradia:</span> <span class="fw-semibold">${formularios.moradia}</span></div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="w-25"><span class="text-muted">Endereço completo:</span> <span class="fw-semibold">${formularios.enderecoCompleto}</span></div>
                    <div class="w-25"><span class="text-muted">Renda:</span> <span class="fw-semibold">${(formularios.renda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></div>
                    <div class="w-25 "><span class="text-muted">Possui outros animais?:</span> <span class="fw-semibold">${formularios.possuiOutrosAnimais}</span></div>
                    <div class="w-25"><span class="text-muted">Condições para manter o animal:</span> <span class="fw-semibold">${formularios.condicoesManterAnimal}</span></div>
                  </div>
                </div>
                
                <div class="mobile d-flex mt-4">
                  <span>Telas: ${formularios.telasProtecao}</span>
                  <span>Castração obrigatória: ${formularios.concordaCastracaoObrigatoria}</span>
                  <span>Todos da família concordam: ${formularios.todosConcordamAdocao}</span>
                  <span>Taxa: ${formularios.concordaTaxaAdocao}</span>
                  <span>Acesso à rua: ${formularios.acessoRua}</span>
                  <span>Animais castrados/vacinados: ${formularios.animaisCastradosVacinados}</span>
                </div>
              </div>
            </div>
          `;
          respostaFormulario.insertAdjacentHTML('beforeend', dadosFormulario);
        })
      })
  } catch (error) {
    console.log(error)
  }
}
dadosFormularioAdocao()

const boxImagem = document.getElementById('boxImagem');
const previsualizarImagem = document.getElementById('previsualizarImagem');

if (imagem) {
  imagem.addEventListener('change', function () {
    const file = imagem.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previsualizarImagem.src = e.target.result;
        previsualizarImagem.style.display = "flex";
        boxImagem.style.display = "flex";
      };

      reader.readAsDataURL(file);
    }
  });
}
>>>>>>> 34ffc13 (backup integração do formulario ao frontend)
