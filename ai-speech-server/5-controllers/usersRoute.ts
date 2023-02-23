import express from 'express';
import { hashedPassword } from '../1-dal/hashedPssword';
import { generateToken } from '../1-dal/jwt';
import { getAllUsers, register } from '../3-logic/userLogic';
import { UserModel } from '../4-model/usersModel';


export const UserRoute = express.Router();

UserRoute.post('/users/register', async (req, res) => {
    const user: UserModel = req.body;
    user.password = hashedPassword(user.password)
    console.log(user);

    try {
        const results = await register(user)
        if (results === 'Email already exists') {
            res.status(404).json(results);
            return;
        }
        const token = await generateToken(user)
        res.status(200).json(token)

    } catch (e) {
        res.status(400).json(e)
    }
})

UserRoute.post('/users/login', async (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const users = await getAllUsers();
    try {
        const user: any = users.find((u: any) => u.username === username && u.password === hashedPassword(password));
        if (user) {
            const token = await generateToken(user)
            res.status(200).json(token);
        } else {
            res.status(401).json('Wrong email or password');
        }
    } catch (e) {
        res.status(400).json('Something went wrong...')
    }
})