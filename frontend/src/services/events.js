import axios from 'axios'
const baseUrl = 'http://localhost:8080/events'

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/all`)
  return request.data
}

const create = async (newObject) => {
  const response = await axios.post(`${baseUrl}/addEvent`, newObject)
  return response.data
}

// const update = async (id, newObject) => {
//   const request = await axios.put(`${baseUrl}/${id}`, newObject)
//   return request.data
// }

// const deleteOne = async (id) => {
//   const request = await axios.delete(`${baseUrl}/${id}`)
//   return request.data
// }

export default { getAll, create }
