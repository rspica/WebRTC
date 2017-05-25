(function() {
    var width = 320; // We will scale the photo width to this
    var height = 0;

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var capture = null;
    console.log('happy days1');




    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        capture = document.getElementById('capture');
        console.log('here2');
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })

        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        });

        .catch(function(err) {
            console.log("An error occured! " + err);
        });




        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        capture.addEventListener('click', function(ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }
    window.addEventListener('load', startup, false);
})();
