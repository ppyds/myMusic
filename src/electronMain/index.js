import {ipcMain, screen} from 'electron'
import createWindow from "@/electronMain/createWindow";

async function getWindowOptions(win) {  //获取窗口 大小 位置
    let windowSize = await win.getContentBounds();
    let mainScreen = await screen.getPrimaryDisplay();
    let obj = {
        windowSize,
        mainScreen
    }
    win.webContents.send('getWindowOptions_back', obj)
}

ipcMain.on('getWindowOptions', (e, name) => {
    getWindowOptions(global.windowObjs[name])  //将窗口信息发送给 渲染进程
})
ipcMain.on('setWindow', (event, options, name) => {  //修改窗口位置 大小
    global.windowObjs[name].setSize(options.width, options.height)
    global.windowObjs[name].setPosition(options.x, options.y)
})
ipcMain.on('setResizable', (e, bool, name) => {//是否可以修改窗口大小
    global.windowObjs[name].setResizable(bool)
})
ipcMain.on('createWindow', (e, options) => {
    createWindow(options)
})
ipcMain.on('closeWindow', (e, name) => {
    global.windowObjs[name].close()
})

