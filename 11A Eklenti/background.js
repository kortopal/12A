const select_theme_color = document.getElementById("select_theme_color");

function setToStorage() {
    chrome.storage.sync.set({"theme_color": select_theme_color.value}, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
          }
    });
}

function loadStorage() {
    chrome.storage.sync.get(['theme_color'], function(data) {
        select_theme_color.value = data.theme_color;
        document.documentElement.style.setProperty('--theme-color', select_theme_color.value);
        if(select_theme_color.value == "#C80815" || select_theme_color.value == "#244BBF") {document.documentElement.style.setProperty('--theme-txt-color', "white");}
        else{document.documentElement.style.setProperty('--theme-txt-color', "black");}
    });
}

window.onload = function() {
    loadStorage();
    popupOnload();// popup.js fonksiyonu
}

select_theme_color.addEventListener("change", function() {
    setToStorage();
    loadStorage();
});