function setBackgroundFile(file) {
    if(file === "popup.html") {
        loadStorage();
    } else{
        chrome.storage.sync.get({"theme_color": "#EFA110"}, function(data) {
            document.documentElement.style.setProperty("--theme-color", data.theme_color);
            if(getThemeColor() === "#C80815" || getThemeColor() === "#244BBF" || getThemeColor() === "#6351CF" || getThemeColor() === "#622814" || getThemeColor() === "#192E59" || getThemeColor() === "#13141C" || getThemeColor() === "#59364A" || getThemeColor() === "#8B150B") {
                document.documentElement.style.setProperty("--theme-txt-color", "white");
            } else{
                document.documentElement.style.setProperty("--theme-txt-color", "black");
            }
        });
    }
}

function setStorage() {
    chrome.storage.sync.set({"theme_color": $id("select_theme_color").value}, function() {
    });
    chrome.storage.local.set({"history_content": historyContent}, function() {
    });
    chrome.storage.sync.set({"settings_update": lastSettingsUpdate}, function() {
    });
    chrome.storage.local.set({"last_history_clear": lastHistoryClear}, function() {
    });
    chrome.storage.local.set({"total_history_content": totalHistoryContent}, function() {
    });
}

function loadStorage() {
    chrome.storage.sync.get({"theme_color": "#EFA110"}, function(data) {
        $id("select_theme_color").value = data.theme_color;
        document.documentElement.style.setProperty("--theme-color", data.theme_color);
        if($id("select_theme_color").value === "#C80815" || $id("select_theme_color").value === "#244BBF" || $id("select_theme_color").value === "#6351CF" || $id("select_theme_color").value === "#622814" || $id("select_theme_color").value === "#192E59" || $id("select_theme_color").value === "#13141C" || $id("select_theme_color").value === "#59364A" || $id("select_theme_color").value === "#8B150B") {
            document.documentElement.style.setProperty("--theme-txt-color", "white");
        } else{
            document.documentElement.style.setProperty("--theme-txt-color", "black");
        }
    });
    chrome.storage.local.get({"history_content": ""}, function(data) {
        historyContent = data.history_content;
        if(historyContent.length > 0) {
            $id("history_content").innerHTML = historyContent;
        } else{
            $id("history_content").innerHTML = "<i style='font-size: 120px;margin-bottom: 5px;' class='fas fa-trash'></i><br>Geçmiş Boş";
        }
    });
    chrome.storage.sync.get({"settings_update": "Henüz Değişiklik Yapılmadı"}, function(data) {
        lastSettingsUpdate = data.settings_update;
        $id("settings_update_text").innerHTML = "<span class='small_header_text'>Ayarlar İçin Son Değişiklik Tarihi</span><br>" + lastSettingsUpdate;
    });
    chrome.storage.local.get({"last_history_clear": "Henüz Geçmiş Silinmedi"}, function(data) {
        lastHistoryClear = data.last_history_clear;
        $id("history_clear_text").innerHTML = "<span class='small_header_text'>Geçmiş İçin Son Temizlik Tarihi</span><br>" + lastHistoryClear;
        $id("dialog_history_clear_text").innerHTML = "<span class='small_header_text'>Geçmiş İçin Son Temizlik Tarihi</span><br>" + lastHistoryClear;
    });
    chrome.storage.local.get({"total_history_content": 0}, function(data) {
        totalHistoryContent = data.total_history_content;
        $id("dialog_title").innerHTML = "Emin Misiniz?<br><span style='font-size:16px;font-weight:normal;'>(Toplam " + totalHistoryContent + " öğe silinecek)</span>";
    });
}

function openTab(tabUrl, historyLabel, historyHostName) {
    var isTabActive = false;
    var tabId = 0;
    totalHistoryContent++;
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

    if(tabUrl !== "chrome-extension://" + chrome.runtime.id + "/popup.html" && tabUrl !== "chrome://extensions/?id=" + chrome.runtime.id) {
        setHistory(historyLabel, historyHostName);
    }
}

function setHistory(historyLabel, historyHostName) {
    try {
        historyContent = "<span class='small_header_text'>" + getDateAndTime("DateAndTime") + "<br><span class='history_host_name'>" + historyHostName + "</span></span><br>" + historyLabel + "<div class='border'></div>" + historyContent;
        $id("history_content").innerHTML = historyContent;
        setStorage();
        loadStorage();
    } catch (error) {}
}