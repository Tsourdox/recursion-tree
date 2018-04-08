/**
 * This is a simple recursive program that draws a tree.
 */

/* Start program when the DOM is loaded */
window.onload = runProgram;

/* Restart program if window has been resized */
window.onresize = runProgram;

function runProgram() {
    setFullscreen();
    configureCanvasContext();
    var pointAtTreeRoot = moveToTreeRoot();
    drawTree(pointAtTreeRoot);
    drawTitle("The Vegan Tree");
}

function setFullscreen() {
    var canvas = document.querySelector("canvas");
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
}

function configureCanvasContext() {
    var ctx = document.querySelector("canvas").getContext("2d");
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.font = "50px Helvetica";
    ctx.lineWidth = 3.1;
    ctx.scale(2, 2);
}

function moveToTreeRoot() {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var pointAtTreeRoot = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.9
    };
    ctx.moveTo(pointAtTreeRoot.x, pointAtTreeRoot.y);
    return pointAtTreeRoot;
}

function drawTree(pointAtTreeRoot) {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    
    var stemHeight = canvas.height * 0.1;
    var pointAtTopOfStem = drawStem(canvas, ctx, pointAtTreeRoot, stemHeight);
    drawBranch(canvas, ctx, pointAtTopOfStem.x, pointAtTopOfStem.y, stemHeight * 0.8, 0, 0);
}

function drawStem(canvas, ctx, pointAtTreeRoot, stemHeight) {
    /* Draw a line upwards 1/5 of the canvas height */
    var pointAtTopOfStem = {
        x: pointAtTreeRoot.x,
        y: pointAtTreeRoot.y - stemHeight
    };
    ctx.lineTo(pointAtTopOfStem.x, pointAtTopOfStem.y);
    ctx.stroke();
    return pointAtTopOfStem;
}

function drawBranch(canvas, ctx, x, y, lenght, angle, branchLevel) {
    /* Base case */
    if (branchLevel > 5) {
        return;
    }

    var lengthNext = lenght * 0.8;
    var leftAngle = angle - 30;
    var rightAngle = angle + 30;

    /* Draw left */
    var nextPoint = getNextPoint(x, y, lengthNext, leftAngle);
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();
    drawBranch(canvas, ctx, nextPoint.x, nextPoint.y, lengthNext, leftAngle, branchLevel + 1);

    /* Draw right */
    nextPoint = getNextPoint(x, y, lengthNext, rightAngle);
    ctx.moveTo(x, y);
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();
    drawBranch(canvas, ctx, nextPoint.x, nextPoint.y, lengthNext, rightAngle, branchLevel + 1);

}

function getNextPoint(x, y, length, angle) {
    nextX = x + length * Math.sin(angle * Math.PI/180);
    nextY = y - length * Math.cos(angle * Math.PI/180);
    return { x: nextX, y: nextY };
}

function drawTitle(title) {
    var ctx = document.querySelector("canvas").getContext("2d");
    var x = window.innerWidth * 0.5 - ctx.measureText(title).width / 2;
    var y = window.innerHeight * 0.15;
    ctx.fillText(title, x, y);
}

