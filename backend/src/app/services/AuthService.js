const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');

class AuthService {
    async registerUser(email, password) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        return await UserRepository.createUser({ email, password });
    }

    async loginUser(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user || !(await user.matchPassword(password))) {
            throw new Error('Invalid email or password');
        }

        const token = this.generateToken(user._id);
        return { user, token };
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
    }
}

module.exports = new AuthService();
