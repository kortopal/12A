const input_timer = $id("input_timer");
const input_currency = $id("input_currency");
const input_timer_numpad = $id("input_timer_numpad");
const input_currency_numpad = $id("input_currency_numpad");
var historyContent = "";
var totalHistoryContent;
var lastSettingsUpdate;
var lastHistoryClear;
var numpadType;

document.oncontextmenu = function() {return false;}
window.addEventListener("load",function() {
    setBackground("popup.html");
    if(5<getDateAndTime("Hours") && getDateAndTime("Hours")<10) {
        $id("header_text").innerHTML = "Günaydın";
        $id("header_text").style.fontSize = "25px";
        $id("header_text").style.top = "8px";
    } else if(9<getDateAndTime("Hours") && getDateAndTime("Hours")<12) {
        $id("header_text").innerHTML = "11/A";
        $id("header_text").style.fontSize = "28px";
        $id("header_text").style.top = "6.5px";
    } else if(12<=getDateAndTime("Hours") && getDateAndTime("Hours")<15) {
        $id("header_text").innerHTML = "Tünaydın";
        $id("header_text").style.fontSize = "25px";
        $id("header_text").style.top = "8px";
    } else{
        $id("header_text").innerHTML = "11/A";
        $id("header_text").style.fontSize = "28px";
        $id("header_text").style.top = "6.5px";
    }
},false);

function openNumpad(numpad_type) {
    $id("fill_bg").style.display = "block";
    $id("numpad").style.display = "block";
    $id("numpad").style.animation = "numpadAnim 600ms linear";
    if(numpad_type === "Timer") {
        $id("btn_timer").disabled = true;
        input_timer_numpad.style.display = "block";
        input_currency_numpad.style.display = "none";
        $id("btn_timer_numpad").style.display = "block";
        $id("btn_currency_numpad").style.display = "none";
        numpadType = "Timer";
    } else if(numpad_type === "Currency") {
        input_timer_numpad.style.display = "none";
        input_currency_numpad.style.display = "block";
        $id("btn_timer_numpad").style.display = "none";
        $id("btn_currency_numpad").style.display = "block";
        numpadType = "Currency";
    }
}

function numpadAdd(num) {
    var new_input_timer_value;
    var new_input_currency_value;
    if(numpadType === "Timer") {
        if(input_timer_numpad.value.toString().length < 4) {
            new_input_timer_value = parseInt(input_timer_numpad.value + num);
            input_timer_numpad.value = new_input_timer_value;
        }
        input_timer_numpad.focus();
    } else if(numpadType === "Currency") {
        new_input_currency_value = parseInt(input_currency_numpad.value + num);
        input_currency_numpad.value = new_input_currency_value;
        input_currency_numpad.focus();
    }
}

$id("btn_settings_on").addEventListener("click", function() {
    $id("main").style.display = "none";
    $id("btn_settings_on").style.display = "none";
    $id("settings").style.display = "block";
    $id("btn_settings_off").style.display = "block";
    document.title = "Ayarlar | 11/A Akıllı Tahta Eklentisi";
});
$id("btn_settings_off").addEventListener("click", function() {
    $id("main").style.display = "block";
    $id("btn_settings_on").style.display = "block";
    $id("settings").style.display = "none";
    $id("btn_settings_off").style.display = "none";
    $id("btn_hide_details").click();
    $id("btn_hide_history").click();
    document.title = "11/A Akıllı Tahta Eklentisi";
});
$id("btn_fullscreen").addEventListener("click", function() {
    openTab(chrome.runtime.getURL("/popup.html"));
});

input_currency.addEventListener("click", function() {
    openNumpad("Currency");
});

$id("btn_dollar").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+dolar+ka%C3%A7+TL&ie=UTF-8");
    } else{
        openTab("https://www.google.com/search?q=dolar%2FTL&ie=UTF-8");
    }
});
$id("btn_euro").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+euro+ka%C3%A7+TL&ie=UTF-8");
    } else{
        openTab("https://www.google.com/search?q=euro%2FTL&ie=UTF-8");
    }
});  
$id("btn_pound").addEventListener("click", function() {
    if(input_currency.value.length > 0) {
        openTab("https://www.google.com/search?q=" + input_currency.value + "+sterlin+ka%C3%A7+TL&ie=UTF-8");
    } else{
        openTab("https://www.google.com/search?q=sterlin%2FTL&ie=UTF-8");
    }
});
$id("btn_covid19").addEventListener("click", function() {
    openTab("https://covid19.saglik.gov.tr/");
});
$id("btn_timer").addEventListener("click", function() {
    if(input_timer_numpad.value.toString().length > 0) {
        input_timer_numpad.value = Math.abs(input_timer_numpad.value);
        input_timer_numpad.value = parseInt(input_timer_numpad.value);
    }
    if(input_timer_numpad.value.toString().length > 4) {
        input_timer_numpad.value = parseInt(input_timer_numpad.value.toString().substring(0, 4));
    }
    openTab("chrome-extension://" + chrome.runtime.id + "/timer.html?timer=" + ((input_timer_numpad.value.length > 0) ? input_timer_numpad.value : ""));
});
$id("btn_weather").addEventListener("click", function() {
    openTab("https://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx?il=Tunceli");
});

