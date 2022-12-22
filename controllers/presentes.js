module.exports = function (app) {
    var PresentesController = {
        index: function (req, res) {
            res.render("presentes", {presentes: req.session.lista.presentes}); },
        incluir: function (req, res) {
            var lista = req.session.lista;
            var presente = {
                nome: req.body.nome,
                valor: req.body.valor
             };
             lista.presentes.push(presente);
             res.redirect("/presentes"); },
        incluirnobanco: function (req, res) {
            (async () => {
                const db = require("../db");
                console.log('conectou pela API');                
                const nome = req.body.nome;
                const valor = req.body.valor;
                const status = 1;
                const presentes = await db.execSQLQuery(`INSERT INTO presentes(Nome, Valor, Status) VALUES('${nome}','${valor}','${status}')`, res);
            })(); },             
        listar: function (req, res) {
            (async () => {
                const db = require("../db");
                console.log('conectou pela API');                
                const presentes = await db.execSQLQuery('SELECT * FROM presentes', res);
                //console.log(presentes);
                //res.redirect("/listar");
            })(); },             
        comprar: function (req, res) {
            var id = req.params.id;
            req.session.lista.presentes[id].comprado = true;
            res.redirect("/presentes"); }
    };
    return PresentesController;
};


