function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        for (var i = 0; i < 6; i++) {
            objects[i].position[0] += objects[i].velocity[0] * elapsed/1000 ;
            objects[i].position[1] += objects[i].velocity[1] * elapsed/1000 ;
            objects[i].position[2] += objects[i].velocity[2] * elapsed/1000 ;
            if(objects[i].position[0] > 5){
                objects[i].position[0] = 5;
                objects[i].velocity[0] = -objects[i].velocity[0];
                //alert("outofbounds");
            }
            if(objects[i].position[0] < -5){
                objects[i].position[0] = -5;
                objects[i].velocity[0] = -objects[i].velocity[0];
                //alert("outofbounds");
            }
            if(objects[i].position[1] > 5){
                objects[i].position[1] = 5;
                objects[i].velocity[1] = -objects[i].velocity[1];
                //alert("outofbounds");
            }
            if(objects[i].position[1] < -5){
                objects[i].position[1] = -5;
                objects[i].velocity[1] = -objects[i].velocity[1];
                //alert("outofbounds");
            }
            if(objects[i].position[2] > 5){
                objects[i].position[2] = 5;
                objects[i].velocity[2] = -objects[i].velocity[2];
                //alert("outofbounds");
            }
            if(objects[i].position[2] < -5){
                objects[i].position[2] = -5;
                objects[i].velocity[2] = -objects[i].velocity[2];
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
            if(collision_status[i][j]==0 && Math.pow(objects[i].position[0]-objects[j].position[0],2) + Math.pow(objects[i].position[1]-objects[j].position[1],2) + Math.pow(objects[i].position[2]-objects[j].position[2],2) < 3){
                var temp = objects[i].velocity;
                objects[i].velocity = objects[j].velocity;
                objects[j].velocity = temp;
                collision_status[i][j] = 1;
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

function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}