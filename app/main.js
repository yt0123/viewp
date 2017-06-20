var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;

var dataset = [[139.77, 35.68], [139.79, 35.66]];

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 900, height: 800 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    //mainWindow.openDevTools();

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
