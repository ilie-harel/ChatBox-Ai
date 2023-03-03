import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dalSql";
import { GoogleUserModel } from "../4-model/usersModel";

export async function googleRegister(user: GoogleUserModel) {
    const { firstName, lastName, email, language } = user;
    const checkIfEmailExistsQuery = `SELECT * FROM users WHERE email = ?`
    const [checkIfEmailExistsResults] = await execute<OkPacket>(checkIfEmailExistsQuery, [email]);
    console.log(checkIfEmailExistsResults.length);
    if (checkIfEmailExistsResults.length > 0) {
        console.log(checkIfEmailExistsResults);
        const getIdQuery = `SELECT id FROM users WHERE email = ?`
        const [getIdResults] = await execute<OkPacket>(getIdQuery, [email]);
        
        return ['Email already exists', getIdResults[0].id];
    }
    const query = 'INSERT INTO users(firstName,lastName,email,language) VALUES(?,?,?,?)'
    const results = await execute<OkPacket>(query, [firstName, lastName, email, language]);
    const id = results[0].insertId;
    return id;
}