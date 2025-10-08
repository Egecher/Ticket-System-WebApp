const User = require('../models/user.model');

exports.getUser = async (req, res) => {
    const user = User.getUserById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
}

exports.deleteUser = async (req, res) => {
    User.deleteUserById(req.params.id);
    res.status(204).send();
}