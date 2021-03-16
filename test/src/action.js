const { remote, ipcRenderer } = require('electron');
const mainProcces = remote.require('./index');


const checkButton = document.getElementById('check-button');
const returnButton = document.getElementById('return-button');
const slider = document.getElementById('slider');
const nextButton = document.getElementById('right-button');
const previousButton = document.getElementById('left-button');
const deviceName = document.getElementById('device_name');
const noActions = document.getElementById('no-actions');

ipcRenderer.on('loaded-actions', (event, actions, device_name, isMainApp)=>{
    //console.log(actions);
    deviceName.textContent = device_name;
    if(actions.length >0){
        actions.forEach(action => {
            let div = document.createElement('div');
            let slideh3 = document.createElement('div');
            slideh3.className = "slide-h3";
            slideh3.id = action.dataValues.action_id;
            let img = document.createElement('img');
            console.log(action.dataValues.icon_id);
            img.src="../icons/"+action.dataValues.icon_id+".png";
            img.className ="icon";
            let i = document.createElement('i');
            i.className = "fa fa-lg fa-trash";
            i.textContent = action.dataValues.action_name;
            console.log(action.dataValues.action_name);
            slideh3.appendChild(img);
            slideh3.appendChild(i);
            div.appendChild(slideh3);
            slider.appendChild(div);
        });
    }else{
        slider.classList.remove('slider');
        noActions.textContent = "There is no actions in this room";
    }

    if(isMainApp){
        returnButton.setAttribute('disabled',true)
    }
    
});

const check = (element) => {
    currentSlide = $('.slick-current');  
    action_id = currentSlide[0].firstElementChild.id;
    //console.log(action_id)
    ipcRenderer.send('clicked-action', action_id);
    $('#check-button').addClass('green-background');
    setTimeout(() => $('#check-button').removeClass('green-background'), 1000)
}

const returnClicked = () => {
    var window = remote.getCurrentWindow();
    ipcRenderer.send('closed-window')
    $('#return-button').addClass('green-background');
    setTimeout(() => $('#return-button').removeClass('green-background'), 1000)
    window.close();
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

nextButton.addEventListener('click', next);

returnButton.addEventListener('click', returnClicked);
checkButton.addEventListener('click', check);
previousButton.addEventListener('click', previous);

ipcRenderer.on('next', next);
ipcRenderer.on('check', check);
ipcRenderer.on('return', returnClicked);
ipcRenderer.on('previous', previous);