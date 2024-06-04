// Initialize the database connection
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    external: {type: Boolean, required: true},
    email: {type: String, required: true},
    password: {type: String, required: false},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    forms: {type: Array, required: false},
    created_at: {type: Date, required: true},
});

userSchema.pre('save', async function(next) {
    const user = this;
    
    if (!user.password || !user.isModified('password')) return next(); // si le mot de passe n'est pas modifié ou l'attribut n'existe pas, on passe à l'étape suivante

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model('Users', userSchema);
