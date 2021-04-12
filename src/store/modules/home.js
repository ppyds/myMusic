import getHttps from '@/http'

console.log(getHttps)
const {banner} = getHttps
console.log(banner)
const state = {
    bannerList: [
    ]
}
const getters = {
    getBannerList(state) {
        return state.bannerList
    }
}
const mutations = {
    setBannerList(state, data) {
        state.bannerList = data
    }
}
const actions = {
    request_bannerList(context) {
        console.log(4444444444444444)
        banner()
            .then((res) => {
                console.log(res)
                context.commit('setBannerList', res.banners)
            })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
