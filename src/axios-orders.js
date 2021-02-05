import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-f1ea7-default-rtdb.firebaseio.com/'
})

export default instance