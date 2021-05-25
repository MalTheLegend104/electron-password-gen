const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
var fs = require('fs');

var dir = userDataPath + '/config';
var configDir = dir + "/config.json"
async function makeConfig(){
    if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  if (!fs.existsSync(configDir)){
    var finalJSON = 
`{
  "theme": {
    "current": "Dark",
    "userCustom": "null",
    "text": "ffffff" 
  },
    "checkboxes": {
      "numbers": "True",
      "special": "True",
      "letters": "True"
  },
  "settings": {
      "autoCopy": "False",
      "defaultValue": "8"
  }
}`
    fs.writeFileSync(configDir, `${finalJSON}`, function(err) {
      if (err) {
        alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
        return console.error(err);
      }
      console.log("Data written successfully!");
    });  
  }
}

function createWindow () {
  const win = new BrowserWindow({
    resizable: true,
    width: 300,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  win.removeMenu()
  win.loadFile('index.html')
  win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });
}

app.whenReady().then(() => {
  makeConfig().then(createWindow()).catch((err) => console.log(err))

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})