import * as jwt from 'jsonwebtoken';
import { UserModel } from '../4-model/usersModel';

export const PRIVATE_KEY = "BDJKQsalbjsakbdjsabdjsbdWBDKJQWBJDQWD"

export async function generateToken(user: UserModel) {
    return jwt.sign({
        'sub': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'language': user.language
    }, PRIVATE_KEY)
}


export async function getDetailsFromToken(token: any) {
    try {
        const verifyToken = jwt.verify(token.substring(7), PRIVATE_KEY);
        const { sub, language, firstName, lastName, email } = verifyToken
        return { sub, language, firstName, lastName, email }
    } catch (e) {
        return e
    }
}