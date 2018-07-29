import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'http://54.242.168.42.3000'
  })
}
