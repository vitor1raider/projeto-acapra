document.querySelector('#formularioAdocao').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = {
      nomeCompleto: document.getElementById('nomeCompleto').value,
      telefoneContato: document.getElementById('telefone').value,
      idade: document.getElementById('idade').value,
      animalInteresse: document.getElementById('animalEscolhido').value,
      enderecoCompleto: document.getElementById('endereco').value,
      moradia: document.getElementById('moradia').value,
      renda: document.getElementById('renda').value,
      possuiOutrosAnimais: document.getElementById('outrosAnimais').value,
      condicoesManterAnimal: document.getElementById('condicoes').value,
      telasProtecao: document.getElementById('telaProtecao').value,
      acessoRua: document.getElementById('acessoRua').value,
      animaisCastradosVacinados: document.getElementById('castradosVacinados').value,
      todosConcordamAdocao: document.getElementById('moradoresAdotante').value,
      concordaCastracaoObrigatoria: document.getElementById('castracaoObrigatoria').value,
      concordaTaxaAdocao: document.getElementById('taxa').value,
    };
  
    try {
      const response = await fetch('/formulario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário.');
    }
  });