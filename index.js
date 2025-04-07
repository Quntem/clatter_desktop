const { app, Tray, Menu, nativeImage, BrowserWindow, webContents } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1000,
      height: 700,
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#f3f3f300',
        symbolColor: '#ffffff',
        height: 40
      }
    })
  
    win.loadURL("https://clatter.work/client/")
    win.webContents.on("did-stop-loading", () => {
      win.webContents.insertCSS('header>.icon-log-out.sidebar-listitem-icon { margin-right: 150px !important; }')
      win.webContents.insertCSS('header { app-region: drag; }')
      win.webContents.insertCSS('#back-btn { display: none; }')
      win.webContents.insertCSS('.sidebar-listitem-icon { app-region: no-drag; }')
      if (win.webContents.getURL().includes("https://clatter.work/authui/")) {
        win.setTitleBarOverlay({
          symbolColor: "#666666",
          color: '#f3f3f300',
        })
      } else {
        win.setTitleBarOverlay({
          symbolColor: "#ffffff",
          color: '#f3f3f300',
        })
      }
    })
}

app.whenReady().then(() => {
    createWindow()
})  


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})