const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, "./db/contacts.json");
const {v4: uuid} = require('uuid');

// TODO: задокументировать каждую функцию
async function listContacts() {
    const contactsRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(contactsRaw);
    return db;
}
  
async function getContactById(contactId) {
    const db = await listContacts();
    const findContact = db.find(i => i.id == contactId);
    return findContact;
}
  
async function removeContact(contactId) {
    const db = await listContacts();
    const contact = db.find((i) => i.id == contactId);
    if (!contact) return null;
    const contacts = db.filter((i) => i.id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
    return contacts;
}
  
async function addContact(name, email, phone) {
    const contact = { id: uuid(), name, email, phone };
    const db = await listContacts();
    db.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(db));
    console.table(db);
    return contact;
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};