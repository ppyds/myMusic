import {getLyric} from "@/http/player";

global.audio = new Audio()
let state = {
    duration: 0,//总时长
    currentTime: 0,//当前播放进度
    ended: false,//是否播放完毕
    loop: false,//是否循环
    volume: 0.5,//音量
    muted: false,//是否静音
    songUrl: '',
    audio: global.audio,
    picUrl: '',
    lyricArr: [],
    lyricTimeArr: [],
    lyricActiveIndex: 0
}

let mutations = {
    setLoop(state, data) {
        state.loop = data
        global.audio.loop = data
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
    getSongUrl(context, data) {
        context.commit('setSongUrl', `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`)
        context.dispatch('playSong')
        getLyric(data)
            .then(res => {
                if (!res['lrc'])return
                let lyric = res['lrc']['lyric']
                lyric = lyric.replace(/\[/g, '"').replace(/:/g, ',').replace(/]/g, '":"').replace(/\n/g, '",')
                lyric = eval('[{' + lyric + '}]')[0]
                let timeArr = []
                let lyricArr = []
                for (const lyricKey in lyric) {
                    if (lyric.hasOwnProperty(lyricKey)) {
                        let lyricKeyArr = lyricKey.split(',')
                        let time = lyricKeyArr[0] * 60 + lyricKeyArr[1] * 1
                        if (lyric[lyricKey]) {
                            timeArr.push(time)
                            lyricArr.push(lyric[lyricKey])
                            delete lyric[lyricKey]
                        }
                        delete lyric[lyricKey]
                    }
                }
                console.log(lyricArr.length, timeArr.length)
                context.commit('setLyricArr', lyricArr)
                context.commit('setLyricTimeArr', timeArr)
            })

    },
    async playSong(context) {
        audio.src = context.getters.getSongUrl
        await global.audio.play()
        audio.addEventListener('timeupdate', () => {
            let currentTime = audio.currentTime
            let lyricTimeArr = context.getters['getLyricTimeArr']
            lyricTimeArr.forEach((item, index) => {
                 if (item >= currentTime && lyricTimeArr.length === (index + 1) ? false: lyricTimeArr[index + 1] <= currentTime ) {
                // if (item < currentTime) {
                    context.commit('setLyricActiveIndex', index + 1)
                }
            })
            context.commit('setCurrentTime', {
                currentTime,
                set: false
            })
        })
        context.commit('setDuration', audio.duration)
    }
}
export default {
    state,
    actions,
    mutations
}
