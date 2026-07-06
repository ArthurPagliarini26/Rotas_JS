//Importa o framework express
const express = require('express');
const server = express();
const connection = require('./db');

server.use(express.json());

server.get('/destinos', (req, res) => {

    const sql = 'SELECT * FROM destinos';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json(resultados);
    });

});

server.get('/destinos/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'SELECT * FROM destinos WHERE id = ?';

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json(resultados[0]);

    });

});

server.post('/destinos', (req, res) => {

    const { nome } = req.body;
    const { pais } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
    }

    if (!pais) {
        return res.status(400).json({ mensagem: 'O campo país é obrigatório.' });
    }

    const sql = 'INSERT INTO destinos (nome, pais) VALUES (?, ?)';

    connection.query(sql, [nome, pais], (erro, resultado) => {

    if (erro) {
        return res.status(500).json({ erro: erro.message });
    }

    return res.status(201).json({
        mensagem: 'Destino cadastrado com sucesso!',
        id: resultado.insertId,
        nome,
        pais
    });

});

});

server.put('/destinos/:id', (req, res) => {

    const { id } = req.params;
    const { nome } = req.body;
    const { pais } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
    }

     if (!pais) {
        return res.status(400).json({ mensagem: 'O campo país é obrigatório.' });
    }

    const sql = 'UPDATE destinos SET nome = ?, pais = ? WHERE id = ?';

    connection.query(sql, [nome, pais, id], (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json({
            mensagem: 'Destino atualizado com sucesso!'
        });

    });

});

server.delete('/destinos/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM destinos WHERE id = ?';

    connection.query(sql, [id], (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json({
            mensagem: 'Destino deletado com sucesso!'
        });

    });

});

server.get('/clientes', (req, res) => {

    const sql = 'SELECT * FROM clientes';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json(resultados);
    });

});

server.get('/clientes/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'SELECT * FROM clientes WHERE id = ?';

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json(resultados[0]);

    });

});

server.post('/clientes', (req, res) => {

    const { nome } = req.body;
    const { email } = req.body;
    const { telefone } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo país é obrigatório.' });
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: 'O campo telefone é obrigatório.' });
    }

    const sql = 'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)';

    connection.query(sql, [nome, email, telefone], (erro, resultado) => {

    if (erro) {
        return res.status(500).json({ erro: erro.message });
    }

    return res.status(201).json({
        mensagem: 'Cliente cadastrado com sucesso!',
        id: resultado.insertId,
        nome,
        email,
        telefone
    });

});

});

server.put('/clientes/:id', (req, res) => {

    const { id } = req.params;
    const { nome } = req.body;
    const { email } = req.body;
    const { telefone } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
    }

     if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório.' });
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: 'O campo telefone é obrigatório.' });
    }

    const sql = 'UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?';

    connection.query(sql, [nome, email, telefone, id], (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json({
            mensagem: 'Cliente atualizado com sucesso!'
        });

    });

});

server.delete('/clientes/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM clientes WHERE id = ?';

    connection.query(sql, [id], (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json({
            mensagem: 'Cliente deletado com sucesso!'
        });

    });

});

server.get('/reservas', (req, res) => {

    const sql = 'SELECT * FROM reservas';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json(resultados);
    });

});

server.get('/reservas/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'SELECT * FROM reservas WHERE id = ?';

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json(resultados[0]);

    });

});

server.post('/reservas', (req, res) => {

    const { id_cliente } = req.body;
    const { id_destino } = req.body;
    const { data_reserva } = req.body;

    if (!id_cliente) {
        return res.status(400).json({ mensagem: 'O campo id_cliente é obrigatório.' });
    }

    if (!id_destino) {
        return res.status(400).json({ mensagem: 'O campo id_destino é obrigatório.' });
    }

    if (!data_reserva) {
        return res.status(400).json({ mensagem: 'O campo data_reserva é obrigatório.' });
    }

    const sql = 'INSERT INTO reservas (id_cliente, id_destino, data_reserva) VALUES (?, ?, ?)';

    connection.query(sql, [id_cliente, id_destino, data_reserva], (erro, resultado) => {

    if (erro) {
        return res.status(500).json({ erro: erro.message });
    }

    return res.status(201).json({
        mensagem: 'Reserva cadastrada com sucesso!',
        id: resultado.insertId,
        id_cliente,
        id_destino,
        data_reserva
    });

});

});

server.put('/reservas/:id', (req, res) => {

    const { id } = req.params;
    const { id_cliente, id_destino, data_reserva } = req.body;

    if (!id_cliente) {
        return res.status(400).json({ mensagem: 'O campo id_cliente é obrigatório.' });
    }

    if (!id_destino) {
        return res.status(400).json({ mensagem: 'O campo id_destino é obrigatório.' });
    }

    if (!data_reserva) {
        return res.status(400).json({ mensagem: 'O campo data_reserva é obrigatório.' });
    }

    const sql = 'UPDATE reservas SET id_cliente = ?, id_destino = ?, data_reserva = ? WHERE id = ?';

    connection.query(sql, [id_cliente, id_destino, data_reserva, id], (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json({
            mensagem: 'Reserva atualizada com sucesso!'
        });

    });

});

server.delete('/reservas/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM reservas WHERE id = ?';

    connection.query(sql, [id], (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        return res.json({
            mensagem: 'Reserva deletada com sucesso!'
        });

    });

});

server.listen(3022, () => {
    console.log("Servidor rodando na porta 3022");
});