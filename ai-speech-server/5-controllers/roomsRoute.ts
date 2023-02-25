import express from 'express';
import { getDetailsFromToken } from '../1-dal/jwt';
import { addRoom, getRoomsByUserId } from '../3-logic/roomsLogic';

export const RoomsRoute = express.Router();


RoomsRoute.get('/rooms', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { sub } = await getDetailsFromToken(token);
        const results = await getRoomsByUserId(sub);
        res.status(200).json(results);
    } catch (e) {
        res.status(401).json(e)
    }
})

RoomsRoute.post('/rooms/add', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { sub } = await getDetailsFromToken(token);
        const results = await addRoom(sub);
        res.status(200).json(results);
    } catch (e) {
        res.status(401).json(e)
    }
})

