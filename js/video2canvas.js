(function() {
	function gray(ctx) {
		var imagedata = ctx.getImageData(0, 0, 512, 512);
		var idata = imagedata.data;
		var num = idata.length;
		var pix = num / 4;
		for (var i = 0; i < pix; i++) {
			var r = idata[i * 4];
			var g = idata[i * 4 + 1];
			var b = idata[i * 4 + 2];
			var g = parseInt((r * 30 + g * 59 + b * 11) / 100);
			idata[i * 4 + 3] = (g > 50) ? 255 : 0;
		}
		ctx.putImageData(imagedata, 0, 0);
	}

	window.GetCanvas = function(canvasid, video) {
		var c = document.createElement('canvas');
		c.setAttribute('id', canvasid);
		c.setAttribute('width', '512');
		c.setAttribute('height', '512');
		c.style.display = 'none';
		c.style.position = 'absolute';
		(document.getElementsByTagName('body')[0]).appendChild(c);

		var ctx = c.getContext('2d');
		setInterval(function() {
			ctx.drawImage(video, 0, 0, 512, 512);
			gray(ctx);
			ctx.fillStyle = 'lightgreen';
			ctx.font = '64pt sans-serif';
			ctx.fillText(video.currentTime.toFixed(2), 10, 75);
		}, 1000 / 30);

		return c;
	}

})();
