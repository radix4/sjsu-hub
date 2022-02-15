/* This file is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = 'http://localhost:8080/demo'

const register  = async (user) => {
    const response = await axios.post(`${baseUrl}/users/add`, {
        withCredentials: true,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    });
    console.log('\n----\nservices/users.js register\n' + response.data + '\n----\n')
    return response.data
}

export default { register }