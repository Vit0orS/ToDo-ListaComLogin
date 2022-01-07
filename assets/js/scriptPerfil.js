function carregaPerfil(){
    document.querySelector(".logadoComo").textContent = `Logado como: ${localStorage.getItem("user")} |`;
    dadosUsuario(localStorage.getItem("user"))
    .then(dado => {
        console.log(dado);
        document.querySelector(".nome-perfil").innerHTML = `Nome: ${dado[0].nome}`
        document.querySelector(".email-perfil").innerHTML = `Email: ${dado[0].email}`
    })
}

async function dadosUsuario(email){
    const dados = await fetch(`http://localhost:3000/accounts/?email=${email}`);
    return dados.json();
}