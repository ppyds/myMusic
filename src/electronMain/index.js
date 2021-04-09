import {screen} from "electron";

function getWindowOptions([win,screen] = data) {  //获取窗口 大小 位置
    let windowSize = win.getContentBounds();
    win.webContents.send('getWindowOptions_back', windowSize)
}

export default function ({ipcMain, win,screen} = obj) {
    ipcMain.on('getWindowOptions', () => {
        getWindowOptions([win,screen])  //将窗口信息发送给 渲染进程
    })
    ipcMain.on('setWindow', (event, options) => {  //修改窗口位置 大小
        win.setSize(options.width, options.height)
        win.setPosition(options.x, options.y)
    })
}

