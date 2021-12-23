function ehLetra(cod, original) // Função usada para verificar se um código de um caracter especifico é ou não uma letra válida (A-Z ou a-z), mais explicações abaixo.
{
    if (original==0)
    {
        if ((cod>=65&&cod<=90)||(cod>=97&&cod<=122))
        {
            return true;
        }

        return false;
    }

    if(original>=65&&original<=90&&cod>=65&&cod<=90)
    {
        return true;
    }

    if(original>=97&&original<=122&&cod>=97&&cod<=122)
    {
        return true;
    }

    return false;
}

function CifraCesar(text)
{
    let textoCriptografado="";
    var salto = 7
    var i=0;
    var tam = text.length;

    if ((salto<0&&salto!=0)||(isNaN(salto)))
    {
        alert("Numero de pulo inválido. O número precisa ser maior ou igual a 0");
        return 0;
    }
    else
    {
        while (salto>=26)
        {
            salto = salto-26; // Diminui por 26 até o pulo ser um número menor que 26.
        }

        for (i=0; i<tam; i++)
        {
            var letra = text.charAt(i);
            var letraCod = parseInt(letra.charCodeAt(0));
            var novaLetra = letraCod + salto;

            if (!ehLetra(letraCod, 0)) // A funçao ehLetra com segundo argumento "0" é utilizada para ver se é uma letra de A-Z ou a-z
            {
                textoCriptografado += letra;
            }
            else
            {
                if (!ehLetra(novaLetra, letraCod)) // Nesse caso a função manda a novaLetra a ser impressa e o código da antiga letra (para que se eu colocar a letra Z(90) e o pulo 7 ele não escreva a(97)(seria uma letra válida se eu não fizesse esse teste) mas sim G(71))
                {
                    novaLetra=parseInt(novaLetra-26); // Se não é uma letra válida, diminui por -26 (para voltar ao começo do alfabeto)
                }

                textoCriptografado += String.fromCharCode(novaLetra);
            
            }

        }
    }
    return textoCriptografado;
}