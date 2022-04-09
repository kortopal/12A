window.addEventListener("load",function() {
    fetch('https://kortopal.github.io/data/11a/data.json', { 
    method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
    try {
        if(json.last_version !== chrome.runtime.getManifest().version) {
            $id("new-update").style.display = "block";
        }
    } catch (error) {}
    });
},false);