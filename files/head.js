var scripts = document.getElementsByTagName('script');
var myScript = scripts[scripts.length - 1];

var queryString = myScript.src.replace(/^[^\?]+\??/, '');

var params = parseQuery(queryString);

function parseQuery(query) {
    var Params = {};
    if (!query) return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) continue;
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}

document.write('\
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\
    <meta name=viewport content="width=device-width, initial-scale=1">\
    <link rel="shortcut icon" href="'+params["prefix"]+'images/favicon.ico">\
');

function retime(duration, class_name) {
    console.log('retime')
    var videos = document.getElementsByClassName(class_name);
    console.log('videos', videos)
    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];
        video.onloadeddata = function() {
            console.log('old', this.duration, duration);
            this.playbackRate = this.duration / duration;
            console.log('Retiming', this.playbackRate, this.duration, this.readyState)
        };
    }
}

function monitor(replay_name) {
    var div = document.getElementsByClassName(replay_name)[0]
    div.style.opacity = 1.0;
}

function replay(class_name, replay_name) {
    var videos = document.getElementsByClassName(class_name);
    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];
        video.currentTime = 0;
        video.play();
    }
    var div = document.getElementsByClassName(replay_name)[0]
    div.style.opacity = 0.0;
}
