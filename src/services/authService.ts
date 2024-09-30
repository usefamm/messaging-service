// src/services/authService.ts
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Define a secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

class AuthService {
    async register(username: string, password: string) {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return user;
    }

    async login(username: string, password: string) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = this.generateToken(user);
        return { token, user };
    }

    private generateToken(user: any ): string {
        // Create a token payload
        const payload = {
            id: user._id,
            username: user.username,
        };
        
        // Generate a JWT token with an expiration time (e.g., 1 hour)
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    }
}

export default new AuthService();
