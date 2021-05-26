const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const button = document.querySelector('.button-render');
const button2 = document.querySelector('.button-stop');
// let grid;

let w = document.querySelector('#w');
let h = document.querySelector('#h');
let grid;
canvas.width = 0;
canvas.height = 0;
button.addEventListener('click', go);


function go() {
    let resolution = 10;
    // let spalte = +w.value;
    // let reihe = +h.value;
    // console.log(reihe, spalte);
    canvas.width = +w.value;
    canvas.height = +h.value;
    spalte = canvas.width / resolution;
    reihe = canvas.height / resolution;

    // requestAnimationFrame(anim);

    function initial2DArray(spalte, reihe) {
        let arr = new Array(spalte);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(reihe);
        }
        return arr;
    }

    function initialize() {
        grid = initial2DArray(spalte, reihe);
        for (let i = 0; i < spalte; i++) {
            for (let j = 0; j < reihe; j++) {
                grid[i][j] = Math.floor(Math.random() * 2);
            }
        }
        // console.table(grid);
    }
    initialize();

    var myReq;

    function anim() {
        try {
            myReq = requestAnimationFrame(anim);
            render();
        } catch (err) {}

    }
    anim();

    let flag = true

    function stop() {

        if (!flag) {
            myReq = requestAnimationFrame(anim);
            flag = true
            console.log(true)
        } else {
            window.cancelAnimationFrame(myReq);
            flag = false
            console.log(false)
        }
        // if (!flag) {
        //     console.log("request")
        //         // flag = true
        //     myReq = requestAnimationFrame(anim);
        // }

    }

    button2.addEventListener('click', stop);


    function render() {
        for (let i = 0; i < spalte; i++) {
            for (let j = 0; j < reihe; j++) {
                let x = i * resolution;
                let y = j * resolution;
                // console.log(grid[i][j]);
                if (grid[i][j] == 1) {
                    ctx.beginPath();
                    ctx.rect(x, y, resolution, resolution);
                    ctx.fillStyle = 'black';
                    ctx.fill();
                    ctx.strokeStyle = 'white';
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.rect(x, y, resolution, resolution);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.strokeStyle = 'white';
                    ctx.stroke();
                }
            }
        }
        let next = initial2DArray(spalte, reihe);
        // console.log(next)
        for (let i = 0; i < spalte; i++) {
            for (let j = 0; j < reihe; j++) {
                let now = grid[i][j];



                let sum = 0;
                let nachbar = nachbarCount(grid, i, j);
                // console.log(nachbar);

                if (now == 0 && nachbar == 3) {
                    next[i][j] = 1;
                } else if (now == 1 && (nachbar < 2 || nachbar > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = now;
                }

            }
        }
        grid = next;
        // console.table(next)

    }
    render();

    function nachbarCount(grid, x, y) {
        let sum = 0
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                // if (i === x && j === y) {
                //   continue;
                // }
                let a = (x + i + spalte) % spalte;
                let b = (y + j + reihe) % reihe;
                // console.log(col)
                sum += grid[a][b];
            }
        }
        sum -= grid[x][y];
        return sum;

    }

}