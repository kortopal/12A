var music;
var lastMusic;

window.addEventListener("load",function() {
    fetch('https://kortopal.github.io/data/11a/data.json', { 
    method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
        try {
            var musicInterval;
            if(json.last_version !== chrome.runtime.getManifest().version) {
                $id("new-update").style.display = "block";
            }
            musicInterval = setInterval(function() {
                music = json.musics[Math.floor(Math.random()*json.musics.length)];
                if(music !== lastMusic){
                    clearInterval(musicInterval);
                }
            }, 100);
        } catch (error) {}
    });
},false);
