function setToStorage() {
    chrome.storage.sync.set({"theme_color": select_theme_color.value}, function() {
    });
    chrome.storage.sync.set({"settings_update": lastSettingsUpdate}, function() {
    });
}

function loadStorage() {
    chrome.storage.sync.get({"theme_color": "#EFA110"}, function(data) {
        select_theme_color.value = data.theme_color;
        document.documentElement.style.setProperty("--theme-color", select_theme_color.value);
        if(select_theme_color.value == "#C80815" || select_theme_color.value == "#244BBF" || select_theme_color.value == "#6351CF" || select_theme_color.value == "#622814" || select_theme_color.value == "#8C342B" || select_theme_color.value == "#192E59" || select_theme_color.value == "#13141C" || select_theme_color.value == "#59364A") {document.documentElement.style.setProperty('--theme-txt-color', "white");}
        else{document.documentElement.style.setProperty("--theme-txt-color", "black");}
    });
    chrome.storage.sync.get({"settings_update": "Değişiklik Yapılmadı"}, function(data) {
        lastSettingsUpdate = data.settings_update;
        settings_update_text.innerHTML = "Ayarlar Son Değişiklik Tarihi<br>" + lastSettingsUpdate;
    });
}

window.onload = function() {
    loadStorage();
    popupOnload();// popup.js fonksiyonu
}

function openTab(tab_url) {
    var tabStatus = false;
    var tabId = 0;
    chrome.tabs.query({}, function(tabs) { 
        for(var i=0;i<tabs.length;i++) {
            if(tab_url === tabs[i].url) {
                tabStatus = true;
                tabId = tabs[i].id;
                break;
            }
        }

        if(tabStatus == false) {
            chrome.tabs.create({ url:tab_url });
        } else{
            chrome.tabs.update(tabId, {selected: true});
            chrome.tabs.reload(tabId);
        }
    });
}