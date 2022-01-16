function setToStorage() {
    chrome.storage.sync.set({"theme_color": select_theme_color.value}, function() {
    });
}

function loadStorage() {
    chrome.storage.sync.get(['theme_color'], function(data) {
        select_theme_color.value = data.theme_color;
        document.documentElement.style.setProperty('--theme-color', select_theme_color.value);
        if(select_theme_color.value == "#C80815" || select_theme_color.value == "#244BBF" || select_theme_color.value == "#6351CF" || select_theme_color.value == "#622814" || select_theme_color.value == "#8C342B" || select_theme_color.value == "#192E59" || select_theme_color.value == "#13141C" || select_theme_color.value == "#59364A") {document.documentElement.style.setProperty('--theme-txt-color', "white");}
        else{document.documentElement.style.setProperty('--theme-txt-color', "black");}
    });
}

window.onload = function() {
    loadStorage();
    popupOnload();// popup.js fonksiyonu
}