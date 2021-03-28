runtime = document.getElementsByClassName('ytp-time-current')[0];

h1 = document.getElementsByTagName('h1');
video = document.getElementsByClassName('video-stream html5-main-video')[0];
comment = document.getElementsByClassName('style-scope ytd-expander');
b = {};
function eval_time(str) {
  return parseInt(str.replace(/:[0-9]+/,""))* 60 + parseInt(str.replace(/[0-9]+:/,""));
}

for(let i = 0; i < comment.length ; i+=3)
	if(comment[i].querySelectorAll('a')[0] && !b[eval_time(comment[i].querySelectorAll('a')[0].innerText)])
		b[eval_time(comment[i].querySelectorAll('a')[0].innerText)] = comment[i].innerText;

video.onplay = function(){
		run = eval_time(runtime.innerText);
    var inter = setInterval(function(){
           ++run;
		   if(b[run])
					h1[0].innerHTML = "<br>"+b[run];
}, 1000); //1초마다 setInterval출력
    video.onpause = function(){
        clearInterval(inter);
    };
}; 