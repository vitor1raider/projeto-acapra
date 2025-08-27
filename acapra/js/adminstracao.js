document.addEventListener('DOMContentLoaded', () => {
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