const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            // Attendre pour éviter les attaques par force brute
            await new Promise(resolve => setTimeout(resolve, 2000));
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Comparer le mot de passe fourni avec le mot de passe chiffré stocké
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            // Attendre pour éviter les attaques par force brute
            await new Promise(resolve => setTimeout(resolve, 2000));
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Si le mot de passe est correct, générer un token JWT
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' });
        
        res.status(200).json({ message: 'User logged in', token, user: { _id: user._id, external: user.external, firstname: user.firstname, lastname: user.lastname, email: user.email}});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
    
const logout = (req, res) => {
    res.status(200).clearCookie('token').json({ message: 'User logged out' });
}
    
module.exports = {login, logout};
