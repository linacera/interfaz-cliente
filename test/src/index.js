const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const Room = require('./models/room');
const Device = require('./models/device');
const Action = require('./models/action');
const mqtt = require('mqtt');
const dgram = require('dgram');

const client  = mqtt.connect('mqtt://mqtt.beebotte.com', {
  username: 'MbWwPZK9laPYyBXU8NFRsE9SOFlqzM8H', password: ''
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let windows = [];
let server;
let currentWindow = [];

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //cec#8001Dorado
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, './views/index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.once('did-finish-load', async () => {
    rooms = await getRooms();
    mainWindow.webContents.send('loaded-rooms', rooms);
  });

  mainWindow.webContents.once('ready-to-show', () => {
    currentWindow.push(mainWindow);
  })

  server = dgram.createSocket('udp4');
  server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
  });
  server.bind(5123);
  server.on('message', (msg, rinfo) => {
   // console.log('[receivedMessage]', `${msg}`, currentWindow)
    console.log(`${msg}`)
    switch (`${msg}`) {
      case "1":
        currentWindow[currentWindow.length - 1].webContents.send('check')
        break;
      case "2":
        currentWindow[currentWindow.length - 1].webContents.send('next');
        break;
      case "3":
        currentWindow[currentWindow.length - 1].webContents.send('return');
        break;
      case "4":
        currentWindow[currentWindow.length - 1].webContents.send('previous');
        break;
    }
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
  let devices = await getDevices(room_id);
  let room_name = await getRoomName(room_id);
  //console.log(devices);
  // Create the browser window.
  const deviceWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  deviceWindow.loadFile(path.join(__dirname, './views/devices.html'));
  //deviceWindow.webContents.openDevTools();
  deviceWindow.webContents.on('did-finish-load',  () => {
    deviceWindow.webContents.send('loaded-devices', devices, room_name);
  });
  deviceWindow.webContents.once('ready-to-show', () => {
    currentWindow.push(deviceWindow);
  })
})


ipcMain.on('clicked-device', async (event, device_id) => {
  let actions = await getActions(device_id);
  let device_name = await getDeviceName(device_id);
  const roomWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  roomWindow.loadFile(path.join(__dirname, './views/actions.html'));
  //roomWindow.webContents.openDevTools();
  roomWindow.webContents.on('did-finish-load',  () => {
    roomWindow.webContents.send('loaded-actions', actions, device_name);
    currentWindow.push(roomWindow);
  });

})

ipcMain.on('closed-window', () => currentWindow.pop())

ipcMain.on('clicked-action', async (event, action_id) => {
  
  device_name = await getActionDeviceName(action_id);
  device_id = await getActionDeviceId(action_id);
  actual_action = await getActualAction(action_id);
  if(device_name == 'Light'){
    client.publish("home/light", JSON.stringify({"type":"light","state":actual_action}))
  }else{
    client.publish("home/"+device_name, JSON.stringify({"type":"plug","state":actual_action,"plugNumber":device_id - 1}))
  }

})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

async function getRooms(){
  let rooms = [];
  try {
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
  //  console.log(devices);
    return devices;
  } catch (error) {
    console.log(error)
  }
}

async function getDeviceName(device_id){
  device = await Device.findOne(
    {attributes: ['device_name'], where: {device_id: device_id}, });
  return device.dataValues.device_name;
}

async function getActionDeviceName(action_id){
  try {
    action = await Action.findOne(
      {attributes: ['device_id'], where: {action_id: action_id}, });
    actionDeviceId = action.dataValues.device_id;
    device = await Device.findOne(
      {attributes: ['device_name'], where: {device_id: actionDeviceId}, });
    return device.dataValues.device_name;
  } catch (error) {
    console.log(error)
  }
}

async function getActionDeviceId(action_id){
  try {
    action = await Action.findOne(
      {attributes: ['device_id'], where: {action_id: action_id}, });
    actionDeviceId = action.dataValues.device_id;
    return actionDeviceId;
  } catch (error) {
    console.log(error)
  }
}



async function getActualAction(action_id){
  action = await Action.findOne(
    {attributes: ['actual_action'], where: {action_id: action_id}, });
  actual_action = action.dataValues.actual_action;
  return actual_action;
}

async function getActions(device_id){
  try {
    //console.log('In get actions');
    actions = await Action.findAll(
      {
        where: {device_id: device_id}
      });
    //console.log(actions);
    return actions;
  } catch (error) {
    console.log(error)
  }
}



