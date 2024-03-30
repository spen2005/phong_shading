function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        teapotAngle += 0.03 * elapsed;
    }
    
    lastTime = timeNow;
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}