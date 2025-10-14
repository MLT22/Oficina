document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha })
    });

    if (resposta.ok) {
      const data = await resposta.json();
      window.location.href = data.redirect;
    } else {
      const texto = await resposta.text();
      document.getElementById("resposta").innerText = texto;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("resposta").innerText =
      "Erro na conexão com o servidor.";
  }
});