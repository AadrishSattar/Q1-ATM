import inquirer from "inquirer";

let loop = true;
while (loop) {
    let userInput = await inquirer.prompt([{
            name: "userInput",
            type: "input",
            message: ("Enter your user account")
        }, {
            name: "userPin",
            type: "password",
            mask: "*",
            message: ("Enter your pin")
        }, {
            name: "accountType",
            type: "list",
            choices: ["Current", "Saving"],
            message: ("Select your account type")
        }, {
            name: "transactionType",
            type: "list",
            choices: ["Fast Cash", "Cash Withdraw", "Balance Inquiry"],
            message: ("Select your trsnsaction type")
        }, {
            name: "amount",
            type: "number",
            message: ("Enter your amount"),
            when(userInput) {
                return userInput.transactionType === "Cash Withdraw";
            }
        }, {
            name: "amount",
            type: "list",
            choices: [2000, 4000, 5000, 8000, 10000],
            message: ("Select your amount"),
            when(userInput) {
                return userInput.transactionType === "Fast Cash";
            }
        }
    ]);
    let usersID = userInput.userInput;
    let userPin = userInput.userPin;
    let accountType = userInput.accountType;
    let transactionType = userInput.transactionType;
    let amount = userInput.amount;
    if ((usersID && userPin) && userInput.transactionType === "Balance Inquiry") {
        let userBalance = 100000;
        console.log(`Your remaining balance is Rs ${userBalance}`);
    }
    else if (usersID && userPin) {
        let userBalance2 = 100000;
        if (userBalance2 > amount) {
            console.log(`Your account has been debited ${amount} and your remaining balance is ${userBalance2 - amount}`);
        }
        else {
            console.log(`Insuffisient Balance`);
        }
    }
    let doMoreTransaction = await inquirer.prompt({
        name: "doMoreTransaction",
        type: "confirm",
        message: ("Do you want to more transaction ??"),
        default: false
    });
    if (!doMoreTransaction.doMoreTransaction) {
        loop = false;
    }
}