const mathForDay = 60 * 60 * 24 * 1000;
let clientPayCheck = [];
let actualDate = Date();

function register() {
    let payCheck = {
        name: document.getElementById('personName').value,
        dateV: document.getElementById('possibleDate').value,
        purchase: document.getElementById('possibleValue').value
    }
    if (payCheck.name == "" || payCheck.dateV == "" || payCheck.purchase == "") {
        alert("Preencha todos os campos!");
    } else {
        clientPayCheck.push(payCheck);
    }
    clear();
}

function clear() {
    document.getElementById('personName').value = "";
    document.getElementById('possibleDate').value = "";
    document.getElementById('possibleValue').value = "";
}

function calculateInterest() {
    document.getElementById('account').innerHTML = "";
    let accountData = {
        name: "Nome",
        dateV: "Data de Vencimento",
        purchase: "Valor para ser pago",
    }
    showAll(accountData)

    function calculatorTaxes(obj) {
        let today = new Date(actualDate);
        let expire = new Date(obj.dateV)
        let dateComparison = ((today.getTime() - expire.getTime()) / (mathForDay)).toFixed(0);
        obj.purchase = parseInt(obj.purchase)
        let objMod = {
            name: obj.name,
            dateV: obj.dateV,
            purchase: obj.purchase
        }
        if (dateComparison > 0) {
            objMod.purchase += objMod.purchase * ((dateComparison * 0.001) + 0.02);
        }
        objMod.dateV = objMod.dateV.split('-').reverse().join('/');
        return objMod;
    }
    let interestRate = clientPayCheck.map(calculatorTaxes)

    function showAll(obj2) {
        let create = document.createElement('div')
        create.classList.add('register-column');
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let span3 = document.createElement('span')
        span1.innerHTML = obj2.name + " ";
        span2.innerHTML = obj2.dateV;
        span3.innerHTML = " R$" + obj2.purchase + " ";
        create.appendChild(span1);
        create.appendChild(span2);
        create.appendChild(span3);
        document.getElementById('account').appendChild(create);
    }
    interestRate.forEach(showAll)
}


function byGroup(objt, prop) {
    return objt.reduce(function(acc, obj) {
        let key = obj[prop]
        if (!acc[key]) {
            acc[key] = []
        }
        acc.push(obj)
        return acc;

    }, [])

}

function byClient() {
    let groupByClient = byGroup(clientPayCheck, "name")
    let groupLenght = groupByClient.length
    let order = groupByClient.sort((a, b) => (a.name > b.name ? 1 : -1))
    for (let i = 0; i < groupLenght; i++) {
        if (i === 0) {
            document.getElementById('groups').innerHTML = "";
            document.getElementById('groups').innerHTML = `
                <tr>
                    <th>Cliente</th>
                    <th>Vencimento</th>
                    <th>Valor da compra</th>
                </tr>
                `;
            document.getElementById('groups').innerHTML += `
            <tr>
                <td>${order[i].name}</td>
                <td>${order[i].dateV}</td>
                <td>${order[i].purchase}</td>
            </tr>
            `
        } else if (i >= 1) {
            document.getElementById('groups').innerHTML += `
            <tr>
                <td>${order[i].name}</td>
                <td>${order[i].dateV}</td>
                <td>${order[i].purchase}</td>
            </tr>
            `
        }

    }
}

function byDate() {
    let groupByDate = byGroup(clientPayCheck, "dateV")
    let groupLenght = groupByDate.length
    let order = groupByDate.sort((a, b) => (a.dateV > b.dateV ? 1 : -1))
    for (let i = 0; i < groupLenght; i++) {
        if (i === 0) {
            document.getElementById('groups').innerHTML = "";
            document.getElementById('groups').innerHTML = `
                <tr>
                    <th>Vencimento</th>
                    <th>Cliente</th>
                    <th>Valor da compra</th>
                </tr>
                `;
            document.getElementById('groups').innerHTML += `
            <tr>
                <td>${order[i].dateV}</td>
                <td>${order[i].name}</td>
                <td>${order[i].purchase}</td>
            </tr>
            `
        } else if (i >= 1) {
            document.getElementById('groups').innerHTML += `
            <tr>
                <td>${order[i].dateV}</td>
                <td>${order[i].name}</td>
                <td>${order[i].purchase}</td>
            </tr>
            `
        }

    }

}