input_timer_numpad.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        $id("btn_timer").disabled = false;
        $id("btn_timer").click();
        $id("btn_numclose").click();
    }
    if(input_timer_numpad.value.toString().length > 4) {
        input_timer_numpad.value = parseInt(input_timer_numpad.value.toString().substring(0, 4));
    }
});
input_currency_numpad.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        $id("btn_currency_numpad").click();
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

$id("btn_num0").addEventListener("click", function() {
    numpadAdd(0);
});
$id("btn_num1").addEventListener("click", function() {
    numpadAdd(1);
});
$id("btn_num2").addEventListener("click", function() {
    numpadAdd(2);
});
$id("btn_num3").addEventListener("click", function() {
    numpadAdd(3);
});
$id("btn_num4").addEventListener("click", function() {
    numpadAdd(4);
});
$id("btn_num5").addEventListener("click", function() {
    numpadAdd(5);
});
$id("btn_num6").addEventListener("click", function() {
    numpadAdd(6);
});
$id("btn_num7").addEventListener("click", function() {
    numpadAdd(7);
});
$id("btn_num8").addEventListener("click", function() {
    numpadAdd(8);
});
$id("btn_num9").addEventListener("click", function() {
    numpadAdd(9);
});

$id("btn_numback").addEventListener("click", function() {
    if(numpadType === "Timer") {
        if(input_timer_numpad.value.toString().length > 1) {input_timer_numpad.value = parseInt(input_timer_numpad.value.toString().slice(0, -1));}
        else{input_timer_numpad.value = null;}
        input_timer_numpad.focus();
    } else if(numpadType === "Currency") {
        if(input_currency_numpad.value.toString().length > 1) {
            input_currency_numpad.value = parseInt(input_currency_numpad.value.toString().slice(0, -1));
        } else{
            input_currency_numpad.value = null;
        }
        input_currency_numpad.focus();
    }
});
$id("btn_numclose").addEventListener("click", function() {
    input_timer_numpad.value = null;
    input_currency_numpad.value = null;
    $id("fill_bg").style.display = "none";
    $id("numpad").style.animation = "numpadAnim 0s linear";
    $id("numpad").style.display = "none";
    if(numpadType === "Timer") {
        $id("btn_timer").disabled = false;
    }
});
$id("btn_timer_numpad").addEventListener("click", function() {
    $id("btn_timer").disabled = false;
    $id("btn_timer").click();
    $id("btn_numclose").click();
});

$id("btn_currency_numpad").addEventListener("click", function() {
    input_currency.value = input_currency_numpad.value;
    $id("btn_numclose").click();
});

$id("select_theme_color").addEventListener("change", function() {
    lastSettingsUpdate = getDateAndTime("DateAndTime");
    setStorage();
    loadStorage();
});

$id("btn_show_details").addEventListener("click", function() {
    $id("btn_show_details").style.display = "none";
    $id("btn_hide_details").style.display = "block";
    $id("details_content").style.display = "block";
    $id("details_scroll").scrollIntoView();
});
$id("btn_hide_details").addEventListener("click", function() {
    $id("btn_show_details").style.display = "block";
    $id("btn_hide_details").style.display = "none";
    $id("details_content").style.display = "none";
});
$id("btn_show_history").addEventListener("click", function() {
    $id("btn_show_history").style.display = "none";
    $id("btn_hide_history").style.display = "block";
    $id("history_content").style.display = "block";
    $id("history_scroll").scrollIntoView();
    if(historyContent.length > 0) {
        $id("btn_clear_history").style.display = "block";
    }
});
$id("btn_hide_history").addEventListener("click", function() {
    $id("btn_show_history").style.display = "block";
    $id("btn_hide_history").style.display = "none";
    $id("btn_clear_history").style.display = "none";
    $id("history_content").style.display = "none";
});
$id("btn_clear_history").addEventListener("click", function() {
    $id("fill_bg").style.display = "block";
    $id("dialog").style.display = "block";
});
$id("btn_extension_page").addEventListener("click", function() {
    openTab("chrome://extensions/?id=" + chrome.runtime.id);
});
$id("btn_dialog_yes").addEventListener("click", function() {
    $id("history_content").innerHTML = "<i style='font-size: 120px;margin-bottom: 5px;' class='fas fa-trash'></i><br>Geçmiş Boş";
    $id("btn_clear_history").style.display = "none";
    lastHistoryClear = getDateAndTime("DateAndTime");
    historyContent = "";
    totalHistoryContent = 0;
    setStorage();
    loadStorage();
    $id("fill_bg").style.display = "none";
    $id("dialog").style.display = "none";
});
$id("btn_dialog_no").addEventListener("click", function() {
    $id("fill_bg").style.display = "none";
    $id("dialog").style.display = "none";
});