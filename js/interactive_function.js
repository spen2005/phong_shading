function update_ambient_light(){
    ka = document.getElementById("am_ka").value;
}

function update_light_location(){
    light_locations[0] = 50*document.getElementById("llocX").value;
    light_locations[1] = 50*document.getElementById("llocY").value;
    light_locations[2] = 50*document.getElementById("llocZ").value;
    //alert(light_locations);
}

function update_trans(){
    var tx = document.getElementById("transX").value;
    var ty = document.getElementById("transY").value;
    var tz = document.getElementById("transZ").value;

    return vec3.create([tx, ty, tz]);
}

function update_rotate(){
    var rx = document.getElementById("rotateX").value;
    var ry = document.getElementById("rotateY").value;
    var rz = document.getElementById("rotateZ").value;

    return vec3.create([rx, ry, rz]);
}

function update_obj_color(){
    var r = document.getElementById("objR").value;
    var g = document.getElementById("objG").value;
    var b = document.getElementById("objB").value;

    return vec3.create([r, g, b]);
}

function setPhong(){
    shadingMode = 0;
    alert('set');
}
function setGouraud(){
    shadingMode = 1 ;
}

function setRaytracing(){
    shadingMode = 2;
}