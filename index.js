const express = require("express");
const cors = require("cors");
const sqlite = require("sqlite3");
const path = require("path");

const app = express();
app.use(cors());

var db = new sqlite.Database(path.join(__dirname, "Database.sqlite"));
CriarDatabase();
// Libera a pasta public para o navegador acessar imagens, CSS, JS, etc.
app.use(express.static(path.join(__dirname, 'public')));

function CriarDatabase() {

    var query = "CREATE TABLE IF NOT EXISTS ESTOQUE (ID INTEGER PRIMARY KEY AUTOINCREMENT, ITEM VARCHAR,SETOR VARCHAR, QTD VARCHAR, PRECO VARCHAR) ";

    db.run(query, (err) => {
        if (err) console.log(err);
        else console.log("Tabela criada com sucesso!")
    })

}

app.get("/", (req, res) => {



    res.sendFile(path.join(__dirname, 'public', 'home.html'));

});

app.get("/estoque/:item/:setor/:qtd/:preco", (req, res) => {

    var w = req.params.item;
    var x = req.params.setor;
    var y = req.params.qtd;
    var z = req.params.preco;

    var query = "INSERT INTO ESTOQUE (NOME, SETOR, QTD, PRECO) VALUES (?, ?, ?, ?)";

    db.run(query, [w, x, y, z], function (err) {
         if (err) {
            console.log("ERRO AO CADASTRAR:", err);
            res.status(500).send("Erro ao cadastrar produto!");
        }
        else {
            console.log("Produto salvo! ID:", this.lastID);
            res.send("1");
        }
    })
})
app.get("/api/:item/:setor/:qtd/:preco", (req, res) => {

    var item = req.params.item;
    var setor = req.params.setor;
    var qtd = req.params.qtd;
    var preco = req.params.preco;

    console.log("Item = " + item);
    console.log("setor = " + setor);
    console.log("qtd = " + qtd);
    console.log("preco = " + preco);

    var query = "SELECT * FROM ESTOQUE";
    
    db.all(query, (err, rows) => {
        if (err) res.send(err);
        else res.json(rows);
    })
})
app.listen(3000, console.log("Run!!!!"));