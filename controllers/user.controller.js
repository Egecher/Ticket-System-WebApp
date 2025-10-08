const User = require('../models/user.model');

exports.getUser = async (req, res) => {
    const user = User.getUserById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
}

exports.createUser = async (req, res) => {
    const { name, email, password, passwordAgain } = req.body;
    if (password !== passwordAgain) {
        return res.status(400).send("Şifreler eşleşmiyor!");
    }

    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password
    };
    User.addUser(newUser);
    res.status(201).json(newUser);
}

exports.deleteUser = async (req, res) => {
    User.deleteUserById(req.params.id);
    res.status(204).send();
}