const express = require('express')
const server = express()

server.use(express.json())

const livros = ["Harry Poterr", "Senhor do Anéis", "O Pequeno Príncipe"]

//Listando todos os cursos com GET
server.get('/livros', (req, res) => {

    return res.json(livros);
})

//Buscando livro por id
server.get('/livros/:id', (req, res) => {

    const id = req.params.id;

    if(!livros[id]){
        return res.status(400).json({
            erro: "Livro não encontrado!"
        })
    }

    return res.json(livros[id])
})

//Adicionando novo livro
server.post('/livros', (req, res) => {

    const nome = req.body.nome

    if(!nome) {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        })
    }

    livros.push(nome)

    return res.json({
        mensagem: "Livro cadastrado com sucesso", livros
    })
})

//Atualizando um livro existente
server.put('/livros/:id', (req, res) => {

    const id = req.params.id;
    const nome = req.body.nome;

    if(!livros[id]){
        return res.status(400).json({
            erro: "Livro não encontrado!"
        })
    }

     if(!nome) {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        })
    }

    livros[id] = nome
    return res.json({
        mensagem: "Livro atualizado com sucesso", livros
    })
})


// Deletando livro
server.delete('/livros/:id', (req, res) => {

    const id = req.params.id;

    if(!livros[id]){
        return res.status(400).json({
            erro: "Livro não encontrado!"
        })
    }

    livros.splice(id, 1)

      return res.json({
        mensagem: "Curso removido com sucesso",
        livros
    })
})

server.listen(3056, () => {
    console.log("Servidor rodando na porta 3056");
});

