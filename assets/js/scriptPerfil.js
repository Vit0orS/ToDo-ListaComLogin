function carregaPerfil(){
    document.querySelector(".logadoComo").textContent = `Logado como: ${localStorage.getItem("user")} |`;
    dadosUsuario(localStorage.getItem("user"))
    .then(dado => {
        console.log(dado);
        document.querySelector(".nome-perfil").innerHTML = `Nome: ${dado[0].nome}`
        document.querySelector(".email-perfil").innerHTML = `Email: ${dado[0].email}`
        let counter=0;
        listaGet("")
        .then(dados => {
            dados.forEach(data => {
                counter++;
            });
            document.querySelector(".itens-na-lista").innerHTML = `Itens em sua lista: ${counter}`;
        })
    })
}

async function dadosUsuario(email){
    const dados = await fetch(`http://localhost:3000/accounts/?email=${email}`);
    return dados.json();
}