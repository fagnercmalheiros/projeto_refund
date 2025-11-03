//SELECIONA OS ELEMENTOS DO FORMULÁRIO
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const expenseList = document.querySelector("ul")


//seleciona elementos de totais
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

//CAPTURA DO EVENTO E FORMATAR O VALOR

amount.oninput = () => {
    //captura o valor do input e remove caracteres
    let value = amount.value.replace(/\D/g, "")
    //console.log(value)

    //transforma o valor em centavos(Ex.: 150/100 = 1.5)
    value = Number(value) / 100

    //retorno para a variável
    amount.value = formatCurrencyBRL(value)
}

//formata valor na moeda brasileira

function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-Br", {
        style: "currency",
        currency: "BRL"
    })
    return value
}

//captura evento de subimit do form
form, onsubmit = (event) => {
    //previne comport. de att automatica
    event.preventDefault()

    //cria objeto detalhado da nova despesa

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    expenseAdd(newExpense)
}

// adição dos itens na lista

function expenseAdd(newExpense) {
    try {
        // cria elemento para add na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //crindo o icone da categoria

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //criando a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //criando nome da desp
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //criando a categoria da despesa
        const expenseCategory = document.creatElement("span")
        expenseCategory.textContent = newExpense.category_name

        // add nome e categoria na div, atens do item
        expenseInfo.append(expenseName, expenseCategory)


        //add o valor
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.replace("R$","")}`

        //add icone de remover

        const removeIcon = document.creatElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src","img/remove.svg")
        removeIcon.setAttribute("alt","remover")


        //add info do item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount,removeIcon)

        //add itens na lista
        expenseList.append(expenseItem)

        // chama a atualização de totais
        updateTotals()

    } catch (error) {
        alert('Não foi possível atualizar a lista de despesa')
        console.log(error)
    }
}

function updateTotals(){
    try {
        //recuperar todos os itens (li) da lista (ul)
        const items = expenseList.children
        //console.log(items)

        //atualiza a quant de itens
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        //variável para incremetar total
        let total = 0

        //percorrer cada item (li)
        for(let item = 0; item < items.length; item++){
            //percorre cada item(li) e busca somente a classe expense-amount
            const itemAmount = items[item].querySelector(".expense-amount")
            console.log(itemAmount)

            // coleta somente o valor
            const value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

            //converter o valor para float
            const valueFormatted = parseFloat(value)

            //verificar se é um número

        }

    } catch (error) {
        console.log(error)
        alert('Não foi possível atualizar os valores')
    }
}
