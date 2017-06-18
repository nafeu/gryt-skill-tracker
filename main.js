const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

let win

function createWindow () {
  win = new BrowserWindow({width: 640, height: 700, titleBarStyle: 'hiddenInset'})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

// ---------------------------------------------------------------------------
// Application Lifecycle
// ---------------------------------------------------------------------------

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})