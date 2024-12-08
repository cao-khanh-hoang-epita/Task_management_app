const UserRepository = require('../repositories/UserRepository');

class AuthController {
    async register(req, res) {
        console.log('Incoming Request Body:', req.body); // Log the request body
        const { email, password } = req.body;
    
        try {
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and Password are required' });
            }
    
            const existingUser = await UserRepository.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
    
            const user = await UserRepository.createUser({ email, password });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error('Error during registration:', error.message); // Log backend errors
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UserRepository.findByEmail(email);
            if (!user || !(await user.matchPassword(password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            res.json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
