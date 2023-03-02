import { OkPacket } from "mysql2";
import { openai } from "../1-dal/chatGpt";
import { execute } from "../1-dal/dalSql";
import { getMessagesByRoomAndUserId } from "./messagesLogic";

// export async function getMessageFromChatGPTandSave(message: string, id: number, roomId: number) {
//     const history = await getMessagesByRoomAndUserId(roomId,id);
//     let prompt = "";

//     for (const msg of history) {
//         prompt += msg.message + "\n\n";
//     }
//     prompt += message;

//     try {
//         const completion = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: prompt,
//             max_tokens: 1000,            
//         });        
//         const reply = completion.data.choices[0].text;
//         const timeStamp = new Date().getTime();
//         const query = 'INSERT INTO messages(message,role,timestamp,userId,roomId) VALUES(?,?,?,?,?)'
//         const res = await execute<OkPacket>(query, [reply, 0, timeStamp, +id, roomId]);
//         return reply
//     } catch (e) {
//         return 'There has been an error, try again'
//     }
// }
export async function getMessageFromChatGPTandSave(message: string, id: number, roomId: number) {
    const history = await getMessagesByRoomAndUserId(roomId, id);

    const messages = [];
    messages.push({ role: 'system', content: 'you are a helpful assistant' })

    for (const msg of history) {
        if (msg.role === 0) {
            messages.push({ role: 'assistant', content: msg.message });
        } else if (msg.role === 1) {
            messages.push({ role: 'user', content: msg.message });
        }
    }

    try {
        const completion: any = openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages
        })
        let { data } = await completion
        const reply = data.choices[0].message.content;
        const timeStamp = new Date().getTime();
        const query = 'INSERT INTO messages(message,role,timestamp,userId,roomId) VALUES(?,?,?,?,?)'
        const res = await execute<OkPacket>(query, [reply, 0, timeStamp, +id, roomId]);
        return reply
    } catch (e) {
        return 'There has been an error, try again'
    }
}




