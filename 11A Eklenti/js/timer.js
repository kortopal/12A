const alarmSound = new Audio(chrome.runtime.getURL("/sounds/alarm.mp3"));
var parameters;
var paramTimer;
var timer;
var hours;
var minutes;
var seconds;

document.oncontextmenu = function() {return false;}
window.addEventListener("load",function(event) {
    extension32("timer.html");
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
                minutes = 59;
                seconds = 59;
                hours--;
            } else if(hours == 0) {
                seconds = 0;
                minutes = 0;
                hours = 0;
                clearInterval(timer);
                $id("btn_pause_timer").style.display = "none";
                $id("btn_reset_timer").style.width = "100%";
                alarmSound.load();
                alarmSound.play();
                document.title = "Süre Bitti!";
            }
        }
    }
    $id("timer_text").innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
}

document.addEventListener('DOMContentLoaded', function() {
    for(var i=0;i<24;i++) {
        $id("select_timer_hours").innerHTML += "<option value'" + i + "'>" + i + " Saat</option>";
    }
    for(var i=0;i<=60;i++) {
        $id("select_timer_minutes").innerHTML += "<option value'" + i + "'>" + i + " Dakika</option>";
    }
    for(var i=0;i<=60;i++) {
        $id("select_timer_seconds").innerHTML += "<option value'" + i + "'>" + i + " Saniye</option>";
    }

    parameters = new URLSearchParams(window.location.search);
    if(parameters.has("timer") == true) {
        paramTimer = parseInt(getParam("timer"));
        paramTimer = Math.abs(paramTimer);
        if(paramTimer <= 1440) {
            if(paramTimer == 1440) {
                hours = 23;
                minutes = 59;
                seconds = 59;
            } else{
                hours = parseInt(paramTimer/60);
                minutes = parseInt(paramTimer%60);
                seconds = 0;
            }
            $id("select_timer_hours").value = hours + " Saat";
            $id("select_timer_minutes").value = minutes + " Dakika";
            $id("select_timer_seconds").value = seconds + " Saniye";
            $id("timer_text").innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
        }
    }
}, false);

select_timer_hours.addEventListener("change", function() {
    hours = parseInt($id("select_timer_hours").value.toString().replace(" Saat", "")); 
    minutes = parseInt($id("select_timer_minutes").value.toString().replace(" Dakika", "")); 
    seconds = parseInt($id("select_timer_seconds").value.toString().replace(" Saniye", ""));
    $id("timer_text").innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
});
select_timer_minutes.addEventListener("change", function() {
    hours = parseInt($id("select_timer_hours").value.toString().replace(" Saat", "")); 
    minutes = parseInt($id("select_timer_minutes").value.toString().replace(" Dakika", "")); 
    seconds = parseInt($id("select_timer_seconds").value.toString().replace(" Saniye", ""));
    $id("timer_text").innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
});
select_timer_seconds.addEventListener("change", function() {
    hours = parseInt($id("select_timer_hours").value.toString().replace(" Saat", "")); 
    minutes = parseInt($id("select_timer_minutes").value.toString().replace(" Dakika", "")); 
    seconds = parseInt($id("select_timer_seconds").value.toString().replace(" Saniye", ""));
    $id("timer_text").innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
});

$id("btn_start_timer").addEventListener("click", function() {
    hours = parseInt($id("select_timer_hours").value.toString().replace(" Saat", "")); 
    minutes = parseInt($id("select_timer_minutes").value.toString().replace(" Dakika", "")); 
    seconds = parseInt($id("select_timer_seconds").value.toString().replace(" Saniye", ""));
    timer = setInterval(setTimer,1000);
    $id("btn_start_timer").style.display = "none";
    $id("btn_pause_timer").style.display = "inline-block";
    $id("btn_reset_timer").style.display = "inline-block";
    $id("btn_reset_timer").style.width = "calc(50% - 4px)";
    $id("select_timer_hours").disabled = true;
    $id("select_timer_minutes").disabled = true;
    $id("select_timer_seconds").disabled = true;
    document.title = "Süre Devam Ediyor!";
});
$id("btn_pause_timer").addEventListener("click", function() {
    clearInterval(timer);
    $id("timer_text").innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
    $id("btn_pause_timer").style.display = "none";
    $id("btn_resume_timer").style.display = "inline-block";
    document.title = "Zamanlayıcı Duraklatıldı!";
});
$id("btn_resume_timer").addEventListener("click", function() {
    timer = setInterval(setTimer,1000);
    $id("btn_pause_timer").style.display = "inline-block";
    $id("btn_resume_timer").style.display = "none";
    document.title = "Süre Devam Ediyor!";
});
$id("btn_reset_timer").addEventListener("click", function() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    $id("timer_text").innerHTML = (hours<10 ? "0" : "") + hours + ":" + (minutes<10 ? "0" : "") + minutes + ":" + (seconds<10 ? "0" : "") + seconds;
    $id("btn_start_timer").style.display = "block";
    $id("btn_pause_timer").style.display = "none";
    $id("btn_resume_timer").style.display = "none";
    $id("btn_reset_timer").style.display = "none";
    $id("select_timer_hours").disabled = false;
    $id("select_timer_minutes").disabled = false;
    $id("select_timer_seconds").disabled = false;
    $id("select_timer_hours").value = hours + " Saat";
    $id("select_timer_minutes").value = minutes + " Dakika";
    $id("select_timer_seconds").value = seconds + " Saniye";
    alarmSound.pause();
    document.title = "Zamanlayıcı | 11/A Akıllı Tahta Eklentisi";
});

$id("btn_focus_mode_on").addEventListener("click", function() {
    $id("btn_focus_mode_on").style.display = "none";
    $id("btn_focus_mode_off").style.display = "inline-block";
    document.documentElement.requestFullscreen();
});
$id("btn_focus_mode_off").addEventListener("click", function() {
    $id("btn_focus_mode_on").style.display = "inline-block";
    $id("btn_focus_mode_off").style.display = "none";
    document.exitFullscreen();
});