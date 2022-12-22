// Importa e instancia um servidor express
var express = require("express"),
    bodyParser = require("body-parser"),
    load = require("express-load"),
    expressSession = require("express-session"),
    ejs = require('ejs')
    app = express();

/*var teste
    ejs.open = '{{'; 
    ejs.close = '}}';
*/

// Sobe o servidor HTTP na posta 3000
app.listen(3000, function () {
      console.log("Servidor está no ar.");
});

// Define a pasta onde irão ficar as views
app.set("views", __dirname + "/views");
// Define o template engine usado nas views
app.set("view engine", "ejs");

// Define a pasta public para conteúdo estático
app.use(express.static(__dirname + "/public"));

// Responde ao acessar o localhost:3000/
//app.use("/", function(req, res){res.send("Ola Javaneiros");});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true
}));

// Carrega todas as scripts da pasta controller e routes
load("controllers") .then("routes") .then("models")  .into(app);