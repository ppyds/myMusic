import {search, searchSuggestions} from '@/http/search'

const state = {
    singleArr: {
        songCount: 0,
        songList: [],
        offset:0
    }
    ,
    albumArr: [],
    limit: 30,
    offset: 0,
    type: '1',
    searchKey: 'null'
}

const actions = {
    searchSuggestions(context, params) { //搜索提示词
        searchSuggestions(params)
            .then(res => {
                params.callback(res['result']['allMatch'].map(
                    (item) => ({
                        value: item['keyword']
                    })
                ))
            })
            .catch(res => {

            })
    },
    search(context, params) { //搜索
        console.log(params)
        // 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
        //
        // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        search(params)
            .then(res => {
                switch (params.type) {
                    case 1:
                        let singleArr = context.getters['getSingleArr']
                        if (params.offset !== 0)
                            context.commit('setSingleArr', {
                                songCount: res.result.songCount,
                                songList: [...singleArr['songList'], ...res.result.songs]
                            })
                        else
                            context.commit('setSingleArr', {
                                songCount: res.result.songCount,
                                songList: [...res.result.songs]
                            })
                        console.log(context.getters['getSingleArr'], 555555555555)
                }
            })
    }
}
// singer
export default {
    state,
    actions
}
