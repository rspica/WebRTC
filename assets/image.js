(function() {

function camera() {
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var photo = document.getElementById("photo");
	var vendorUrl = window.URL || window.webkitURL;


	navigator.getMedia =  (	navigator.getUserMedia ||
								navigator.webkitGetUserMedia ||
								navigator.mozGetUserMedia ||
								navigator.msGetUserMedia);

	navigator.getMedia({
		video: true,
		audio: false
	}, function(stream) {
		video.src = vendorUrl.createObjectURL(stream);
		video.play();

	}, function(error) {
		// An error occured
		// error.code
	});

	document.getElementById('capture').addEventListner('click', function(e) {
		context.drawImage(video, 0, 0, 400, 300);
		photo.setAttribute('src', canvas.toDataURL('image/png'))

	});
}
})();