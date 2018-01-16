const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const dataset = [[139.77, 35.68], [139.79, 35.66]];

let mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 900, height: 800 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.webContents.openDevTools();

    ipc.on('startup', function(event, payload) {
        switch (payload) {
            case 'flickr-inland':
            event.sender.send('reception', dataset);
            break;
        }
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
