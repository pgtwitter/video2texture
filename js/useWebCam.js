(function() {
	window.useWebCam = function(video) {
		var hasGetUserMedia = function() {
			return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia || navigator.msGetUserMedia);
		}
		var onFailSoHard = function(e) {
			alert('Could not use the camera.');
		};

		if (!hasGetUserMedia()) {
			alert('This browser  is not support user media.');
		}
		window.URL = window.URL ||
			window.webkitURL;
		navigator.getUserMedia = navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
		navigator.getUserMedia({
			video: true
		}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
		}, onFailSoHard);
	}
})();
