// program for capturing images.
function startup() {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  photo = document.getElementById("photo");
  startbutton = document.getElementById("startbutton");
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  then(function (stream) {
    video.srcObject = stream;
    video.play();
  }).catch(function (err) {
    console.log("An Error Occured:", err);
  });
  video.addEventListener(
    "canplay",
    function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        if (isNan(height)) {
          height = width / (4 / 3);
        }
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },
    false
  );
  startbutton.addEventListener(
    "click",
    function (ev) {
      takePicture();
      ev.preventDefault();
    },
    false
  );
  clearphoto();
}
// clearing image.
function clearphoto() {
  var context = canvas.getcontext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}
// taking picture.
function takePicture() {
  var context = canvas.getcontext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  } else {
    clearphoto();
  }
}
