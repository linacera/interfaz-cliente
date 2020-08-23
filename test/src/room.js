const { remote, ipcRenderer } = require('electron');
const mainProcces = remote.require('./index');


const check = document.getElementById('check-button');
const slider = document.getElementById('slider');

ipcRenderer.on('loaded-rooms', (event, rooms)=>{
//    console.log(rooms);
    rooms.forEach(room => {
        let div = document.createElement('div');
        let slideh3 = document.createElement('div');
        slideh3.className = "slide-h3";
        let img = document.createElement('img');
        img.src="../icons/"+room.dataValues.room_name+".png";
        img.className ="icon";
        let i = document.createElement('i');
        i.id = room.dataValues.room_id-1;
        i.value = room.dataValues.room_name;
        i.className = "fa fa-lg fa-trash";
        i.textContent = room.dataValues.room_name;
     //   console.log(room.dataValues.room_name);
        slideh3.appendChild(img);
        slideh3.appendChild(i);
        div.appendChild(slideh3);
        slider.appendChild(div);
    });
});

check.addEventListener('click', () => {
    //currentSlide = getElementById
    currentSlide = $('.slick-current');  
    //console.log(currentSlide.data);
    index = currentSlide.attr("data-slick-index");
    currentSlideId = parseInt(index, 10);
    console.log(currentSlideId);
    room_id = currentSlideId + 1;
    console.log(room_id);
    ipcRenderer.send('clicked-room', room_id)
   // mainProcces.send('clicked-room', room_id);
})
