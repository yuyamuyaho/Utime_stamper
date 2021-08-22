class Utime {
	constructor() {
		this.comment = [];
		this.api_key = "";
		this.target = window.location.search.match(/\=([^\=\&\/]+)/)[1];
		this.url = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=" + this.api_key + "&videoId=" + this.target + "&maxResults=100";

		(async () => {
			await fetch(this.url)
				.then((res) => res.json())
				.then((data) => {
					for (let i of data.items) {
						this.comment.push(i.snippet.topLevelComment.snippet.textDisplay);
					}
				});
			this.runtime = document.getElementsByClassName('ytp-time-current')[0];
			this.h1 = document.getElementsByTagName('h1');
			this.title = this.h1[1].innerText;
			this.video = document.getElementsByClassName('video-stream html5-main-video')[0];
			this.btn = undefined;
			this.b = {};
			let tmp;

			for (let i of this.comment)
				if (tmp = i.match(/\<a href[^\<\>]+\>(([0-9]+:)?[0-9]+:[0-9]+)\</))
					this.b[this.eval_time(tmp[1])] = i;

			console.log(this.b);
			let self = this
			chrome.storage.local.get("enabled", (data) => {
				this.btn = data.enabled;
				this.on_active(self);
			});
		})();
	}

	eval_time(str) {
		if (str.length > 5)
			return parseInt(str.replace(/:.+/, "")) * 3600 + parseInt(str.match(/:([0-9]+):/)[1]) * 60 + parseInt(str.match(/[0-9]+$/)[0]);
		else
			return parseInt(str.replace(/:[0-9]+/, "")) * 60 + parseInt(str.replace(/[0-9]+:/, ""));
	}

	off_active() {
		this.h1[1].innerText = this.title;
	}

	on_active(self) {

		(() => {
			let run = 0;
			let inter = setInterval(function () {
				run = Math.floor(self.video.currentTime);
				console.log(run);
				if (self.btn && self.b[run]) {
					self.h1[1].innerText = self.b[run];
					console.log(self.h1[1].innerText);
				}
			}, 1000);

			this.video.onpause = function () {
				clearInterval(inter);
			};

			window.onunload = function () {
				clearInterval(inter);
				self = null;
			};

			window.onpopstate = () => {
				clearInterval(inter);
			};							// <-- 새로 클래스 만들어서 적용될 수 있도록 구현
		})();

		this.video.onplay = () => {
			let run = 0;
			let inter = setInterval(function () {
				run = Math.floor(self.video.currentTime);
				console.log(run);
				if (self.btn && self.b[run]) {
					self.h1[1].innerText = self.b[run];
					console.log(self.h1[1].innerText);
				}
			}, 1000);
			this.video.onpause = function () {
				clearInterval(inter);
			};
			window.onunload = function () {
				clearInterval(inter);
				self = null;
			};

			window.onpopstate = () => {
				clearInterval(inter);
			};
		};
	}
}						//페이지 이동시 온액티브 멈추게

chrome.runtime.sendMessage({ type: "showPageAction" });
let utime;

window.onload = () => {
	utime = new Utime();
}

function hashHandler() {
	this.oldHash = window.location.hash;
	this.Check;
	var that = this;
	var detect = function () {
		if (that.oldHash != window.location.hash) {
			alert("HASH CHANGED - new has" + window.location.hash);
			that.oldHash = window.location.hash;
		}
	};
	this.Check = setInterval(function () { detect() }, 100);
}

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.action === "TOGGLE") {
		chrome.storage.local.get("enabled", (data) => {
			utime.btn = data.enbale;
			if (!utime.btn)
				utime.off_active();
		});
	}
});

alert("123");