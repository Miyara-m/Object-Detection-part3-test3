var status = "";
objects = [];
function preload() {
    img = loadImage("livingRoom.jpg");
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    Coco = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
    image(img, 0, 0, 640, 480);
    if (status != "") {
        Coco.detect(img, gotResults);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            document.getElementById("objects").innerHTML = "Number of Objects:" + objects.length;
            confidence = objects[i].confidence;
            label = objects[i].label;
            x = objects[i].x;
            y = objects[i].y;
            height = objects[i].height;
            width = objects[i].width;
            fill("sienna");
            text(label, x, y);
            noFill();
            stroke("teal");
            rect(x, y, width, height);
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;

}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}