const mysql = require('mysql2');

const connetion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'escola'

});

connetion.connect((erro) => {
    if(erro){
        console.log('Erro ao conectar: ' , erro)
        return;
    }
    console.log('Banco Conectado com sucesso!');
})

//Serve para exportar a variavel connection
module.exports = connetion;