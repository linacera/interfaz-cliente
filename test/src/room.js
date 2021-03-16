const { remote, ipcRenderer } = require('electron');
const mainProcces = remote.require('./index');


const checkButton = document.getElementById('check-button');
const nextButton = document.getElementById('right-button');
const returnButton = document.getElementById('return-button');
const previousButton = document.getElementById('left-button');
const slider = document.getElementById('slider');

ipcRenderer.on('loaded-rooms', (event, rooms)=>{
//    console.log(rooms);
    rooms.forEach(room => {
        let divUno = document.createElement('div');
        let slideh3 = document.createElement('div');
        slideh3.className = "slide-h3";
        slideh3.id = room.dataValues.room_id;
        let img = document.createElement('img');
        img.src="../icons/"+room.dataValues.icon_id+".png";
        img.className ="icon";
        let i = document.createElement('i');
        i.id = room.dataValues.room_id-1;
        i.value = room.dataValues.room_name;
        i.className = "fa fa-lg fa-trash";
        i.textContent = room.dataValues.room_name;
     //   console.log(room.dataValues.room_name);
        slideh3.appendChild(img);
        slideh3.appendChild(i);
        divUno.appendChild(slideh3);
        slider.appendChild(divUno);
    });
});

const check = () => {
    //currentSlide = getElementById
    currentSlide = $('.slick-current');  
    room_id = currentSlide[0].firstElementChild.id;
    ipcRenderer.send('clicked-room', room_id);
    $('#check-button').addClass('green-background');
    setTimeout(() => $('#check-button').removeClass('green-background'), 1000)
   // mainProcces.send('clicked-room', room_id);
}

const next = () => {
    $('#slider').slick('slickNext');
    $('#right-button').addClass('green-background');
    setTimeout(() => $('#right-button').removeClass('green-background'), 1000)
}

const previous = () => {
    $('#slider').slick('slickPrev');
    $('#left-button').addClass('green-background');
    setTimeout(() => $('#left-button').removeClass('green-background'), 1000)
}

const returnClicked = () => {
    var window = remote.getCurrentWindow();
    ipcRenderer.send('closed-window')
    $('#return-button').addClass('green-background');
    setTimeout(() => $('#return-button').removeClass('green-background'), 1000)
    window.close();
}

checkButton.addEventListener('click', check);
returnButton.addEventListener('click', returnClicked);
nextButton.addEventListener('click', next);
previousButton.addEventListener('click', previous);

ipcRenderer.on('check', check);
ipcRenderer.on('next', next);
ipcRenderer.on('return', returnClicked);
ipcRenderer.on('previous', previous);

