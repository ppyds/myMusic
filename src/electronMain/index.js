import {ipcMain, screen} from 'electron'
import createWindow from "@/electronMain/createWindow";
function getWindowOptions(win) {  //获取窗口 大小 位置
    let windowSize = win.getContentBounds();
    let mainScreen = screen.getPrimaryDisplay();
    let obj = {
        windowSize,
        mainScreen
    }
    win.webContents.send('getWindowOptions_back', obj)
}

export default function () {
    ipcMain.on('getWindowOptions', (e, name) => {
        console.log(global.windowAObj[name])
        getWindowOptions(global.windowAObj[name])  //将窗口信息发送给 渲染进程
    })
    ipcMain.on('setWindow', (event, options, name) => {  //修改窗口位置 大小
        global.windowAObj[name].setSize(options.width, options.height)
        global.windowAObj[name].setPosition(options.x, options.y)
    })
    ipcMain.on('setResizable', (e, bool, name) => {
        global.windowAObj[name].setResizable(bool)
    })
    ipcMain.on('createWindow', (e, options) => {
        createWindow(options)
    })
}

