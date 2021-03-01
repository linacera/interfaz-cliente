const { remote, ipcRenderer } = require('electron');
const mainProcces = remote.require('./index');


const checkButton = document.getElementById('check-button');
const returnButton = document.getElementById('return-button');
const nextButton = document.getElementById('right-button');
const previousButton = document.getElementById('left-button');
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
        slider.classList.remove('slider');
        noDevices.textContent = "There is no devices in this room";
    }
    
});

const check = () =>{
    //currentSlide = getElementById
    currentSlide = $('.slick-current');  
    device_id = currentSlide[0].firstElementChild.id;
    ipcRenderer.send('clicked-device', device_id)
}

const returnClicked = () => {
    var window = remote.getCurrentWindow();
    ipcRenderer.send('closed-window')
    window.close();
}

const next = () => {
    $('#slider').slick('slickNext');
}

const previous = () => {
    $('#slider').slick('slickPrev');
}

ipcRenderer.on('check', check);
ipcRenderer.on('return', returnClicked);
ipcRenderer.on('next', next);
ipcRenderer.on('previous', previous);


nextButton.addEventListener('click', next);
checkButton.addEventListener('click', check)
returnButton.addEventListener('click', returnClicked)
previousButton.addEventListener('click', previous);