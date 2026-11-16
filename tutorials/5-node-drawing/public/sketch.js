var socket;

function setup() {
    createCanvas(200, 200);
    background(55);

    socket =  socket.io.connect('http://127.0.0.1:3000')
}

function draw() {

    noStroke();
    ellipse(mouseX, mouseY, 20, 20);

}

