import {getLyric, getSongDetail} from "@/http/player";

global.audio = new Audio()
let state = {
    duration: 0,//总时长
    currentTime: 0,//当前播放进度
    ended: true,//是否播放完毕
    loop: false,//是否循环
    volume: 0.5,//音量
    muted: false,//是否静音
    pause: true,//是否暂停
    songUrl: '',
    audio: global.audio,
    picUrl: '',
    lyricActiveIndex: 0,
    tipsIndex: 0,
    playIndex: 0,
    playQueue: [],//播放队列,
    playRulesType: 1,
    name: '',
    singerName: '',
    activeId: null
}

let mutations = {
    setLoop(state, data) {
        state.loop = data
        global.audio.loop = data
    },
    setPause(state, data) {
        state.pause = data
        if (data)
            global.audio.pause()
        else
            global.audio.play()
    },
    setMuted(state, data) {
        state.muted = data
        global.audio.muted = data
    },
    setVolume(state, haha) {
        state.volume = haha
        global.audio.volume = haha
    },
    setCurrentTime(state, data) {
        state.currentTime = data.currentTime
        if (!data.set) return
        global.audio.currentTime = data.currentTime
    }
}
let actions = {
    getSongUrl(context, data) { //数组
        console.log(data)
        let playQueue
        let playIndex
        if (typeof data === 'object') {
            context.commit('setPlayQueue', data[0])
            context.commit('setPlayIndex', data[1])
        }
        playQueue = context.getters['getPlayQueue']
        playIndex = context.getters['getPlayIndex']
        data = playQueue[playIndex] //获取对应的歌曲相 以便发送请求

        context.commit('setSongUrl', `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`)//赋值audio 播放链接
        context.commit('setName', data['name'])
        context.commit('setSingerName', data.artists.map(item => item.name).join(' / '))
        context.dispatch('playSong')//播放歌曲
        context.dispatch('getLyric', data)

        context.dispatch('getSongDetail', data)
        context.commit('setActiveId', data.id)
    },
    getLyric(context, data) {//获取歌词
        let playerQueue = context.getters['getPlayQueue']
        for (let i = 0; i < playerQueue.length; i++) {
            if (playerQueue[i].id === data.id && !playerQueue[i].lyricArr) {
                console.log('发送歌词')
                getLyric(data)
                    .then(res => { //处理歌词lyric文件  timeArr存放对于的秒数 lyricArr存放对应的值
                        if (!res['lrc']) return
                        let timeArr = []
                        let lyricArr = []
                        let lyric = res['lrc']['lyric']
                        lyric = lyric.replace(/\[/g, '"').replace(/:/g, ',').replace(/]/g, '":"').replace(/\n/g, '",')
                        lyric = eval('[{' + lyric + '}]')[0]
                        for (const lyricKey in lyric) {
                            if (lyric.hasOwnProperty(lyricKey)) {
                                let lyricKeyArr = lyricKey.split(',')
                                let time = lyricKeyArr[0] * 60 + lyricKeyArr[1] * 1
                                if (lyric[lyricKey]) {
                                    timeArr.push(time)
                                    lyricArr.push(lyric[lyricKey])
                                }
                                delete lyric[lyricKey]
                            }
                        }
                        playerQueue[i].lyricArr = lyricArr
                        playerQueue[i].lyricTimeArr = timeArr
                    })
            }
        }

    },
    getSongDetail(context, data) {

        let playerQueue = context.getters['getPlayQueue']
        for (let i = 0; i < playerQueue.length; i++) {
            if (playerQueue[i].id === data.id && !playerQueue[i].songDetail) {
                getSongDetail(data.id)//获取歌曲详情
                    .then(res => {
                        playerQueue[i].songDetail = res['songs'][0]
                    })
            }
        }

    },
    timeIndex(context, obj) {//获取歌词数组 lyricArr 对应的下标 参数 {str 修改的键值lyricActiveIndex/tipsIndex ，time  秒数}
        let [str, time] = obj
        let lyricTimeArr = context.getters['getPlayQueue'][context.getters['getPlayIndex']]['lyricTimeArr']
        try {
            lyricTimeArr.forEach((item, index) => {
                if (item >= time && lyricTimeArr.length === (index + 1) ? false : lyricTimeArr[index + 1] <= time) {
                    context.commit(str, index + 1)
                }
            })
        } catch (e) {

        }
    },
    playRules(context, type) { //播放规则 [type] 1 顺序 2 倒叙
        let playRulesType = context.getters['getPlayRulesType']
        let playQueue = context.getters['getPlayQueue']
        let playIndex = context.getters['getPlayIndex']
        switch (type ? type : playRulesType) {
            case 1:
                playIndex++
                if (playIndex > playQueue.length - 1)
                    playIndex = 0
                break;
            case 2:
                playIndex--
                if (playIndex < 0)
                    playIndex = playQueue.length - 1
        }
        context.commit('setPlayIndex', playIndex)
        context.dispatch('getSongUrl')
    },
    async playSong(context) {
        audio.src = context.getters.getSongUrl
        await global.audio.play()
        context.commit('setEnded', false)
        context.commit('setPause', false)
        context.commit('setDuration', audio.duration)
        global.audio.onended = global.audio.ontimeupdate = null

        audio.ontimeupdate = () => {
            let currentTime = audio.currentTime
            context.dispatch('timeIndex', ['setLyricActiveIndex', currentTime])
            context.commit('setCurrentTime', {
                currentTime,
                set: false
            })
        }
        global.audio.onended = () => {
            context.commit('setEnded', true)
            context.commit('setPause', true)
            context.dispatch('playRules')
        }
        global.audio.onerror = () => {
            context.commit('setEnded', true)
            context.commit('setPause', true)
            context.dispatch('playRules')
        }
    },
    songStopTab(context) {
        context.commit('setPause', !context.getters['getPause'])
    }
}
export default {
    state,
    actions,
    mutations
}
