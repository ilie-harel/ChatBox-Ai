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


        console.log(message);
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

    // getMessagesByUser() {
    //     const token = getToken()
    //     const results = fetch(`http://localhost:3046/message`, {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${token}`,
    //             'accept-charset': 'utf-8'
    //         },
    //     })
    //     return results;
    // }

    async getMessagesByUserIdAndRoomId(roomId) {
        const token = getToken()
        const results = fetch(`http://localhost:3046/message/room/${roomId}`, {
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

    // voices

    async getVoicesFromGoogle() {
        const results = await fetch('https://texttospeech.googleapis.com/v1/voices?key=', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const { voices } = await results.json()
        return voices;
    }


    // rooms

    async getRoomsByUserId() {
        const token = getToken()
        const results = await fetch('http://localhost:3046/rooms', {
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
        const results = await fetch('http://localhost:3046/rooms/add', {
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
        const results = axios.post(`http://localhost:3046/rooms/edit/${roomId}?name=${name}`,{
            headers:{
                'authorization': `Bearer ${token}`,
            }
        })
        return results;
    }

    async deleteRoom(roomId){
        const token = getToken()
        const results = await fetch(`http://localhost:3046/rooms/delete/${roomId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
                'accept-charset': 'utf-8'
            },
        })
        console.log(results);
        // const data = await results.json()
        // return data[0]
    }
}

export const apiService = new ApiService()