/* This file is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = 'http://localhost:8080/demo'

const register  = async (user) => {
    const response = await axios.post(`${baseUrl}/users/add`, {
        withCredentials: true,
        user
    });
    return response.data
}

export default { register }