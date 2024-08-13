var resolution = 512;

var ground = [];
var spacing = resolution / (20);

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

    for (let i = 0; i < 22; i++) {
        ground.push(new create_ground(spacing * i, 1000, randomInt(resolution - 300, resolution), randomInt(resolution - 300, resolution)));
    }

    spider.push(new create_spider(0, 0));


    frameRate(60);
}


function draw() {
    background(30)

    let closest;
    let minDistance = 1000;

    for (let i = 0; i < 22; i++) {
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

        if (distance < minDistance) {
            minDistance = distance;
            closest = ground[i];
        }

    }

    spider[0].x = mouseX;
    spider[0].y = mouseY;

    fill(color(137, 207, 240), 0, 0);
    rect(spider[0].x, spider[0].y, spider[0].width, spider[0].width);

    line(spider[0].x, spider[0].y, closest.x_end, closest.y_end);

}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

