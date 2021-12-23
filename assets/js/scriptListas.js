const lista = document.getElementsByClassName('lista-tarefas')[0];

async function loadListas(){
    direction = localStorage.getItem("direction");
    if (direction!=""){
        const directionList = document.getElementsByClassName("lista-tarefas")[0];
        directionList.style.flexDirection = direction;
        const botao = document.getElementsByClassName("botao-muda-direction")[0];
        if(directionList.style.flexDirection!="row"){
            botao.innerText = "Coluna";
        } else {
            botao.innerText = "Linha";
        }
    }
    const dados = await listaGet("");

    dados.forEach(element => {
        criaElemento(element.texto, element.cor, element.id, element.textDecoration);
    });
}

function criaElemento(texto, color, id, textDecoration){
    let novoElemento = document.createElement("li");
    novoElemento.innerHTML = `
        <p onclick="setConcluido(${id})" class="texto-tarefas">${texto}</p>
        <hr class="linha">
        <button class="botoes-elemento" onclick="deletaElemento(${id})">Excluir</button><button onclick="editaElemento(${id})" class="botoes-elemento">Editar</button>
    `
    novoElemento.classList.add('item-lista-tarefa');
    novoElemento.dataset.type = id;
    novoElemento.style.background = color;
    novoElemento.style.textDecoration = textDecoration;

    lista.appendChild(novoElemento);
}

async function adicionaLista(){
    event.preventDefault();
    const texto = document.getElementsByClassName('input-lista')[0].value;
    const color = document.getElementsByClassName('cor-novo-item')[0].value;
    const id = document.getElementById("id-form").value;
    const dado = await listaGet(id);
    console.log(dado.textDecoration)
    if (id==""){
        listaPost(texto, color, "");
    }
    else {
        listaUpdate(id, texto, color, dado.textDecoration);
    }
}

function deletaElemento(id){
    listaDelete(id);
}

async function editaElemento(id){
    event.preventDefault();

    const menuItem = document.getElementsByClassName("novo-item")[0];

    document.getElementById("id-form").value = id;
    document.getElementsByClassName("botao-cancelar")[0].style.display = "inline";

    menuItem.style.display = "inline-flex";
    const dados = await listaGet(id);

    document.getElementsByClassName("input-lista")[0].value = dados.texto
    document.getElementsByClassName("cor-novo-item")[0].value = dados.cor

}

function cancelaEdicao(){
    document.getElementById("id-form").value = "";
    document.getElementsByClassName("botao-cancelar")[0].style.display = "none";
    menuItem.style.display = "none";
    document.getElementsByClassName("input-lista")[0].value = "";
    document.getElementsByClassName("cor-novo-item")[0].value = "";
}

function mostraMenuItem(){
    const menuItem = document.getElementsByClassName("novo-item")[0];
    if(menuItem.style.display != "inline-flex") {
        menuItem.style.display = "inline-flex";
    } else {
        menuItem.style.display = "none";
    }

}

function mudaDirection(){
    const direction = document.getElementsByClassName("lista-tarefas")[0];
    const botao = document.getElementsByClassName("botao-muda-direction")[0];
    if(direction.style.flexDirection!="row"){
        direction.style.flexDirection = "row";
        localStorage.setItem("direction", "row");
        botao.innerText = "Linha";
    } else {
        direction.style.flexDirection = "column";
        localStorage.setItem("direction", "column");
        botao.innerText = "Coluna";
    }
}

async function setConcluido(id){
    const elemento = document.querySelector([`[data-type='${id}']`])
    dado = await listaGet(id);
    if(elemento.style.textDecoration!="line-through"){
        elemento.style.textDecoration = "line-through";
        listaUpdate(dado.id, dado.texto, dado.cor, "line-through");
    } else {
        elemento.style.textDecoration = "";
        listaUpdate(dado.id, dado.texto, dado.cor, "");
    }
}