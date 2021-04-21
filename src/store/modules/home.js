import getHttps from '@/http'
const {banner} = getHttps
const state = {
    bannerList: [],
    ssdadas:[]
}
const actions = {
    request_bannerList(context) {
        banner()
            .then((res) => {
                console.log(res)
                context.commit('setBannerList', res.banners)
            })
    }
}
export default {
    state,
    actions
}
