import { OkPacket } from "mysql2"
import { execute } from "../1-dal/dalSql"
import { UserModel } from "../4-model/usersModel"

export async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const [results] = await execute(query);
    return results;
}

export async function register(user: UserModel) {
    const { firstName, lastName, username, email, password, language } = user;

    const checkIfEmailExistsQuery = `SELECT * FROM users WHERE email = ?`
    const [checkIfEmailExistsResults] = await execute<OkPacket>(checkIfEmailExistsQuery,[email]);
    console.log(checkIfEmailExistsResults.length);
    if(checkIfEmailExistsResults.length > 0){
        return 'Email already exists';
    }
    
    const query = 'INSERT INTO users(firstName,lastName,username,email,password,language) VALUES(?,?,?,?,?,?)'
    const results = await execute<OkPacket>(query, [firstName, lastName, username, email, password, language]);
    user.id = results[0].insertId
    return results;
}

export async function saveUserMessages(message: string, id: string) {
    const timeStamp = new Date().getTime()
    const query = 'INSERT INTO messages(message,role,timestamp,userId) VALUES(?,?,?,?)'
    await execute<OkPacket>(query, [message, 1, timeStamp, id]);
}

export async function getMessagesByUser(id: string): Promise<any> {
    const query = `SELECT * FROM ai.messages WHERE userId = ? and role = 0 ORDER BY timestamp DESC LIMIT 1`
    const [results]: any = await execute<OkPacket>(query, [id]);
    console.log(results);
    return results;
}