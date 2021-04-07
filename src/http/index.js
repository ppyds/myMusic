import axios from "axios"

axios.interceptors.response.use(res => {
    return res.data
})

const BASE_URL = 'http://localhost:3200/'
export const prompt = (params) =>axios({ //搜索提示
    url:BASE_URL + 'getSmartbox',
    params
})

export const search = (params) =>axios({
    url:BASE_URL + 'getSearchByKey', //搜索
    params
})