if(location.hostname.includes("youtube.com")){
    document.addEventListener('yt-navigate-finish', process);
    document.addEventListener('DOMContentLoaded', process);

    function process() {
        if (!location.pathname.startsWith('/watch')) {
        return;
        }

        if(document.getElementById("yt-btn-music-12atv") == null) {
            var yt_btn_music = document.createElement("button");
            yt_btn_music.innerHTML = "<i style='float: left;' class='fas fa-music'></i> Keşif Kuyruğu <i style='float: right;' class='fas fa-random'></i>";
            yt_btn_music.id = "yt-btn-music-12atv";
        } else {yt_btn_music = document.getElementById("yt-btn-music-12atv");}
        
        if(document.getElementById("yt-link-icon-12atv") == null) {
            var yt_link_icon = document.createElement("link");
            yt_link_icon.rel = "stylesheet";
            yt_link_icon.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
            yt_link_icon.id = "yt-link-icon-12atv";
            document.head.append(yt_link_icon);
        }

        document.getElementById("below").insertBefore(yt_btn_music, document.getElementById("below").firstChild);

        document.getElementById("yt-btn-music-12atv").onclick = function() {
            document.querySelectorAll('.html5-main-video').forEach(vid => vid.pause());
            chrome.runtime.sendMessage({request: "call-func_openMusic"});
        };
    }
}
