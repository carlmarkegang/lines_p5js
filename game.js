var resolution = 512;

var ground = [];
var groundSegments = 20;
var spacing = resolution / (groundSegments);

var spider = [];



function create_ground(x_start, x_end, y_start, y_end) {
    this.x_start = x_start;
    this.x_end = x_end;
    this.y_start = y_start;
    this.y_end = y_end;
    this.width = 5;
}

function create_spider(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
}



function setup() {
    var canvas = createCanvas(resolution, resolution);
    canvas.parent('sketch-holder');

    for (let i = 0; i < groundSegments + 2; i++) {
        ground.push(new create_ground(spacing * i, 1000, randomInt(resolution - 100, resolution - 50), randomInt(resolution - 100, resolution - 50)));
    }

    spider.push(new create_spider(0, 0));


    frameRate(60);
}


function draw() {
    background(30)

    let closest1;
    let closest2;
    let closest3;
    let minDistance1 = 200;
    let minDistance2 = 200;
    let minDistance3 = 200;

    for (let i = 0; i < groundSegments + 2; i++) {
        stroke(color(137, 207, 240), 0, 0);
        strokeWeight(ground[i].width);

        line(ground[i].x_start, ground[i].y_start, ground[i].x_end, ground[i].y_end);

        if (ground[i + 1]) {
            ground[i].x_end = ground[i + 1].x_start;
            ground[i].y_end = ground[i + 1].y_start;
        }

        let distance = Math.sqrt(
            Math.pow(ground[i].x_end - spider[0].x, 2) +
            Math.pow(ground[i].y_end - spider[0].y, 2)
        );


        var closest1WasSet = false;
        var closest2WasSet = false;
        if (distance < minDistance1) {
            minDistance1 = distance;
            closest1 = ground[i];
            closest1WasSet = true;
        }
        if (distance < minDistance2 && closest1WasSet == false) {
            minDistance2 = distance;
            closest2 = ground[i];
            closest2WasSet = true;
        }
        if (distance < minDistance3 && closest1WasSet == false && closest2WasSet == false) {
            minDistance3 = distance;
            closest3 = ground[i];
        }


    }

    spider[0].x = mouseX;
    spider[0].y = mouseY;

    fill(color(137, 207, 240), 0, 0);
    rect(spider[0].x, spider[0].y, spider[0].width, spider[0].width);

    if (closest1 && closest2 && closest3) {
        line(spider[0].x, spider[0].y, closest1.x_end, closest1.y_end);
        line(spider[0].x, spider[0].y, closest2.x_end, closest2.y_end);
        line(spider[0].x, spider[0].y, closest3.x_end, closest3.y_end);
    }


}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

