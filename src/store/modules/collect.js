const electronStore = require('electron-store');
let option = {
//     name:"collect",//文件名称,默认 config
//     fileExtension:"json",//文件后缀,默认json
//     cwd:app.getPath('userData'),//文件位置,尽量不要动
// //    encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
//     clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}
const electron_store = new electronStore();
let collect = electron_store.get('collect')
console.log(collect)
let isSet = collect && Object.keys(collect).length !== 0
electron_store.set('collect', isSet ? collect
    : {
        names: ['我喜欢'],
        list:{

        }
    }
)

const state = {
    collectObj: isSet ? collect : electron_store.get('collect')
}
// const mutations = {
//     setCollectObj(state, arr) {
//         electron_store.set('collect', arr)
//
//     }
// }
collect = null
const actions = {
    addCollectList(context, name) {
        let collect = electron_store.get('collect')
        collect.names = Array.from(new Set([...collect.names, name]))
        context.commit('setCollectObj', collect)
        electron_store.set('collect', collect)
        collect = null
    },
    addCollectObj(context, obj) {
        console.log(obj)
        let collect = electron_store.get('collect')
        let names = collect['list'][obj['item']['id']] ? collect['list'][obj['item']['id']]['names'] : []
        names.push(obj.name)
        names = Array.from(new Set(names))
        collect['list'][obj['item']['id']] = {
            ...obj.item,
            names,
        }
        context.commit('setCollectObj', collect)
        electron_store.set('collect', collect)
        collect = null
        console.log(electron_store.get('collect'))
    }
}
export default {
    state,
    actions
}
