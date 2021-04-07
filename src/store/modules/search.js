import {prompt, search} from '@/http'

const state = {
    searchArr: [],
    promptArr: []

}
const getters = {
    getSearchArr(state) {
        return state.searchArr
    },
    getPromptArr(state) {
        return state.promptArr
    }
}
const mutations = {
    setSearchArr(state, searchArr) {
        state.searchArr = searchArr
    },
    setPromptArr(state, promptArr) {
        return state.promptArr = promptArr
    }
}
const actions = {
    prompt(context, params) { //搜索提示词
        context.commit('setPromptArr', [])
        prompt(params)
            .then(res => {
                let arr = []
                const obj = res.response.data
                for (const key in obj) {
                    if (arr.length >= 10) return
                    const names = obj[key].itemlist.map((item, index) => item.name)
                    arr.push(...names)
                }
                arr = Array.from(new Set(arr))

                context.commit('setPromptArr', arr)
            })
            .catch(res => {
                console.log(res)
            })

    },
    search(context, params) { //搜索
        context.commit('setSearchArr', [])
        params = {
            remoteplace:'song',
            ...params
        }
        search(params)
            .then(res => {
                context.commit('setSearchArr', res.response.data.song)
            })
            .catch(reg => {
                console.log(reg)
            })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,

}
