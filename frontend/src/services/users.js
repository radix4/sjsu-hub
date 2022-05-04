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


const getFriendRequests = async(user) => {
  console.log('Getting friend requests for email ' + user.email + ' \n')
  const response = await axios.post(`${baseUrl}/users/friends/getAllFriendsRequests`, {
    email: user.email
  });
  console.log(response.data)
  return response.data

}


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
  const response = await axios.post(`${baseUrl}/users/friends/send-request`, {
    email: user.email,
    friendRequests: user.friendRequests
  })

  console.log(response.data)
  return response.data
}

const cancelFriendRequest = async(user) => {
  console.log('2 is canceling request sent to user ' + user.sentFriendRequests[0])
  const response = await axios.post(`${baseUrl}/users/friends/cancel-sent-request`, {
    email: user.email,
    sentFriendRequests: user.sentFriendRequests
  })

  console.log(response.data)
  return response.data
}

const acceptFriendRequest = async(user) => {
  console.log('2 is accepting request sent by user ' + user.friendRequests[0])
  const response = await axios.post(`${baseUrl}/users/friends/accept-request`, {
    email: user.email,
    friendRequests: user.friendRequests
  })

  console.log(response.data)
  return response.data
}

const declineFriendRequest = async(user) => {
  console.log('2 is declining request sent by user ' + user.friendRequests[0])
  const response = await axios.post(`${baseUrl}/users/friends/decline-request`, {
    email: user.email,
    friendRequests: user.friendRequests
  })

  console.log(response.data)
  return response.data
}


const unfriend = async(user) => {
  console.log('2 is unfriending user ' + user.friends[0])
  const response = await axios.post(`${baseUrl}/users/friends/unfriend`, {
    email: user.email,
    friends: user.friends
  })

  console.log(response.data)
  return response.data
}

/*const findUser = async(email) => {
  console.log("inside findUsre")
  const response = await axios.get(`${baseUrl}/users/find`, {
    email: email
  });
  console.log("returned full name:" + response.data)
  return response.data
}*/

export default { 
  register, 
  getAllUsers, 
  login, 
  getFriends, 
  getFriendRequests, 
  getSentFriendRequests, 
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  unfriend,
   }
