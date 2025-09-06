document.addEventListener('DOMContentLoaded', function () {
    const totalAnimaisCadastrados = document.querySelector('#totalAnimaisCadastrados');
    const dadosAnimais = document.querySelector('#dadosAnimais');
    if (dadosAnimais) {
        fetch('http://localhost:3000/animais')
        .then(response => response.json())
            .then(animais => {
                totalAnimaisCadastrados.textContent = `${animais.length}`;
                animais.forEach(animal => {
                    const dadosTabela = `
                    <tr>
                        <td>${animal.id_animal}</td>
                        <td>${animal.nome}</td>
                        <td>${animal.idade}</td>
                        <td>${animal.sexo}</td>
                        <td>${animal.especie}</td>
                        <td class="d-flex justify-content-between acoes">
                        <div class="remove-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill"
                                viewBox="0 0 16 16">
                                <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </div>
                        <div class="edit-button">
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
        .catch(error => console.error('Erro ao buscar dados:', error));    
    }

    // Filtro de busca
    const searchInput = document.getElementById('search');

    searchInput.addEventListener('input', (event) => {
        const value = formatString(event.target.value);

        const tabela = document.getElementsByTagName('table');

        Array.from(tabela).forEach((element) => {
            const linhas = element.querySelectorAll('tbody tr')

            linhas.forEach((linha) => {
                const colunas = linha.querySelectorAll('td');

                const corresponde = Array.from(colunas).some(coluna => 
                    formatString(coluna.textContent).includes(value)
                );

                linha.style.display = corresponde ? "" : "none";
            });
        });
    });
 });

function formatString(value) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normaliza para separar os acentos
    .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos
}