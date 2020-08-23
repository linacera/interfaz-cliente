const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Room = require('./models/room');
const Device = require('./models/device');
const Action = require('./models/action');
var sequelize = require('./db/connection');
const { QueryTypes } = require('sequelize');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  //cec#8001Dorado
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../views/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', async () => {
    rooms = await this.getRooms();
    mainWindow.webContents.send('loaded-rooms', rooms);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('clicked-room', async (event, room_id) =>{
  console.log(room_id);
  let devices = await getDevices(room_id);
  let room_name = await getRoomName(room_id);
  //console.log(devices);
  // Create the browser window.
  const deviceWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  deviceWindow.loadFile(path.join(__dirname, '../views/devices.html'));
  deviceWindow.webContents.openDevTools();
  deviceWindow.webContents.on('did-finish-load',  () => {
    deviceWindow.webContents.send('loaded-devices', devices, room_name);
  });
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.




/*  Device.findAll({ attributes: ['id_device', 'device_name'] })
  .then(device => {
    console.log(device)
  })
  .catch(err => {
    console.log(err)
  })

  async function getRoomWithDevice(){
    try {
      const awesomeCaptain = await Room.findOne({
        where: {
          id_room: 1
        },
        include: Device
      });
    
      console.log(awesomeCaptain);
    } catch (error) {
      console.log(error);
    }
    
  }

  getRoomWithDevice();
*/

exports.getRooms = async () => {
  let rooms = [];
  try {
  //  console.log('In get rooms');
    rooms = await Room.findAll({attributes: ['room_id', 'room_name']});
    return rooms;
  } catch (error) {
    console.log(error)
  }
}

async function getRoomName (room_id){
  room = await Room.findOne(
    {attributes: ['room_name'], where: {room_id: room_id}, });
  return room.dataValues.room_name;
}

async function getDevices (room_id) {
  let devices = [];
  try {
    //console.log('In get devices');
    devices = await Device.findAll(
      {
        where: {room_id: room_id}
      });
    console.log(devices);
    return devices;
  } catch (error) {
    console.log(error)
  }

}



