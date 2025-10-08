const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/Users.json');

function getUsers() {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
}

function getUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === id);
}

function addUser(user) {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

function deleteUserById(id) {
    let users = getUsers();
    users = users.filter(u => u.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

module.exports = { getUsers, getUserById, addUser, deleteUserById };