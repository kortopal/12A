var music;
var json_musics = [];
var lastMusics = [];

function setBackgroundFile(file) {
    if(file === "popup.html") {
        loadStorage();
    } else{
        chrome.storage.sync.get({"theme_color": "#FF8E00"}, function(data) {
            document.documentElement.style.setProperty("--theme-color", data.theme_color);
            if((hexToRgba(getThemeColor(),"r")*0.299 + hexToRgba(getThemeColor(),"g")*0.587 + hexToRgba(getThemeColor(),"b")*0.114) > 80) {
                document.documentElement.style.setProperty("--theme-txt-color", "#000000");
            } else{
                document.documentElement.style.setProperty("--theme-txt-color", "#ffffff");
            }

            if((hexToRgba(getThemeColor(),"r")*0.299 + hexToRgba(getThemeColor(),"g")*0.587 + hexToRgba(getThemeColor(),"b")*0.114) > 200) {
                document.documentElement.style.setProperty("--theme-adaptive-color", "black");
            } else{
                document.documentElement.style.setProperty("--theme-adaptive-color", "white");
            }
        });
    }
}

function fetchData(request) {
    fetch('https://kortopal.github.io/data/12a/data.json', {method: 'GET'})
    .then(function(response) { return response.json(); })
    .then(function(json) {
        json_musics = json.musics;
        try {
            if(json.last_version !== chrome.runtime.getManifest().version) {
                $id("new-update").style.display = "block";
            }
        } catch (error) {}
    })
    .finally(function() {
        if(request === "openMusic") {openMusic();}
    });
}

function setStorage() {
    chrome.storage.sync.set({"theme_color": $id("input_theme_color").value}, function() {
    });
    chrome.storage.local.set({"history_content": historyContent}, function() {
    });
    chrome.storage.sync.set({"settings_update": lastSettingsUpdate}, function() {
    });
    chrome.storage.local.set({"last_history_clear": lastHistoryClear}, function() {
    });
    chrome.storage.local.set({"total_history_content": totalHistoryContent}, function() {
    });
    chrome.storage.local.set({"last_musics": lastMusics}, function() {
    });
}

function loadStorage() {
    //sync
    chrome.storage.sync.get({"theme_color": "#FF8E00"}, function(data) {
        $id("input_theme_color").value = data.theme_color;
        document.documentElement.style.setProperty("--theme-color", data.theme_color);
        if((hexToRgba(getThemeColor(),"r")*0.299 + hexToRgba(getThemeColor(),"g")*0.587 + hexToRgba(getThemeColor(),"b")*0.114) > 80) {
            document.documentElement.style.setProperty("--theme-txt-color", "#000000");
        } else{
            document.documentElement.style.setProperty("--theme-txt-color", "#ffffff");
        }

        if((hexToRgba(getThemeColor(),"r")*0.299 + hexToRgba(getThemeColor(),"g")*0.587 + hexToRgba(getThemeColor(),"b")*0.114) > 200) {
            document.documentElement.style.setProperty("--theme-adaptive-color", "black");
        } else{document.documentElement.style.setProperty("--theme-adaptive-color", "white");}
    });
    chrome.storage.sync.get({"settings_update": "Henüz Değişiklik Yapılmadı"}, function(data) {
        lastSettingsUpdate = data.settings_update;
        $id("settings_update_text").innerHTML = "<span class='small_header_text'>Ayarlar İçin Son Değişiklik Tarihi</span><br>" + lastSettingsUpdate;
    });
    //local
    chrome.storage.local.get({"history_content": ""}, function(data) {
        historyContent = data.history_content;
        if(historyContent.length > 0) {
            $id("history_content").innerHTML = historyContent;
        } else{
            $id("history_content").innerHTML = "<i style='font-size: 120px;margin-bottom: 5px;' class='fas fa-trash'></i><br>Geçmiş Boş";
        }
    });
    chrome.storage.local.get({"last_history_clear": "Henüz Geçmiş Silinmedi"}, function(data) {
        lastHistoryClear = data.last_history_clear;
        $id("history_clear_text").innerHTML = "<span class='small_header_text'>Geçmiş İçin Son Temizlik Tarihi</span><br>" + lastHistoryClear;
        $id("dialog_history_clear_text").innerHTML = "<span class='small_header_text'>Geçmiş İçin Son Temizlik Tarihi</span><br>" + lastHistoryClear;
    });
    chrome.storage.local.get({"total_history_content": 0}, function(data) {
        totalHistoryContent = data.total_history_content;
        $id("dialog_title").innerHTML = "Emin Misiniz?<br><span style='font-size:16px;font-weight:normal;'>(Toplam " + totalHistoryContent + " öğe silinecek)</span>";
        if(totalHistoryContent > 0) {
            $id("btn_hide_history_text").innerHTML = "Geçmiş (Toplam " + totalHistoryContent + " öğe)";
        } else{
            $id("btn_hide_history_text").innerHTML = "Geçmiş";
        }
    });
    chrome.storage.local.get({"last_musics": []}, function(data) {
        lastMusics = data.last_musics;
    });
}

function openTab(tabUrl, historyLabel, historyHostName) {
    var isTabActive = false;
    var tabId = 0;
    try {
        totalHistoryContent++;
    } catch (error) {
        
    }
    chrome.tabs.query({}, function(tabs) { 
        for(var i=0;i<tabs.length;i++) {
            if(tabs[i].url.toLowerCase().includes(tabUrl.toLowerCase()) == true) {
                isTabActive = true;
                tabId = tabs[i].id;
                break;
            }
        }

        if(isTabActive == false) {
            chrome.tabs.create({ url:tabUrl });
        } else{
            chrome.tabs.update(tabId, {selected: true});
            chrome.tabs.reload(tabId);
        }
    });

    try {
        if(tabUrl.includes("chrome-extension://" + chrome.runtime.id + "/popup.html") == false && tabUrl.includes("chrome://extensions/?id=" + chrome.runtime.id) == false) {
            setHistory(historyLabel, historyHostName);
        }
    } catch (error) {}
}

function setHistory(historyLabel, historyHostName) {
    try {
        historyContent = "<span class='small_header_text'>" + getDateAndTime("DateAndTime") + "<br><span class='history_host_name'>" + historyHostName + "</span></span><br>" + historyLabel + "<div class='border'></div>" + historyContent;
        $id("history_content").innerHTML = historyContent;
        setStorage();
        loadStorage();
    } catch (error) {}
}

function openMusic() {
    do {
        music = json_musics[Math.floor(Math.random()*json_musics.length)];
    } while (lastMusics.includes(music) == true);
    openTab("https://www.youtube.com/" + music, "Şarkı Köşesi", "www.youtube.com");
    if(lastMusics.length >= 62) {
        lastMusics.shift();
    }
    if(lastMusics.includes(music) == false) {
        lastMusics.push(music);
    }
    chrome.storage.local.set({"last_musics": lastMusics}, function() {
    });
    chrome.storage.local.get({"last_musics": []}, function(data) {
        lastMusics = data.last_musics;
    });
}

chrome.runtime.onMessage.addListener(
    function(response, sender, sendResponse) {
        if (response.request === "call-func_openMusic")
            fetchData("openMusic");
            sendResponse();
        }
);
