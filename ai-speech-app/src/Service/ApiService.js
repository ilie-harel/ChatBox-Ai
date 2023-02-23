import axios from 'axios'

function getToken() {
    const token = localStorage.getItem('ChatBoxToken');
    return token
}
class ApiService {
    // users

    async login(user) {
        const results = await axios.post('http://localhost:3046/users/login', user);
        return results;
    }


    async register(user) {
        const results = await axios.post('http://localhost:3046/users/register', user);
        return results;
    }



    // messages

    sendMessageToChatGPT(message) {
        const token = getToken()
        const results = fetch(`http://localhost:3046/message`, {
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

    getMessagesByUser() {
        const token = getToken()
        const results = fetch(`http://localhost:3046/message`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        return results;
    }

    // voices

    async getVoicesFromGoogle(){
        const results = await fetch('https://texttospeech.googleapis.com/v1/voices?key=',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const {voices} = await results.json()
        return voices;
    }
}

export const apiService = new ApiService()