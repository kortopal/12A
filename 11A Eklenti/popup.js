let url = chrome.runtime.getURL("popup.html");
const select_theme_color = document.getElementById("select_theme_color");
const input_timer = document.getElementById("input_timer");
const header_text = document.getElementById("header_text");
var date = new Date();

window.addEventListener("contextmenu", e => e.preventDefault());
function popupOnload() {
    if(5<date.getHours() && date.getHours()<10) {
        header_text.innerHTML = "Günaydın";
        header_text.style.fontSize = "23px";
        header_text.style.top = "12.5px";
    } else if(9<date.getHours() && date.getHours()<12) {
        header_text.innerHTML = "11/A";
        header_text.style.fontSize = "28px";
        header_text.style.top = "6.5px";
    } else if(12<=date.getHours() && date.getHours()<15) {
        header_text.innerHTML = "Tünaydın";
        header_text.style.fontSize = "23px";
        header_text.style.top = "12.5px";
    } else {
        header_text.innerHTML = "11/A";
        header_text.style.fontSize = "28px";
        header_text.style.top = "6.5px";
    }
}

document.getElementById("btn_settings_on").addEventListener("click", function() {
    document.getElementById("main").style.display = "none";
    document.getElementById("btn_settings_on").style.display = "none";
    document.getElementById("settings").style.display = "block";
    document.getElementById("btn_settings_off").style.display = "block";
    document.title = "Ayarlar | 11/A Akıllı Tahta Eklentisi";
});
document.getElementById("btn_settings_off").addEventListener("click", function() {
    document.getElementById("main").style.display = "block";
    document.getElementById("btn_settings_on").style.display = "block";
    document.getElementById("settings").style.display = "none";
    document.getElementById("btn_settings_off").style.display = "none";
    document.title = "11/A Akıllı Tahta Eklentisi";
});
document.getElementById("btn_fullscreen").addEventListener("click", function() {
    chrome.tabs.create({ url });
});

function go(url) {
    window.open(url, "_blank");
}

document.getElementById("btn_dolar").addEventListener("click", function() {
    go("https://www.google.com/search?q=dolar%2FTL");
});

document.getElementById("btn_euro").addEventListener("click", function() {
    go("https://www.google.com/search?q=euro%2FTL");
});  

document.getElementById("btn_pound").addEventListener("click", function() {
    go("https://www.google.com/search?q=sterlin%2FTL");
});

document.getElementById("btn_covid19").addEventListener("click", function() {
    go("https://covid19.saglik.gov.tr");
});

document.getElementById("btn_timer").addEventListener("click", function() {
    go("http://timer.onlinealarmkur.com/" + "#" + document.getElementById("input_timer").value);
});

document.getElementById("btn_weather").addEventListener("click", function() {
    go("http://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx?il=Tunceli");
});

input_timer.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn_timer").disabled = false;
        document.getElementById("btn_timer").click();
    }
});

input_timer.addEventListener("click", function() {
    document.getElementById("btn_timer").disabled = true;
    document.getElementById("numpad").style.display = "block";
    document.getElementById("input_timer").scrollIntoView();
});

var newinputvalue;
function numpadAdd(num) {
    newinputvalue = parseInt(input_timer.value + num);
    input_timer.value = newinputvalue;
}

document.getElementById("btn_num1").addEventListener("click", function() {
    numpadAdd(1);
    input_timer.focus();
});
document.getElementById("btn_num2").addEventListener("click", function() {
    numpadAdd(2);
    input_timer.focus();
});
document.getElementById("btn_num3").addEventListener("click", function() {
    numpadAdd(3);
    input_timer.focus();
});
document.getElementById("btn_num4").addEventListener("click", function() {
    numpadAdd(4);
    input_timer.focus();
});
document.getElementById("btn_num5").addEventListener("click", function() {
    numpadAdd(5);
    input_timer.focus();
});
document.getElementById("btn_num6").addEventListener("click", function() {
    numpadAdd(6);
    input_timer.focus();
});
document.getElementById("btn_num7").addEventListener("click", function() {
    numpadAdd(7);
    input_timer.focus();
});
document.getElementById("btn_num8").addEventListener("click", function() {
    numpadAdd(8);
    input_timer.focus();
});
document.getElementById("btn_num9").addEventListener("click", function() {
    numpadAdd(9);
    input_timer.focus();
});
document.getElementById("btn_num0").addEventListener("click", function() {
    numpadAdd(0);
    input_timer.focus();
});
document.getElementById("numback").addEventListener("click", function() {
    if(input_timer.value.toString().length > 1) {input_timer.value = parseInt(input_timer.value.toString().slice(0, -1));}
    else{input_timer.value = null;}
    input_timer.focus();
});
document.getElementById("numclose").addEventListener("click", function() {
    input_timer.value = null;
    document.getElementById("numpad").style.display = "none";
    document.getElementById("btn_timer").disabled = false;
});
document.getElementById("numstart").addEventListener("click", function() {
    document.getElementById("btn_timer").disabled = false;
    document.getElementById("btn_timer").click();
    document.getElementById("numclose").click();
});

select_theme_color.addEventListener("change", function() {
    setToStorage();
    loadStorage();
});