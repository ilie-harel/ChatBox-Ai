import express from 'express';
import { ChatGptRoute } from './5-controllers/chatGptRoute';
import cors from 'cors'
import { MessagesRoute } from './5-controllers/MessagesRoute';
import * as dotenv from 'dotenv'
import { UserRoute } from './5-controllers/usersRoute';
import { RoomsRoute } from './5-controllers/roomsRoute';
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());

app.use(ChatGptRoute);
app.use(MessagesRoute);
app.use(UserRoute);
app.use(RoomsRoute);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})