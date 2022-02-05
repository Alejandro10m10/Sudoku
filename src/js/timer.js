let timerElement = document.querySelector('#gameTime');

let sec = 0,
    min = 0,
    hrs = 0,
    t;

let hrsAndMin;

initClock();

function initClock(){
    timer();
}

function clock(){
    sec++;
    if(sec >= 60){
        sec = 0;
        min++;
        if(min >= 60){
            min = 0;
            hrs++;
        }
    }
}

function showClock(){
    clock();

    hrsAndMin = (min > 9 ? min : "0" + min)
                + ":" + (sec > 9 ? sec : "0" + sec);

    (hrs == 0) 
        ?  timerElement.textContent = hrsAndMin
        : timerElement.textContent = (hrs > 9 ? hrs : "0" + hrs) 
                                    + ":" + hrsAndMin;

    timer();
}

function timer(){
    t = setTimeout(showClock, 1000);
}