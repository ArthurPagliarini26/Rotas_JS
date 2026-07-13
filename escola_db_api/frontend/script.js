async function listarCurso() {
    const resposta = await fetch('http://localhost:3023/cursos');
    const cursos = await resposta.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    cursos.forEach(curso => {
        lista.innerHTML += `
            <li>
                ${curso.id} - ${curso.nome}
                <button onclick="editarCurso(${curso.id}, '${curso.nome}')">Editar</button>
                <button onclick="excluirCurso(${curso.id})">Excluir</button>
            </li>
        `;
    });
}

async function cadastrarCurso() {
    const nome = document.getElementById('nome').value;

    if(nome === '') {
     alert('Por favor, preencha o nome do curso.');
     return;
    }

    const resposta = await fetch('http://localhost:3023/cursos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome })

    })

    const dados = await resposta.json();
    alert(dados.mensagem);

    document.getElementById('nome').value = '';
    ListarCurso();
}

async function editarCurso(id , nomeAtual){
    const novoNome = prompt('Digite o novo nome: ')

    if(!novoNome)return;

    await fetch(`http://localhost:3023/cursos/${id}`, {
        method: 'PUT',  
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({nome: novoNome})
    })
    listarCurso();
}

async function excluirCurso(id) {

    const confirmar = confirm('Tem certeza que deseja excluir este curso?');

    if (!confirmar) return;

    const resposta = await fetch(`http://localhost:3023/cursos/${id}`, {
        method: 'DELETE'
    });

    const dados = await resposta.json();

    alert(dados.mensagem);

    listarCurso();
}