import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

function getToken() {
    const token = localStorage.getItem('ChatBoxToken');
    return token
}
class ApiService {
    // users

    async login(user) {
        const results = await axios.post(`${BASE_URL}/users/login`, user);
        return results;
    }


    async register(user) {
        const results = await axios.post(`${BASE_URL}/users/register`, user);
        return results;
    }

    async changeUserLanguage(language, gender) {
        const token = getToken()
        const results = fetch(`${BASE_URL}/users/language?lan=${language}&gender=${gender}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        const data = await (await results).json();
        return data;
    }

    // google users

    async googleAuth(user) {
        const results = await axios.post(`${BASE_URL}/google/auth`, user);
        return results;
    }

    // messages

    sendMessageToChatGPT(message) {


        console.log(message);
        const token = getToken()
        const results = fetch(`${BASE_URL}/message`, {
            method: 'POST',
            body: JSON.stringify(message),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        return results;
    }

    async getMessagesByUserIdAndRoomId(roomId) {
        const token = getToken()
        const results = fetch(`${BASE_URL}/message/room/${roomId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        return await (await results).json();
    }

    // rooms

    async getRoomsByUserId() {
        const token = getToken()
        const results = await fetch(`${BASE_URL}/rooms`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        const data = await results.json()
        return data
    }

    async addRoom() {
        const token = getToken()
        const results = await fetch(`${BASE_URL}/rooms/add`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        const data = await results.json()
        return data[0]
    }

    async updateRoomName(name, roomId) {
        const token = getToken()
        const results = axios.post(`${BASE_URL}/rooms/edit/${roomId}?name=${name}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        })
        return results;
    }

    async deleteRoom(roomId) {
        const token = getToken()
        const results = await fetch(`${BASE_URL}/rooms/delete/${roomId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        console.log(results);
    }



    // voices

    async googleVoices() {
        const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY
        const voices = await fetch(`https://texttospeech.googleapis.com/v1/voices?key=${GOOGLE_KEY}`, {
        })
        const data = voices.json();
        return data;

    }

    async getEncodedAudioGoogle(request) {
        const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY
        const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        return await response.json()
    }

}

export const apiService = new ApiService()