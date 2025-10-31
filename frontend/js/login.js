const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // evita o reload da página

    const email = form.email.value;
    const senha = form.senha.value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      if (response.ok) {
        window.location.href = '/admin';
      } else {
        alert('E-mail ou senha incorretos!');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    }
  });
}