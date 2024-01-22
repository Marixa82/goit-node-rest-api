import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath = path.resolve("db", "contacts.json")

const updateContact = contacts => {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
export const listContacts = async () => {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
}

export const getContactById = async (id) => {
    const contacts = await listContacts();
    console.log(contacts);
    const result = contacts.find(item => item.id === id);
    return result || null;

}
export async function updateContactById(id, { name, email, phone }) {
    const contacts = await listContacts();

    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    if (name !== undefined) {
        contacts[index].name = name;
    }
    if (email !== undefined) {
        contacts[index].email = email;
    }
    if (phone !== undefined) {
        contacts[index].phone = phone;
    }
    await updateContact(contacts);

    return contacts[index];
};

export async function removeContact(id) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    };
    const [result] = contacts.splice(index, 1);
    await updateContact(contacts);
    return result;
}

export async function addContact({ name, email, phone }) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;

}