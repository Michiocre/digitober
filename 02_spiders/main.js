let heading = document.getElementById('spider');
let body = document.getElementsByTagName('body')[0];

let freeSpiders = new Map();
let cursorQueue = [];
let counter = 0;

heading.onclick = (event) => {
    heading.classList.add('animate');

    let spooder = document.createElement('div');
    spooder.classList.add('spooder');

    let y = Math.floor(Math.random() * 100);
    let x = Math.floor(Math.random() * 100);

    spooder.style.top = y + 'vh';
    spooder.style.left = x + 'vw';

    let newSpooder = {
        id: counter,
        domEl: spooder, 
        x: x,
        y: y,
        gX: null,
        gY: null,
        timeSinceMove: 0,
        speed: Math.floor(Math.random() * 10) + 1
    };

    newSpooder.domEl.onclick = event => {
        clickSpider(newSpooder.id);
    };


    freeSpiders.set(newSpooder.id, newSpooder);
    counter++;
    body.appendChild(spooder);

    window.setTimeout(() => heading.classList.remove('animate'), 100);
};

function clickSpider(id) {
    let spooder = freeSpiders.get(id);
    if (freeSpiders.delete(id)) {
        cursorQueue.push(spooder);
    }
    let score = document.getElementsByTagName('h2')[0];
    score.innerText = 'Score: ' + cursorQueue.length;
}


window.setInterval(() => {
    for (const [id, spooder] of freeSpiders) {
        if (spooder.gX == null) {
            let moveR = Math.random() * 100000;
            if (moveR < spooder.timeSinceMove) {
                spooder.gX = Math.floor(Math.random() * 100);
                spooder.gY = Math.floor(Math.random() * 100);
            } else {
                spooder.timeSinceMove += 10;
                continue;
            }
        }

        let xDir = (spooder.gX - spooder.x);
        let yDir = (spooder.gY - spooder.y);
        let dist = Math.sqrt(Math.pow(xDir, 2) + Math.pow(yDir, 2));

        let xPart = xDir / dist;
        let yPart = yDir / dist;

        let newX = spooder.x + (xPart * spooder.speed / 10);
        let newY = spooder.y + (yPart * spooder.speed / 10);

        spooder.x = newX;
        spooder.y = newY;

        spooder.domEl.style.top = newY + 'vh';
        spooder.domEl.style.left = newX + 'vw';

        if (spooder.x - spooder.gX < 1 && spooder.y - spooder.gY < 1) {
            spooder.gX = null;
            spooder.gY = null;
            spooder.timeSinceMove = 0;
        }
    }
}, 10);

document.onmousemove = event => {
    for (let i = 0; i < cursorQueue.length; i++) {
        const spooder = cursorQueue[i];
        let windowHeight = window.innerHeight
        let windowWidth = window.innerWidth

        if (i == 0) {
            let gX;
            let gY;

            gX = (event.clientX / windowWidth) * 100;
            gY = (event.clientY / windowHeight) * 100;

            let xDir = (gX - spooder.x);
            let yDir = (gY - spooder.y);
            let dist = Math.sqrt(Math.pow(xDir, 2) + Math.pow(yDir, 2));
            console.log(dist);

            let xPart = 0;
            if (Math.abs((xDir / 100) * windowWidth) > 45) {
                xPart = xDir / dist;
            }

            let yPart = 0;
            if (Math.abs((yDir / 100) * windowHeight) > 45) {
                yPart = yDir / dist;
            }

            let newX = spooder.x + (xPart);
            let newY = spooder.y + (yPart);

            console.log(spooder.gX - spooder.x);
            if (Math.abs(spooder.gX - spooder.x) + Math.abs(spooder.gY - spooder.y) >= 2) {
                spooder.gX = newX;
                spooder.gY = newY;
            }

            spooder.x = newX;
            spooder.y = newY;


            spooder.domEl.style.top = newY + 'vh';
            spooder.domEl.style.left = newX + 'vw';
        } else {
            let newX = cursorQueue[i - 1].gX;
            let newY = cursorQueue[i - 1].gY;

            if (newX != spooder.x || newY != spooder.y) {
                spooder.gX = spooder.x;
                spooder.x = newX;
                spooder.domEl.style.left = newX + 'vw';
                spooder.gY = spooder.y;
                spooder.y = newY;
                spooder.domEl.style.top = newY + 'vh';
            }
        }        
    }
};
