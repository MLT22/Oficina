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
    const userAgent = req.headers["user-agent"] || "";

    
    if (userAgent.includes("p0ch4nk4")) {
      res.sendFile(path.join(__dirname, "public", "/SilkSong.html"));
    } else {
      res.sendFile(path.join(__dirname, "public", "/index.html"));
    }
})

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "MuS1ca" && senha === "api690") {
    res.json({ redirect: "/Acesso" });
  } else if (usuario === "MuS1ca" && senha === "P4c1Enc1A"){
    res.status(401).send("Voce nao foi paciente.");
  }
  else {
    res.status(401).send("Usuário ou senha inválidos");
  }
});

app.get("/Acesso",(req,res) => {
  res.sendFile(path.join(__dirname + "/public" + "/working.html"))
})




app.listen(port, () => {

})



const ftpServer = new FtpSrv(`ftp://0.0.0.0:${FTP_PORT}`, {
  anonymous: true,
  greeting: ["Bem-vindo ao CTF FTP!"]
});

ftpServer.on("login", ({ connection, username, password }, resolve, reject) => {
  if (username === "anonymous" || username === "ftp" || username === "ctf") {
    resolve({ root: FTP_ROOT });
  } else if (username === "player" && password === "ctf123") {
    resolve({ root: FTP_ROOT });
  } else {
    reject(new Error("Credenciais inválidas"));
  }
});

ftpServer
  .listen()
  .then(() => {

    });