import axios from "axios"
import login from './login'

axios.interceptors.response.use(res => {
    return res.data
})

global.BASE_URL = 'https://netease-cloud-music-api-1.vercel.app/'
const banner = () => axios({
    url: BASE_URL + 'banner'
})

export default {
    ...login(axios, BASE_URL),
    banner
}
