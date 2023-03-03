import express from 'express';
import { generateToken } from '../1-dal/jwt';
import { googleRegister } from '../3-logic/googleUsers';

export const GoogleUsersRoute = express.Router();

GoogleUsersRoute.post('/google/auth', async (req, res) => {
    const user = req.body;
    try {
        const results = await googleRegister(user)
        console.log(results);
        
        if (results[0] === 'Email already exists') {
            user.id = results[1]
            const token = await generateToken(user)
            res.status(200).json(token);
            return;
        }
        user.id = results
        const token = await generateToken(user)
        res.status(200).json(token)

    } catch (e) {
        res.status(400).json(e)
    }
})