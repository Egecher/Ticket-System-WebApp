const User = require('../models/user.model');

exports.getUser = async (req, res) => {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
}

exports.deleteUser = async (req, res) => {
    User.findOneAndDelete(req.params.id);
    res.status(204).send();
}