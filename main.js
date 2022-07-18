const {app, BrowserWindow} = require("electron")

let win;

function createWindow (){
    //create the  browers Window 
    win  = new BrowserWindow({
        width :600,
        height: 600,
        backgroundColor : "#ffffff",
        icon : `src/assets/images/hermes.png`,
    })

    win.loadURL(`file://${__dirname}/dist/HERMES/index.html`)

    //uncomment below to open devtools
    // win.webContents.openDevTools()

    //event when the Window  is closed
    win.on("closed", function(){
        win  = null
    })
}
// Create window on elctron intialization
app.on("ready", createWindow)

//Quit when  all windows are closed
app.on("window-all-closed", function(){

    //on MacOS specific close process
    if (process.platform !="darwin"){
        app.quit()
    }
})

app.on("activate",function(){
    //macOs sepcific close process
    if ( wii  ==null){
        createWindow()
    }
})