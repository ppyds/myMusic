import {search, searchSuggestions} from '@/http/search'
import {millisecondsToMinutes} from '@/tools'

const state = {
    singleArr: {
        songCount: 0,
        songList: [],
        offset: 0
    },
    isSearch: true,
    albumArr: [],
    limit: 30,
    offset: 0,
    type: '1',
    searchKey: 'null',
    searchTipsArr: []
}
const mutations = {
    setSearchKey(state, val) {
        state.searchKey = val
        state.singleArr.offset = 0;
    }
}
const actions = {
    searchSuggestions(context, params) { //搜索提示词
        searchSuggestions(params)
            .then(res => {
                context.commit('setSearchTipsArr', res['result']['allMatch'].map(
                    (item) => item['keyword']
                ))
            })
            .catch(res => {

            })
    },
    search(context, params) { //搜索
        // 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
        //
        // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        params = {
            offset: context.getters['getSingleArr'].offset,
            keywords: context.getters['getSearchKey'],
            ...params
        }
        if (!context.getters['getIsSearch']) return
        context.commit('setIsSearch', false)
        search({...params, offset: context.getters['getSingleArr'].offset * context.getters['getLimit']})
            .then(res => {
                switch (params.type) {
                    case 1:
                        res.result.songs.map(item => {
                            item.duration = millisecondsToMinutes(item.duration)
                            return {
                                ...item
                            }
                        })
                        let singleArr = context.getters['getSingleArr']
                        if (params.offset !== 0)
                            context.commit('setSingleArr', {
                                songCount: res.result.songCount,
                                songList: [...singleArr['songList'], ...res.result.songs],
                                offset: (context.getters['getSingleArr'].offset + 1)
                            })
                        else
                            context.commit('setSingleArr', {
                                songCount: res.result.songCount,
                                songList: [...res.result.songs],
                                offset: context.getters['getSingleArr'].offset + 1
                            })
                }
            })
            .finally(() => {
                context.commit('setIsSearch', true)
            })
    }
}
// singer
export default {
    state,
    actions,
    mutations
}
