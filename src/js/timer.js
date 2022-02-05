let timerElement = document.querySelector('#gameTime');

let sec = 0,
    min = 0,
    hrs = 0,
    t;

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

    timerElement.textContent = (hrs > 9 ? hrs : "0" + hrs) 
                            + ":" + (min > 9 ? min : "0" + min)
                            + ":" + (sec > 9 ? sec : "0" + sec);

    timer();
}

function timer(){
    t = setTimeout(showClock, 1000);
}