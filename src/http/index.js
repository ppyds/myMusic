import axios from "axios"

axios.interceptors.response.use(res => {
    return res.data
})

const BASE_URL = 'https://netease-cloud-music-api-1.vercel.app/'
const banner = () =>axios({
    url:BASE_URL +'banner'
})

import login from './login'

export default {
    ...login(axios,BASE_URL),
    banner
}
