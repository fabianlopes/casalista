module.exports = {selectPresentes, execSQLQuery}

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root@localhost:3306/casalista");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectPresentes(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM presentes;');
    return rows;
}

function execSQLQuery(sqlQry, res){

  const mysql = require('mysql2');
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'casalista'
  });

  connection.query(sqlQry, (error, results, fields) => {
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou a API');
  });
}


/*
async function execSQLQuery(sqlQry, res){

    //const mysql = require("mysql2/promise");
    //const connection = await mysql.createConnection("mysql://root@localhost:3306/casalista");
    const connection = await connect();

    /*connection.query(sql, (error, response) => {
      if (error) throw error;
      console.log("Response: ", response);
  });

    connection.query(sqlQry, (error, results) => {      
        if(error) 
          res.json(error);
        else
        res.json(results);
        connection.end();        
    });


    connection.query(sqlQry, (error, results))
        .then((data) => {
          res.json(results);
        }).catch(error);

  }*/


function addRows(conn){
  const sql = "INSERT INTO presentes(Nome,Valor,StatusCPF) VALUES ?";
  const values = [
        ['teste1', '12345678901', 1],
        ['teste1', '09876543210', 1],
        ['teste3', '12312312399', 1]
      ];

  conn.query(sql, [values], (error, results, fields) => {
          if(error) return console.log(error);
          console.log('adicionou registros!');
          conn.end();//fecha a conexão
      });
}