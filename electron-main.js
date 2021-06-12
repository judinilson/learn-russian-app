'use strict';


const {app, BrowserWindow} = require('electron')
const url = require("url")
const path = require("path")


let mainWindow
let splash




function createWindow() {
    mainWindow = new BrowserWindow({
        width:988,
        height: 910,
        webPreferences:{
            nodeIntegration:true
        },
        show: false // don't show the main window
    })

    // create a new `splash`-Window 
  splash = new BrowserWindow({width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true});
  splash.loadURL(`file://${__dirname}/splash.html`);
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });

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

// Enable live reload for all the files inside your project directory
try {
  require('electron-reloader')(module)
} catch (_) {}