import Menu, {app,BrowserWindow} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";

global.windowAObj = {}//用于存放所有窗口
export default async function createWindow(options) {

    // Create the browser window.
    if (options.parentName) {
        options = {
            ...options,
            modal: true,
            parent: global.windowAObj[options.parentName]
        }
    }
    const routePath = options.routePath ? options.routePath : ''
    let win = new BrowserWindow({
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true
        },
        ...options
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#' + routePath)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        await win.loadURL('app://./index.html/#' + routePath)
    }
    global.windowAObj[options.name] = win;
    win.webContents.openDevTools({mode:'bottom'})
}
