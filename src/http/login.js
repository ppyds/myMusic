export default function login(axios,BASE_URL) {
    const phoneLogin = (data) =>axios({
        url:BASE_URL +'phone',
        params:data
    })
    return {
        phoneLogin
    }
}
