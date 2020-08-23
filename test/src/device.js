const { remote, ipcRenderer } = require('electron');
const mainProcces = remote.require('./index');


const check = document.getElementById('check-button');
const slider = document.getElementById('slider');
const roomName = document.getElementById('room_name');
const noDevices = document.getElementById('no-devices');

ipcRenderer.on('loaded-devices', (event, devices, room_name)=>{
    //console.log(devices);
    roomName.textContent = room_name;
    if(devices.length >0){
        devices.forEach(device => {
            let div = document.createElement('div');
            let slideh3 = document.createElement('div');
            slideh3.className = "slide-h3";
            slideh3.id = device.dataValues.device_id;
            let img = document.createElement('img');
            img.src="../icons/"+device.dataValues.device_name+".png";
            img.className ="icon";
            let i = document.createElement('i');
            i.className = "fa fa-lg fa-trash";
            i.textContent = device.dataValues.device_name;
            console.log(device.dataValues.device_name);
            slideh3.appendChild(img);
            slideh3.appendChild(i);
            div.appendChild(slideh3);
            slider.appendChild(div);
        });
    }else{
        noDevices.textContent = "There is no devices in this room";
    }
    
});