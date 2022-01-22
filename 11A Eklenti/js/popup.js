const popup_url = chrome.runtime.getURL("../popup.html");
const select_theme_color = document.getElementById("select_theme_color");
const input_timer = document.getElementById("input_timer");
const input_currency = document.getElementById("input_currency");
const input_timer_numpad = document.getElementById("input_timer_numpad");
const input_currency_numpad = document.getElementById("input_currency_numpad");
const header_text = document.getElementById("header_text");
const settings_update_text = document.getElementById("settings_update_text");
const months_tr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
var date = new Date();
var lastSettingsUpdate;
var numpadType;

window.addEventListener("contextmenu", e => e.preventDefault());
function popupOnload() {
    if(5<date.getHours() && date.getHours()<10) {
        header_text.innerHTML = "Günaydın";
        header_text.style.fontSize = "23px";
        header_text.style.top = "9px";
    } else if(9<date.getHours() && date.getHours()<12) {
        header_text.innerHTML = "11/A";
        header_text.style.fontSize = "28px";
        header_text.style.top = "6.5px";
    } else if(12<=date.getHours() && date.getHours()<15) {
        header_text.innerHTML = "Tünaydın";
        header_text.style.fontSize = "23px";
        header_text.style.top = "9px";
    } else {
        header_text.innerHTML = "11/A";
        header_text.style.fontSize = "28px";
        header_text.style.top = "6.5px";
    }
    document.getElementById("version_text").innerHTML = "Eklenti Sürümü<br>" + chrome.runtime.getManifest().version;
}

function openNumpad(numpad_type) {
    document.getElementById("numpad").style.display = "block";
    document.getElementById("fill_bg").style.display = "block";
    document.getElementById("numpad").style.animation = "numpadAnim 600ms linear";
    if(numpad_type == "Timer") {
        document.getElementById("btn_timer").disabled = true;
        input_timer_numpad.style.display = "block";
        input_currency_numpad.style.display = "none";
        document.getElementById("btn_timer_numpad").style.display = "block";
        document.getElementById("btn_currency_numpad").style.display = "none";
        numpadType = "Timer";
    } else if(numpad_type == "Currency") {
        input_timer_numpad.style.display = "none";
        input_currency_numpad.style.display = "block";
        document.getElementById("btn_timer_numpad").style.display = "none";
        document.getElementById("btn_currency_numpad").style.display = "block";
        numpadType = "Currency";
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
    document.getElementById("btn_hide_details").click();
    document.title = "11/A Akıllı Tahta Eklentisi";
});
document.getElementById("btn_fullscreen").addEventListener("click", function() {
    openTab(popup_url);
});

input_currency.addEventListener("click", function() {
    openNumpad("Currency");
});

document.getElementById("btn_dolar").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+dolar+kaç+TL&ie=UTF-8");
    } else{
        openTab("https://www.google.com/search?q=dolar%2FTL&ie=UTF-8");
    }
});

document.getElementById("btn_euro").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+euro+kaç+TL&ie=UTF-8");
    } else{
        openTab("https://www.google.com/search?q=euro%2FTL&ie=UTF-8");
    }
});  

document.getElementById("btn_pound").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+sterlin+kaç+TL&ie=UTF-8");
    } else{
        openTab("https://www.google.com/search?q=sterlin%2FTL&ie=UTF-8");
    }
});

document.getElementById("btn_covid19").addEventListener("click", function() {
    openTab("https://covid19.saglik.gov.tr/");
});

document.getElementById("btn_timer").addEventListener("click", function() {
    openTab("https://timer.onlinealarmkur.com/" + "#" + ((input_timer_numpad.value.length > 0) ? input_timer_numpad.value : ""));
});

document.getElementById("btn_weather").addEventListener("click", function() {
    openTab("https://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx?il=Tunceli");
});

input_timer_numpad.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn_timer").disabled = false;
        document.getElementById("btn_timer").click();
    }
});

input_currency_numpad.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn_currency_numpad").click();
    }
});

