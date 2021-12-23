let ntentativas=0;

const mensagensErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        typeMismatch: 'O email digitado não é valido',
        patternMismatch: 'O email digitado não é valido'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio',
        typeMismatch: 'Senha inválida, a senha precisa ter no mínimo 8 caracteres, uma letra, um número e um caracter especial.',
        patternMismatch: 'Senha inválida, a senha precisa ter no mínimo 8 caracteres, uma letra, um número e um caracter especial.'
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch'
]

function pegaMensagemErro(tipoDeInput, input) {
    let mensagem='';
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensErro[tipoDeInput][erro];
        }
    })
    return mensagem;
}

function validaInput(tipo){
    const paragrafo = document.querySelector(`.input__invalido--${tipo}`);
    const input = document.querySelector(`.input__${tipo}`);

    const mensagem = pegaMensagemErro(tipo, input)

    if(mensagem!=''){
        input.classList.add('error');
    }
    paragrafo.textContent = mensagem;
}

function removeErro(tipo){
    const paragrafo = document.querySelector(`.input__invalido--${tipo}`);
    const input = document.querySelector(`.input__${tipo}`);

    input.classList.remove('error');
    paragrafo.textContent = "";
}

function registrar(){
    event.preventDefault();

    const input_nome = document.querySelector(`.input__nome`);
    const input_email = document.querySelector(`.input__email`);
    const input_senha = document.querySelector(`.input__senha`);

    if(input_nome.validity.valid&&input_email.validity.valid&&input_senha.validity.valid){
        criaConta(input_nome.value, input_email.value, input_senha.value);
    } else {
        validaInput("nome");
        validaInput("email");
        validaInput("senha");
    }

}


// Registro e login
async function criaConta(nome, email, senha) {

    const senhaCriptografada = CifraCesar(senha);

    try {
    await fetch(`http://localhost:3000/accounts`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senhaCriptografada
        })
    })}
    catch (erro) {
        console.error("Não foi possível criar o usuário");
        return;
    }
    window.location.href = "paginaSucessoCadastro.html" + `?email=${email}`;
}

async function logaConta(){
    event.preventDefault();

    if(ntentativas>=5){
        document.querySelector(".erroLogin").textContent = "Número máximo de tentativas alcançado...";
    } else {
        let contaEncontrada = false;

        const email = document.querySelector(`.input__email`).value;
        const senha = document.querySelector(`.input__senha`).value;
        const senhaCriptografada = CifraCesar(senha);

        const dados = await pegaDados();

        dados.forEach(dado => {
            if(dado.email==email&&dado.senha==senhaCriptografada){
                window.location.href = "paginaSucessoLogin.html" + `?email=${dado.email}`;
                contaEncontrada=true;
            }
        })
        if(!contaEncontrada){
            ntentativas++;
            document.querySelector(".erroLogin").textContent = "Usuário ou senha inválido(s).";
        }
    }
}

function removeErroLogin(){
    if(ntentativas<5){
        document.querySelector(".erroLogin").textContent = "";
    }
}

function pegaDados(){
    return fetch(`http://localhost:3000/accounts`)
    .then( resposta => {
        if(resposta.ok){
            return resposta.json();
        }
        throw new Error('Não foi possível obter os dados');
    })
}

function loginSucesso(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    localStorage.setItem("user", urlParams.get('email'));

    setTimeout(() => {
        window.location.href="../../telas/listas.html"
    }, 5000);
}