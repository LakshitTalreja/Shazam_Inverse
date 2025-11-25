// Optimized P5.js grid background for Artist Gallery
const cell_size = 40;
const color_r = 79;
const color_g = 38;
const color_b = 233;
const starting_alpha = 255;
const bg_color = 31;
const prob_neigh = 0.25; // Reduced from 0.3
const amt_fade = 20; // Faster fade
const stroke_wt = 1;
const max_neighbors = 40; // Reduced from 60

let cwa;
let nr, nc;
let cr = -1, cc = -1;
let aln = new Map();

function setup() {
    frameRate(30);
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style("position", "fixed");
    cnv.style("top", "0");
    cnv.style("left", "0");
    cnv.style("z-index", "-1");
    cnv.style("pointer-events", "none");

    cwa = color(color_r, color_g, color_b, starting_alpha);
    noFill();
    strokeWeight(stroke_wt);

    nr = Math.ceil(windowHeight / cell_size);
    nc = Math.ceil(windowWidth / cell_size);

    // Optimize rendering
    pixelDensity(1);
}

function draw() {
    background(bg_color);

    let row = floor(mouseY / cell_size);
    let col = floor(mouseX / cell_size);

    // Bounds check
    if (row < 0 || row >= nr || col < 0 || col >= nc) {
        return;
    }

    // Add neighbors when entering new cell
    if (row !== cr || col !== cc) {
        cr = row;
        cc = col;

        if (aln.size < max_neighbors) {
            addRandomNeighbours(row, col);
        }
    }

    // Draw current cell
    stroke(cwa);
    rect(col * cell_size, row * cell_size, cell_size, cell_size);

    // Batch draw neighbors
    if (aln.size > 0) {
        let toDelete = [];

        for (let [key, n] of aln) {
            n.opacity -= amt_fade;

            if (n.opacity <= 0) {
                toDelete.push(key);
            } else {
                stroke(color_r, color_g, color_b, n.opacity);
                rect(n.col * cell_size, n.row * cell_size, cell_size, cell_size);
            }
        }

        // Clean up faded neighbors
        for (let key of toDelete) {
            aln.delete(key);
        }
    }
}

function addRandomNeighbours(row, col) {
    for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
            if (dRow === 0 && dCol === 0) continue;

            let nRow = row + dRow;
            let nCol = col + dCol;

            if (nRow >= 0 && nRow < nr && nCol >= 0 && nCol < nc) {
                if (Math.random() < prob_neigh) {
                    let key = `${nRow},${nCol}`;

                    if (aln.has(key)) {
                        aln.get(key).opacity = starting_alpha;
                    } else if (aln.size < max_neighbors) {
                        aln.set(key, {
                            row: nRow,
                            col: nCol,
                            opacity: starting_alpha
                        });
                    }
                }
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    nr = Math.ceil(windowHeight / cell_size);
    nc = Math.ceil(windowWidth / cell_size);
    aln.clear();
    cr = -1;
    cc = -1;
}

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        aln.clear();
        cr = -1;
        cc = -1;
    }
});
