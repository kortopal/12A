const alarmSound = new Audio(chrome.runtime.getURL("/sounds/alarm.mp3"));
const select_timer_hours = $id("select_timer_hours");
const select_timer_minutes = $id("select_timer_minutes");
const select_timer_seconds = $id("select_timer_seconds");
const timer_text = $id("timer_text");
const btn_start_timer = $id("btn_start_timer");
const btn_pause_timer = $id("btn_pause_timer");
const btn_resume_timer = $id("btn_resume_timer");
const btn_reset_timer = $id("btn_reset_timer");
var parameters;
var paramTimer;
var timer;
var hours;
var minutes;
var seconds;

document.oncontextmenu = function() {return false;}
window.addEventListener("load",function() {
    setBackgroundFile("timer.html");
},false);

function getParam(parameterName) {
    parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

function setTimer() {
    if(seconds > 0) {
        seconds--;
    } else if(seconds == 0) {
        if(minutes > 0) {
            minutes--;
            seconds = 59;
        } else if(minutes == 0) {
            if(hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            } else if(hours == 0) {
                hours = 0;
                minutes = 0;
                seconds = 0;
                clearInterval(timer);
                btn_pause_timer.style.display = "none";
                btn_reset_timer.style.width = "100%";
                $id("timer_header").innerHTML = "Süre Bitti!";
                document.title = "Süre Bitti!";
                alarmSound.load();
                alarmSound.play();
            }
        }
    }
    timer_text.innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
}

document.addEventListener("DOMContentLoaded", function() {
    for(var i=0;i<24;i++) {
        select_timer_hours.innerHTML += "<option value'" + i + "'>" + i + " Saat</option>";
    }
    for(var i=0;i<60;i++) {
        select_timer_minutes.innerHTML += "<option value'" + i + "'>" + i + " Dakika</option>";
    }
    for(var i=0;i<=60;i++) {
        select_timer_seconds.innerHTML += "<option value'" + i + "'>" + i + " Saniye</option>";
    }

    parameters = new URLSearchParams(window.location.search);
    if(parameters.has("timer") == true) {
        paramTimer = parseInt(getParam("timer"));
        paramTimer = Math.abs(paramTimer);
        if(paramTimer <= 1440) {
            if(paramTimer == 1440) {
                hours = 23;
                minutes = 59;
                seconds = 60;
            } else{
                hours = parseInt(paramTimer/60);
                minutes = parseInt(paramTimer%60);
                seconds = 0;
            }
            select_timer_hours.value = hours + " Saat";
            select_timer_minutes.value = minutes + " Dakika";
            select_timer_seconds.value = seconds + " Saniye";
            timer_text.innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
        }
    } else{window.history.replaceState(null, null, "?timer=0");}
}, false);

select_timer_hours.addEventListener("change", function() {
    hours = parseInt(select_timer_hours.value.toString().replace(" Saat", "")); 
    minutes = parseInt(select_timer_minutes.value.toString().replace(" Dakika", "")); 
    seconds = parseInt(select_timer_seconds.value.toString().replace(" Saniye", ""));
    timer_text.innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
});
select_timer_minutes.addEventListener("change", function() {
    hours = parseInt(select_timer_hours.value.toString().replace(" Saat", "")); 
    minutes = parseInt(select_timer_minutes.value.toString().replace(" Dakika", "")); 
    seconds = parseInt(select_timer_seconds.value.toString().replace(" Saniye", ""));
    timer_text.innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
});
select_timer_seconds.addEventListener("change", function() {
    hours = parseInt(select_timer_hours.value.toString().replace(" Saat", "")); 
    minutes = parseInt(select_timer_minutes.value.toString().replace(" Dakika", "")); 
    seconds = parseInt(select_timer_seconds.value.toString().replace(" Saniye", ""));
    timer_text.innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
});
btn_start_timer.addEventListener("click", function() {
    hours = parseInt(select_timer_hours.value.toString().replace(" Saat", "")); 
    minutes = parseInt(select_timer_minutes.value.toString().replace(" Dakika", "")); 
    seconds = parseInt(select_timer_seconds.value.toString().replace(" Saniye", ""));
    timer = setInterval(setTimer,1000);
    btn_start_timer.style.display = "none";
    btn_pause_timer.style.display = "inline-block";
    btn_reset_timer.style.display = "inline-block";
    btn_reset_timer.style.width = "calc(50% - 4px)";
    select_timer_hours.disabled = true;
    select_timer_minutes.disabled = true;
    select_timer_seconds.disabled = true;
    document.title = "Süre Devam Ediyor!";

    document.body.requestFullscreen()
    .then(function() { })
    .catch(function(error) {
        console.log(error.message);
    });
    });
btn_pause_timer.addEventListener("click", function() {
    clearInterval(timer);
    timer_text.innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
    btn_pause_timer.style.display = "none";
    btn_resume_timer.style.display = "inline-block";
    document.title = "Zamanlayıcı Duraklatıldı!";
});
btn_resume_timer.addEventListener("click", function() {
    timer = setInterval(setTimer,1000);
    btn_pause_timer.style.display = "inline-block";
    btn_resume_timer.style.display = "none";
    document.title = "Süre Devam Ediyor!";
});
btn_reset_timer.addEventListener("click", function() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer_text.innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
    btn_start_timer.style.display = "block";
    btn_pause_timer.style.display = "none";
    btn_resume_timer.style.display = "none";
    btn_reset_timer.style.display = "none";
    select_timer_hours.disabled = false;
    select_timer_minutes.disabled = false;
    select_timer_seconds.disabled = false;
    select_timer_hours.value = hours + " Saat";
    select_timer_minutes.value = minutes + " Dakika";
    select_timer_seconds.value = seconds + " Saniye";
    $id("timer_header").innerHTML = "Zamanlayıcı";
    document.title = "Zamanlayıcı - 11/A Akıllı Tahta Eklentisi";
    alarmSound.pause();

    document.exitFullscreen()
    .then(function() { })
    .catch(function(error) {
        console.log(error.message);
    });
});