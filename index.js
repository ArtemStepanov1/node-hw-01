const argv = require("yargs").argv;

const db = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contacts = await db.listContacts();
        console.table(contacts);
        break;

    case "get":
        const contact = await db.getContactById(id);
        console.table(contact);
        break;

    case "add":
        await db.addContact(name, email, phone);
        break;

    case "remove":
        await db.removeContact(id);
        break;

    default:
        console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({action: "list"});
// invokeAction({action: "get", id: "5"});
// invokeAction({action: "add", name: "Mango", email: "mango@gmail.com", phone: "322-22-22"});
// invokeAction({action: "remove", id: "e9748980-1c42-4cf4-ab8a-59ccac5691ec"});


invokeAction(argv);



// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3