import {createStore} from 'vuex'
import search from "@/store/modules/search"
import home from "@/store/modules/home"
import player from "@/store/modules/player"

let modules = {
    search,
    home,
    player
}

function autoGetters(state, getters) {
    let obj = {}
    for (const stateKey in state) {
        if (state.hasOwnProperty(stateKey)) {
            let objKey = 'get' + stateKey.replace(stateKey[0], stateKey[0].toUpperCase());
            if (getters && getters[objKey]) {
                objKey = getters[objKey]
            } else {
                obj[objKey] = function (state) {
                    return state[stateKey]
                }
            }

        }

    }
    return obj
}

function autoMutations(state, mutations) {
    let obj = {}
    for (const stateKey in state) {
        if (state.hasOwnProperty(stateKey)) {
            let objKey = 'set' + stateKey.replace(stateKey[0], stateKey[0].toUpperCase());
            if (mutations && mutations[objKey]) {
                obj[objKey] = mutations[objKey]
            } else {
                obj[objKey] = function (state, data) {
                    state[stateKey] = data
                }
            }
        }
    }
    return obj
}

for (const modulesKey in modules) {
    modules[modulesKey]['getters'] = autoGetters(modules[modulesKey]['state'], modules[modulesKey]['getters'])
    modules[modulesKey]['mutations'] = autoMutations(modules[modulesKey]['state'], modules[modulesKey]['mutations'])
    modules[modulesKey]['namespaced'] = true
}
const {remote, ipcRenderer} = window.require('electron')

export default createStore({
    state: {
        activeWinSize: {
            width: null,
            height: null,
            x: null,
            y: null
        },
        mainScreen: {},//electron.screen.getPrimaryDisplay()
        isMaxWindow: false
    },
    mutations: {
        setActiveWinSize(state, data) {
            state.activeWinSize = data
        },
        setIsMaxWindow(state, data) {
            state.isMaxWindow = data
        },
        setMainScreen(state, data) {
            state.mainScreen = data
        }
    },
    getters: {
        activeWinSize(state) {
            return state.activeWinSize
        },
        isMaxWindow(state) {
            return state.isMaxWindow
        },
        mainScreen(state) {
            return state.mainScreen
        }
    },
    actions: {
        minWindow(context) {
            remote.getCurrentWindow().minimize()
        },
        async maxWindow(context, name) {
            ipcRenderer.send('getWindowOptions', name)
            ipcRenderer.on('getWindowOptions_back', (event, obj) => {
                let {windowSize, mainScreen} = obj
                context.commit('setActiveWinSize', windowSize)
                context.commit('setMainScreen', mainScreen)
                setWindow(context, name)//在回调函数中调用 否则 会造成参数undefined
            })

            function setWindow(context, name) {
                ipcRenderer.send('setWindow', {
                    width: context.getters.mainScreen.size.width,
                    height: context.getters.mainScreen.size.height - 1,
                    x: 0,
                    y: 0
                }, name)
                context.commit('setIsMaxWindow', true)
                ipcRenderer.send('setResizable', false, name)
            }
        },
        activeWindow(context, name) {
            ipcRenderer.send('setResizable', true, name)
            ipcRenderer.send('setWindow', {...context.getters.activeWinSize}, name)
            context.commit('setIsMaxWindow', false)
        },
        closeWindow(context, name) {
            ipcRenderer.send('closeWindow', name)
        }
    },
    modules
})
console.log(modules)

