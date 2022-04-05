/* This file is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = 'http://localhost:8080'

//////// Account functions //////////////////////

const register = async (user) => {
  console.log(user.query)
  const response = await axios.post(`${baseUrl}/users/add`, {
    withCredentials: true,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  })
  console.log(
    '\n----\nservices/users.js register\n' + response.data + '\n----\n'
  )
  return response.data
}


const login = async (user) => {
  const response = await axios.post(`${baseUrl}/users/login`, {
    email: user.email,
    password: user.password,
  })
  console.log(
    '\n----services/users.js login\n response.data:' +
      response.data +
      '\n----\n'
  )
  return response.data
}

////////////// Friends functions ////////////////////////


const getAllUsers = async() => {
  console.log('Getting all users\n')
  const response = await axios.get(`${baseUrl}/users/all`);
  console.log(response.data)
  return response.data;
}


const getFriends = async(user) => {
  console.log('Getting friends for email ' + user.email + '\n')
  const response = await axios.post(`${baseUrl}/users/friends/getAllFriends`, {
    email: user.email
  });
  console.log(response.data)
  return response.data

}

// const getFriends = async(email) => {
//   console.log('Getting friends \n')
//   const response = await axios.get(`${baseUrl}/users/friends/all`);
//   console.log(response.data)
//   return response.data

// }

const getFriendRequests = async(user) => {
  console.log('Getting friend requests for email ' + user.email + ' \n')
  const response = await axios.post(`${baseUrl}/users/friends/getAllFriendsRequests`, {
    email: user.email
  });
  console.log(response.data)
  return response.data

}

// const getFriendRequests = async(email) => {
//   console.log('Getting friend requests \n')
//   const response = await axios.get(`${baseUrl}/users/friends/allRequests`);
//   console.log(response.data)
//   return response.data

// }

const getSentFriendRequests = async(user) => {
  console.log('Getting sent friend requests for email ' + user.email + '\n')
  const response = await axios.post(`${baseUrl}/users/friends/getAllSentFriendsRequests`, {
    email: user.email
  });
  console.log(response.data)
  return response.data

}

const sendFriendRequest = async(user) => {
  console.log('Sending friend request')
  const response = await axios.put(`${baseUrl}/users/friends/send-request`, {
    email: user.email,
    friendRequests: user.friendRequests
  })

  console.log(response.data)
  return response.data
}

export default { register, getAllUsers, login, getFriends, getFriendRequests, getSentFriendRequests, sendFriendRequest }
