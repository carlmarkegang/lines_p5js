var resolution = 512;

var ground = [];
var spacing = resolution / (10);





function create_ground(x_start, x_end, y_start, y_end) {
    this.x_start = x_start;
    this.x_end = x_end;
    this.y_start = y_start;
    this.y_end = y_end;
    this.width = 5;
    this.direction = "down";
}



function setup() {
    var canvas = createCanvas(resolution, resolution);
    canvas.parent('sketch-holder');

    for (let i = 0; i < 12; i++) {
        ground.push(new create_ground(spacing * i, 1000, randomInt(0, resolution), randomInt(0, resolution)));
    }


    frameRate(60);
}


function draw() {
    background(30)


    for (let i = 0; i < 12; i++) {
        stroke(color(137, 207, 240), 0, 0);
        strokeWeight(ground[i].width);


        line(ground[i].x_start, ground[i].y_start, ground[i].x_end, ground[i].y_end);


        if (ground[i].direction == "down") {
            ground[i].y_start = ground[i].y_start + 3;
        } else {
            ground[i].y_start = ground[i].y_start - 3;
        }

        if (ground[i].y_start > resolution) {
            ground[i].direction = "up";
        }
        if (ground[i].y_start < 0) {
            ground[i].direction = "down";
        }


        if (ground[i + 1]) {
            ground[i].x_end = ground[i + 1].x_start;
            ground[i].y_end = ground[i + 1].y_start;

        }



    }

}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

