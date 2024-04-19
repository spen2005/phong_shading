var audio = new Audio('audio/crash.mp3');

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function animate() {
    var timeNow = new Date().getTime();
    var G = 9.8;
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        for (var i = 0; i < 6; i++) {
            if(gravity)objects[i].velocity[1] -= G * elapsed/1000;
            objects[i].position[0] += objects[i].velocity[0] * elapsed/1000 ;
            objects[i].position[1] += objects[i].velocity[1] * elapsed/1000 ;
            objects[i].position[2] += objects[i].velocity[2] * elapsed/1000 ;
            if(objects[i].position[0] > 5){
                objects[i].position[0] = 5;
                objects[i].velocity[0] = -objects[i].velocity[0];
                //generate sound effect
                playSoundEffect();
                //alert("outofbounds");
            }
            if(objects[i].position[0] < -5){
                objects[i].position[0] = -5;
                objects[i].velocity[0] = -objects[i].velocity[0];
                playSoundEffect();
                //alert("outofbounds");
            }
            if(objects[i].position[1] > 5){
                objects[i].position[1] = 5;
                objects[i].velocity[1] = -objects[i].velocity[1];
                playSoundEffect();
                //alert("outofbounds");
            }
            if(objects[i].position[1] < -5){
                objects[i].position[1] = -5;
                objects[i].velocity[1] = -objects[i].velocity[1];
                playSoundEffect();
                //alert("outofbounds");
            }
            if(objects[i].position[2] > 5){
                objects[i].position[2] = 5;
                objects[i].velocity[2] = -objects[i].velocity[2];
                playSoundEffect();
                //alert("outofbounds");
            }
            if(objects[i].position[2] < -5){
                objects[i].position[2] = -5;
                objects[i].velocity[2] = -objects[i].velocity[2];
                playSoundEffect();
                //alert("outofbounds");
            }
            //alert("objects["+i+"].position[0]: " + objects[i].position[0]);
            //alert("objects["+i+"].position[1]: " + objects[i].position[1]);
            //alert("objects["+i+"].position[2]: " + objects[i].position[2]);
        }
    }
    for (var i = 0; i < 6; i++) {
        for (var j=i+1; j<6; j++) {
            //if two ball collide ( distance < sqrt(0.75))
            if(collision_status[i][j]==0 && Math.pow(objects[i].position[0]-objects[j].position[0],2) + Math.pow(objects[i].position[1]-objects[j].position[1],2) + Math.pow(objects[i].position[2]-objects[j].position[2],2) < 5){
                var temp = objects[i].velocity;
                objects[i].velocity = objects[j].velocity;
                objects[j].velocity = temp;
                collision_status[i][j] = 1;
                playSoundEffect();
                //alert(i+"collision"+j);
            }
            else{
                collision_status[i][j] = 0;
            }
        }
    }
    //alert("tick");
    lastTime = timeNow;
}

function playSoundEffect() {
    // 播放聲音
    if(!enable_audio)return;
    //alert("play sound effect")
    audio.play();

    // 在0.2秒後停止播放
    setTimeout(function() {
        audio.pause();
        audio.currentTime = 0;
    }, 2000); // 播放0.2秒
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}