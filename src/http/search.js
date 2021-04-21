import axios from "axios"
//搜索建议
export const searchSuggestions = params => axios({
    url: global.BASE_URL + 'search/suggest',
    params
})
//搜索
export const search = params => axios({
    url: global.BASE_URL + 'search',
    params
})
