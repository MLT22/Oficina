const express = require("express")
const fs = require("fs")
const path = require("path")
const { FtpSrv } = require('ftp-srv')

const PORT = process.env.PORT || 3000;
const FTP_PORT = process.env.FTP_PORT || 2121;
const FTP_ROOT = path.join(__dirname, 'ftp-root');

const app = express()
const port = 80
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res) => {
  res.redirect("/login")
})


app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname + '/public' + '/index.html'))
})

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "AindaEstouPensando" && senha === "AindaNaoSei") {
    res.json({ redirect: "/Acesso" });
  } else {
    res.status(401).send("Usuário ou senha inválidos");
  }
});

app.get("/Acesso",(req,res) => {
  res.sendFile(path.join(__dirname + "/public" + "/working.html"))
})




app.listen(port, () => {

})



// FTP
const ftpServer = new FtpSrv({
  url: `ftp://0.0.0.0:${FTP_PORT}`,
  anonymous: true,        
  greeting: ['Bem-vindo ao CTF FTP!'],

});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  // para CTF deixamos anônimo ou fornecemos credenciais simples
  if (username === 'anonymous' || username === 'ftp' || username === 'ctf') {
    // o caminho base do usuário no FTP
    resolve({ root: FTP_ROOT });
  } else {
    // se quiser suportar senha simples:
    if (username === 'player' && password === 'ctf123') {
      resolve({ root: FTP_ROOT });
    } else {
      reject(new Error('Credenciais inválidas'));
    }
  }
});

ftpServer.listen().then(() => {
  console.log(`FTP server running at ftp://localhost:${FTP_PORT} (anonymous allowed)`);
}).catch(err => {
  console.error('Erro ao iniciar FTP:', err);
});