input_timer.addEventListener("click", function() {
    openNumpad("Timer");
    input_timer_numpad.focus();
});
input_currency.addEventListener("click", function() {
    openNumpad("Currency");
    input_currency_numpad.focus();
});

var new_input_timer_value;
var new_input_currency_value;
function numpadAdd(num) {
    if(numpadType == "Timer") {
        new_input_timer_value = parseInt(input_timer_numpad.value + num);
        input_timer_numpad.value = new_input_timer_value;
        input_timer_numpad.focus();
    } else if(numpadType == "Currency") {
        new_input_currency_value = parseInt(input_currency_numpad.value + num);
        input_currency_numpad.value = new_input_currency_value;
        input_currency_numpad.focus();
    }
}

document.getElementById("btn_num1").addEventListener("click", function() {
    numpadAdd(1);
});
document.getElementById("btn_num2").addEventListener("click", function() {
    numpadAdd(2);
});
document.getElementById("btn_num3").addEventListener("click", function() {
    numpadAdd(3);
});
document.getElementById("btn_num4").addEventListener("click", function() {
    numpadAdd(4);
});
document.getElementById("btn_num5").addEventListener("click", function() {
    numpadAdd(5);
});
document.getElementById("btn_num6").addEventListener("click", function() {
    numpadAdd(6);
});
document.getElementById("btn_num7").addEventListener("click", function() {
    numpadAdd(7);
});
document.getElementById("btn_num8").addEventListener("click", function() {
    numpadAdd(8);
});
document.getElementById("btn_num9").addEventListener("click", function() {
    numpadAdd(9);
});
document.getElementById("btn_num0").addEventListener("click", function() {
    numpadAdd(0);
});

document.getElementById("btn_numback").addEventListener("click", function() {
    if(numpadType == "Timer") {
        if(input_timer_numpad.value.toString().length > 1) {input_timer_numpad.value = parseInt(input_timer_numpad.value.toString().slice(0, -1));}
        else{input_timer_numpad.value = null;}
        input_timer_numpad.focus();
    } else if(numpadType == "Currency") {
        if(input_currency_numpad.value.toString().length > 1) {input_currency_numpad.value = parseInt(input_currency_numpad.value.toString().slice(0, -1));}
        else{input_currency_numpad.value = null;}
        input_currency_numpad.focus();
    }
});
document.getElementById("btn_numclose").addEventListener("click", function() {
    input_timer_numpad.value = null;
    input_currency_numpad.value = null;
    document.getElementById("numpad").style.animation = "numpadAnim 0s linear";
    document.getElementById("numpad").style.display = "none";
    document.getElementById("fill_bg").style.display = "none";
    if(numpadType == "Timer") {document.getElementById("btn_timer").disabled = false;}
});
document.getElementById("btn_timer_numpad").addEventListener("click", function() {
    document.getElementById("btn_timer").disabled = false;
    document.getElementById("btn_timer").click();
    document.getElementById("btn_numclose").click();
});

document.getElementById("btn_currency_numpad").addEventListener("click", function() {
    input_currency.value = input_currency_numpad.value;
    document.getElementById("btn_numclose").click();
});

select_theme_color.addEventListener("change", function() {
    lastSettingsUpdate = ((date.getDate()<10?'0':'') + date.getDate()) + " " + months_tr[date.getMonth()] + " " + date.getFullYear() + " - " + ((date.getHours()<10?'0':'') + date.getHours()) + "." + ((date.getMinutes()<10?'0':'') + date.getMinutes());
    setToStorage();
    loadStorage();
});

document.getElementById("btn_show_details").addEventListener("click", function() {
    document.getElementById("btn_show_details").style.display = "none";
    document.getElementById("btn_hide_details").style.display = "block";
    document.getElementById("details_content").style.display = "block";
});
document.getElementById("btn_hide_details").addEventListener("click", function() {
    document.getElementById("btn_show_details").style.display = "block";
    document.getElementById("btn_hide_details").style.display = "none";
    document.getElementById("details_content").style.display = "none";
});
document.getElementById("btn_extension_page").addEventListener("click", function() {
    openTab("chrome://extensions/?id=" + chrome.runtime.id);
});
