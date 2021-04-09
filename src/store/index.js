import {createStore} from 'vuex'
import search from "@/store/modules/search";

const {remote, ipcRenderer} = window.require('electron')

export default createStore({
    state: {
        activeWinSize: {
            width: null,
            height: null,
            x: null,
            y: null
        },
        isMaxWindow: false
    },
    mutations: {
        setActiveWinSize(state, data) {
            state.activeWinSize = data
        },
        setIsMaxWindow(state, data) {
            state.isMaxWindow = data
        }
    },
    getters: {
        activeWinSize(state) {
            return state.activeWinSize
        },
        isMaxWindow(state) {
            return state.isMaxWindow
        }
    },
    actions: {
        minWindow(context) {
            remote.getCurrentWindow().minimize()
            context.commit('setIsMaxWindow', false)
        },
         maxWindow(context) {
             ipcRenderer.send('getWindowOptions')
             ipcRenderer.on('getWindowOptions_back', (event, windowSize) => {
                context.commit('setActiveWinSize', windowSize)
                console.log(data)
            })
             ipcRenderer.send('setWindow', {
                width: 1930,
                height: 1090,
                x: 0,
                y: 0
            })
             context.commit('setIsMaxWindow', true)
        },
        activeWindow(context) {
            ipcRenderer.send('setWindow', {...context.getters.activeWinSize})
            context.commit('setIsMaxWindow', false)
        },
        closeWindow(context) {
            remote.getCurrentWindow().close()
            context.commit('setIsMaxWindow', false)
        }
    },
    modules: {
        search,
        namespaced: true
    }
})
