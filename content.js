class Utime {
	constructor() {
		this.runtime = document.getElementsByClassName('ytp-time-current')[0];
		this.h1 = document.getElementsByTagName('h1');
		this.grad = document.getElementsByClassName('ytp-gradient-bottom')[0];
		this.video = document.getElementsByClassName('video-stream html5-main-video')[0];
		this.comment = document.getElementsByClassName('style-scope ytd-expander');
		this.title = this.h1[1].innerText;
		// this.h1[1].style['padding'] = '16px';
		// this.h1[1].style['font-weight'] = 'bold';
		// this.h1[1].style['font-size'] = '20px';
		// this.h1[1].style['background-color'] = '#a0a0a0';
		// this.h1[1].style['text-shadow'] = '2px 2px 3px rgba(255,255,255,0.2)';
		this.btn = undefined;
		this.b = {};
		for (let i = 0; i < comment.length; i += 3)
			if (comment[i].querySelectorAll('a')[0] && !b[eval_time(comment[i].querySelectorAll('a')[0].innerText)])
				b[eval_time(comment[i].querySelectorAll('a')[0].innerText)] = comment[i].innerText;
	}

	eval_time(str) {
		return parseInt(str.replace(/:[0-9]+/, "")) * 60 + parseInt(str.replace(/[0-9]+:/, ""));
	}

	off_active() {
		this.h1[1].innerText = this.title;
	}

	on_active() {
		this.video.onplay = function () {
			let run = eval_time(this.runtime.innerText);
			let inter = setInterval(function () {
				++run;
				if (this.btn) {
					if (this.b[run])
						this.h1[1].innerText = this.title + "\n" + this.b[run];
					// grad.innerText = b[run];
				}
			}, 1000);
			video.onpause = function () {
				clearInterval(inter);
			};
		};
	}
}

chrome.runtime.sendMessage({ type: "showPageAction" });

const utime = new Utime();
chrome.storage.local.get("enabled", (data) => {
	utime.btn = data.enbale;
	utime.on_active();
});

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.action === "TOGGLE") {
		chrome.storage.local.get("enabled", (data) => {
			utime.btn = data.enbale;
			if (!utime.btn)
				utime.off_active();
		});
	}
});