//SELECIONA OS ELEMENTOS DO FORMULÁRIO
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//CAPTURA DO EVENTO E FORMATAR O VALOR

amount.oninput = () => {
    //captura o valor do input e remove caracteres
    let value = amount.value.replace(/\D/g, "")
    //console.log(value)

    //transforma o valor em centavos(Ex.: 150/100 = 1.5)
    value = Number(value) /100

    //retorno para a variável
    amount.value = formatCurrencyBRL(value)
}

//formata valor na moeda brasileira

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-Br",{
        style: "currency",
        currency: "BRL"
    })
    return value
}