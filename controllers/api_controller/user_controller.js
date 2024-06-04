const User = require('../../models/user_model');

const createUser = (req, res) => {
    const user = new User({
        external: req.body.external,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        forms: req.body.forms,
        created_at: new Date()
    });
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
}

const getUser = (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((
        user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

const getAllUsers = (req, res) => {
    User.find().then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

const update = (req, res) => {
    const _id = req.params.id;
    User.findByIdAndUpdate(_id, req.body).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        // récupération de l'utilisateur mis à jour
        User.findById(_id).then((user) => {
            res.send(user);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
}

const deleteUser = (req, res) => {
    const _id = req.params.id;
    User.findByIdAndDelete(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

module.exports = {createUser, getUser, getAllUsers, update, deleteUser};
