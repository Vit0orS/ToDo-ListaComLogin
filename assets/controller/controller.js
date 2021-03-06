function listaPost(texto, cor, user){
    return fetch(`http://localhost:3000/lista/`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            texto: texto,
            cor: cor,
            textDecoration: "",
            user: user
        })
    })
}

function listaDelete(id){
    return fetch(`http://localhost:3000/lista/${id}`, {
        method: 'DELETE'
    })
    .then( resposta => {
        if(!resposta.ok){
            throw new Error('Não foi possível remover');
        }
    })
}

async function listaGet(id){
    return fetch(`http://localhost:3000/lista/${id}`)
    .then( resposta => {
        if(resposta.ok){
            return resposta.json();
        }
        throw new Error('Não foi possível acessar os itens');
    })
}

function listaUpdate(id, texto, cor, textDecoration, user){
    return fetch(`http://localhost:3000/lista/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            texto: texto,
            cor: cor,
            textDecoration: textDecoration,
            user: user
        })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.json;
        }
        throw new Error('Não foi possível atualizar um item');
    })
}