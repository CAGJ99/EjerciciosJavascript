const clients = [{
        id: 1,
        taxNumber: '86620855',
        name: 'HECTOR ACUÑA BOLAÑOS'
    },
    {
        id: 2,
        taxNumber: '7317855K',
        name: 'JESUS RODRIGUEZ ALVAREZ'
    },
    {
        id: 3,
        taxNumber: '73826497',
        name: 'ANDRES NADAL MOLINA'
    },
    {
        id: 4,
        taxNumber: '88587715',
        name: 'SALVADOR ARNEDO MANRIQUEZ'
    },
    {
        id: 5,
        taxNumber: '94020190',
        name: 'VICTOR MANUEL ROJAS LUCAS'
    },
    {
        id: 6,
        taxNumber: '99804238',
        name: 'MOHAMED FERRE SAMPER'
    }
];
const accounts = [{
        clientId: 6,
        bankId: 1,
        balance: 15000
    },
    {
        clientId: 1,
        bankId: 3,
        balance: 18000
    },
    {
        clientId: 5,
        bankId: 3,
        balance: 135000
    },
    {
        clientId: 2,
        bankId: 2,
        balance: 5600
    },
    {
        clientId: 3,
        bankId: 1,
        balance: 23000
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 15000
    },
    {
        clientId: 3,
        bankId: 3,
        balance: 45900
    },
    {
        clientId: 2,
        bankId: 3,
        balance: 19000
    },
    {
        clientId: 4,
        bankId: 3,
        balance: 51000
    },
    {
        clientId: 5,
        bankId: 1,
        balance: 89000
    },
    {
        clientId: 1,
        bankId: 2,
        balance: 1600
    },
    {
        clientId: 5,
        bankId: 3,
        balance: 37500
    },
    {
        clientId: 6,
        bankId: 1,
        balance: 19200
    },
    {
        clientId: 2,
        bankId: 3,
        balance: 10000
    },
    {
        clientId: 3,
        bankId: 2,
        balance: 5400
    },
    {
        clientId: 3,
        bankId: 1,
        balance: 9000
    },
    {
        clientId: 4,
        bankId: 3,
        balance: 13500
    },
    {
        clientId: 2,
        bankId: 1,
        balance: 38200
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 17000
    },
    {
        clientId: 1,
        bankId: 3,
        balance: 1000
    },
    {
        clientId: 5,
        bankId: 2,
        balance: 600
    },
    {
        clientId: 6,
        bankId: 1,
        balance: 16200
    },
    {
        clientId: 2,
        bankId: 2,
        balance: 10000
    }
]
const banks = [{
        id: 1,
        name: 'SANTANDER'
    },
    {
        id: 2,
        name: 'CHILE'
    },
    {
        id: 3,
        name: 'ESTADO'
    }
];

let juntarClientsAccountsBanks = () => {
    var banksNewName = banks.map(bank => {
        return { bankId: bank.id, nameBank: bank.name };
    });
    var clientsNewName = clients.map(client => {
        return { clientId: client.id, taxNumber: client.taxNumber, name: client.name };
    });


    const mergeByClientId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.clientId === itm.clientId) && item),
                ...itm
            }));
    const mergeByBankId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.bankId === itm.bankId) && item),
                ...itm
            }));


    let mergeClientsAccounts = mergeByClientId(accounts, clientsNewName);
    let mergeClientsAccountsBanks = mergeByBankId(mergeClientsAccounts, banksNewName);


    return mergeClientsAccountsBanks;
}

let CuentasYClientes = juntarClientsAccountsBanks();
/*
SECCIÓN PROBLEMAS
- Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
- Se debe programar un algoritmo para cada método y que este retorne lo requerido.
- Debe usar nombres explicativos para sus variables.
- Usar sintaxis ES6.
*/


// 0 Arreglo con los ids de clientes
let listClientsIds = () => clients.map(client => client.id);
// 1 Arreglo con los ids de clientes ordenados por rut

let listClientsIdsSortByTaxNumber = () => {
    // se ordena el arreglo por TaxNumber y se guarda en la variable Arreglo
    let Arreglo = clients.sort((a, b) => a.taxNumber.localeCompare(b.taxNumber));

    //Regresa solo los id de los clientes ordenados por TaxNumber
    return Arreglo.map(sortByTax => sortByTax.id);
}

// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
let sortClientsTotalBalances = (Cuentas = accounts, Clientes = clients) => {
        let SaldoCliente = Cuentas.reduce((total, duplicado) => {
            total[duplicado.clientId] = (total[duplicado.clientId] || 0) + duplicado.balance;
            return total;
        }, {});

        let resultado = Object.keys(SaldoCliente).sort((a, b) => {
            SaldoCliente[a] - SaldoCliente[b];
        });
        for (let x in resultado) {
            for (let y in Clientes) {
                if (Clientes[y].id == resultado[x]) {
                    resultado[x] = Clientes[y].name;
                }
            }
        }

        return resultado;
    }
    // 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
let banksClientsTaxNumbers = (bancos = banks) => {
    let Resultado = {}
    for (let bank in banks) {
        let clientexbanco = CuentasYClientes.filter((clientes) => clientes.nameBank === banks[bank].name).map(clientes => clientes.name).sort();

        let valueClientNameXBank = Array.from(new Set(clientexbanco));
        let clientContainer = [];
        for (let index in valueClientNameXBank) {
            clientRegister = clients.filter(client => {
                return client.name === valueClientNameXBank[index]
            });
            if (clientRegister.length > 0) {
                clientContainer.push(clientRegister[0]);
            }
        }
        Resultado[banks[bank].name] = clientContainer.map(client => client.taxNumber);
    }
    return Resultado;
}

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
let richClientsBalances = () => {
        return CuentasYClientes.filter(clientes => clientes.nameBank === 'SANTANDER' && clientes.balance > 25000)
            .map((clientes) => clientes.balance).sort((a, b) => b - a);
    }
    // 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
let banksRankingByTotalBalance = () => {
    let bankEstruct = accounts.reduce((totalCount, element) => {
        totalCount[element.bankId] = (totalCount[element.bankId] || 0) + element.balance;
        return totalCount;
    }, {});
    return Object.keys(bankEstruct).sort(function(a, b) { return bankEstruct[a] - bankEstruct[b] })
}

// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
let banksFidelity = () => {
        let bankList = [];
        for (let indexClient in clients) {
            let userCountBank = Array.from(new Set(CuentasYClientes.filter(client => {
                return client.clientId === clients[indexClient].id;
            }).map(client => {
                return client.nameBank;
            })));
            if (userCountBank.length === 1) {
                bankList.push(userCountBank);
            }
        }
        bankList = bankList.reduce((totalCount, element) => {
            totalCount[element] = (totalCount[element] || 0) + 1;
            return totalCount;
        }, {});
        for (let indexBank in banks) {
            if (!Object.keys(bankList).find(a => {
                    return banks[indexBank].name === a
                })) {
                bankList[banks[indexBank].name] = 0;
            }
        }
        return bankList;
    }
    // 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
let banksPoorClients = () => {
    let bank = {};
    for (let indexBank in banks) {
        let totalBalanceByClient = (CuentasYClientes.filter(a => a.nameBank === banks[indexBank].name)
            .reduce((totalcount, element) => {
                totalcount[element.clientId] = (totalcount[element.clientId] || 0) + element.balance;
                return totalcount
            }, {}));

        for (let index in totalBalanceByClient) {
            if (totalBalanceByClient[index] === Math.min(...Object.values(totalBalanceByClient))) {
                bank[banks[indexBank].name] = index;
            }
        }
    }
    return bank;
}

// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 

// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
let newClientRanking = () => {
        const Clients = clients.slice(0, clients.length);
        const Accounts = accounts.slice(0, accounts.length);


        let newBalance = 9000;


        let newClient = {
            id: Math.max(...Clients.map(a => a.id)) + 1,
            taxNumber: '186642239',
            name: 'ALVARO MORATA'
        }

        let newAccount = {
            clientId: newClient.id,
            bankId: 3,
            balance: newBalance
        }
        Clients.push(newClient);
        Accounts.push(newAccount);

        position = sortClientsTotalBalances(Accounts, Clients).findIndex(a => a === newClient.name) + 1;
        return (`${newClient.name} Rank in the ${position} place`);
    }
    // Impresión de soluciones. No modificar.
console.log('Pregunta 0');
console.log(listClientsIds());

console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());

console.log('Pregunta 2');
console.log(sortClientsTotalBalances());

console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());

console.log('Pregunta 4');
console.log(richClientsBalances());

console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());

console.log('Pregunta 6');
console.log(banksFidelity());

console.log('Pregunta 7');
console.log(banksPoorClients());

console.log('Pregunta 8');
console.log(newClientRanking());