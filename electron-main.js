'use strict';


const {app, BrowserWindow} = require('electron')
const url = require("url")
const path = require("path")


let mainWindow

// Enable live reload for all the files inside your project directory
// require('electron-reload')(__dirname);

// Enable live reload for Electron to0
// require('electron-reload')(__dirname, {
//     // Note that the path to electron may vary according to the main file
//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
//     hardResetMethod: 'exit'
// });

require('electron-reload')(__dirname, {
    electron: require("${__dirname}/node_modules/electron")
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width:988,
        height: 910,
        webPreferences:{
            nodeIntegration:true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file",
            slashes: true 
        })
    )

    //open the DevTools
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed',function(){
        mainWindow = null
    })

    
}


app.on('ready',createWindow)

app.on('window-all-closed',function () {
    if(process.platform !== 'drawin') app.quit()
})

app.on('activate',function(){
    if(mainWindow === null ) createWindow()
})