import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv'

dotenv.config()
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);