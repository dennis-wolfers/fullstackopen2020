import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authentication: token }
  }

  const request = await axios.get(baseUrl, config)

  return request(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken }