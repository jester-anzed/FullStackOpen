import axios from 'axios'
const baseUrl = '/api/persons'


const create = newObject => {
  return axios.post(baseUrl, newObject)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const deleteData = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`) 
  return  request.then(response => response.data)

}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)

}

export default {create, getAll, deleteData, update}