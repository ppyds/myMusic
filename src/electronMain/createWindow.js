import {app, BrowserWindow} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";

global.windowObjs = {}//用于存放所有窗口
export default async function createWindow(options) {
    //限制只能开启一个应用(4.0以上版本)
    const gotTheLock = await app.requestSingleInstanceLock()
    if (!gotTheLock) {
        await app.quit()
        return
    } else {
        await app.on('second-instance', (event, commandLine, workingDirectory) => {
            // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
            if (win) {
                if (win.isMinimized()) win.restore()
                win.focus()
                win.show()
                win.setPosition(0, 0)
            }
        })
    }
    // Create the browser window.
    if (options.parentName) {
        options = {
            ...options,
            modal: true,
            parent: global.windowObjs[options.parentName]
        }
    }
    const routePath = options.routePath ? options.routePath : ''
    let win = new BrowserWindow({
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        show:false,
        ...options,
        devTools: true
    })
    win.on('ready-to-show', function () {
        win.show() // 初始化后再显示
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#' + routePath)
        if (!process.env.IS_TEST) win.webContents.openDevTools({mode:'undocked'})
    } else {
        createProtocol('app')
        await win.loadURL('app://./index.html/#' + routePath)
        win.webContents.openDevTools({mode:'undocked'})
    }


    global.windowObjs[options.name] = win;
    win.on('closed', () => {
        win = null
    })
}
