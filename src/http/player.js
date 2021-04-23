import axios from "axios"
export const getSongUrl = params =>axios({
    url:global.BASE_URL +'song/url',
    params
})
export const getLyric = params =>axios({
    url:global.BASE_URL +'lyric',
    params
})
export const getSongDetail = id =>axios({
    url:global.BASE_URL + 'song/detail',
    params:{
        ids:id
    }
})
