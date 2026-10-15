let canvas;
let lax, lay;
let eax = 0;
let eay = 0;
let easing = .2;
let i1;


async function setup() {

    i1 = await loadImage("images/gonyanistare.PNG");

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    // canvas.style("z-index", 10);


}

function windowResized() {

    resizeCanvas(windowWidth, windowHeight);
}

function draw() {

    clear();

    eax = eax + ((mouseX - eax) * easing);
    eay = eay + ((mouseY - eay) * easing);

    drawAnim(eax, eay); 

}

function drawAnim(dAx, dAy) {

    // cb_sigil(dAx+5, dAy+5);
    image(i1, dAx+5, dAy+5, 30, 30);

}

function cb_sigil(lax, lay) {
  noFill();
  stroke(186, 247, 224);
  arc(lax, lay, 30, 30, 0, 1.5);
  arc(lax+30, lay, 30, 30, 1.5, 3);
  arc(lax+30, lay+30, 30, 30, 3.1, 4.7);
  arc(lax, lay+30, 30, 30, 4.7, 0);
}