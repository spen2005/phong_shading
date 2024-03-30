function handle_loaded_object(Data,i){
    VertexPositionBuffer[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Data.vertexPositions), gl.STATIC_DRAW);
    VertexPositionBuffer[i].itemSize = 3;
    VertexPositionBuffer[i].numItems = Data.vertexPositions.length / 3;

    VertexNormalBuffer[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexNormalBuffer[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Data.vertexNormals), gl.STATIC_DRAW);
    VertexNormalBuffer[i].itemSize = 3;
    VertexNormalBuffer[i].numItems = Data.vertexNormals.length / 3;

    VertexFrontColorBuffer[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexFrontColorBuffer[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Data.vertexFrontcolors), gl.STATIC_DRAW);
    VertexFrontColorBuffer[i].itemSize = 3;
    VertexFrontColorBuffer[i].numItems = Data.vertexFrontcolors.length / 3;
}

function load_obj(filename, i) {
    var request = new XMLHttpRequest();
    request.open("GET", "./model/" + filename);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            handle_loaded_object(JSON.parse(request.responseText), i);
        }
    }
    request.send();
    num_obj++;
}