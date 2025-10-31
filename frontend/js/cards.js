export function cardAnimal(animal) {
  return `
    <div class="card-img d-flex flex-column">
      <div class="box-img">
        <img src="http://localhost:3000/uploads/${animal.imagem}" alt="${animal.nome}">
      </div>
      <div class="info-pet p-2">
        <h3>${animal.nome}</h3>
        <div class="d-flex gap-1">
          <p class="${animal.sexo === 'Fêmea' ? 'filtro-femea' : 'filtro-macho'}">${animal.sexo}</p>
          <p class="filtro-idade">${animal.idade}</p>
          <p class="filtro-porte">${animal.porte}</p>
        </div>
        <button class="conhecer-animal" data-id="${animal.id_animal}">Conhecer mais</button>
      </div>
    </div>
  `;
}