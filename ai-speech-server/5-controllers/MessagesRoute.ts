import express from 'express'
import { getDetailsFromToken } from '../1-dal/jwt';
import { translateToUserLanguage } from '../1-dal/translate';
import { getMessagesByUser } from '../3-logic/userLogic';
export const MessagesRoute = express.Router();

MessagesRoute.get('/message', async (req, res) => {
    // const language = req.query.language.toString()
    // const token = req.headers.authorization;

    try {
        const token = req.headers.authorization;
        const { sub, language } = await getDetailsFromToken(token)
        const results = await getMessagesByUser(sub);
        const translatedText = await translateToUserLanguage(results[0].message, language);
        results[0].message = translatedText
        res.status(200).json(results)
    } catch (e) {
        res.status(404).json(e);
    }
})


