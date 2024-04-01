function handle_loaded_obj(Data,i){
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

function parse_obj(responseText, color) {
    var lines = responseText.split("\n");
    var positions = [];
    var normals = [];
    var colors = [];
    var vertexIndices = [];
    var normalIndices = [];
    var ct = 0;
    lines.forEach(function (line) {
        var parts = line.trim().split(/\s+/);
        if (parts[0] === "v") {
            positions.push(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
        } else if (parts[0] === "vn") {
            normals.push(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
        } else if (parts[0] === "f") {
            parts.shift(); // Remove "f"
            parts.forEach(function (vertex) {
                var vertexData = vertex.split("//");
                var vertexIndex = parseInt(vertexData[0]) - 1; 
                var normalIndex = parseInt(vertexData[1]) - 1; 

                vertexIndices.push(positions[vertexIndex * 3], positions[vertexIndex * 3 + 1], positions[vertexIndex * 3 + 2]);
                normalIndices.push(normals[normalIndex * 3], normals[normalIndex * 3 + 1], normals[normalIndex * 3 + 2]);
                ct++;
            });
        }        
    });

    for (var i = 0; i < 3*ct; i += 3) {
        colors.push(color[0], color[1], color[2]);
    }

    var Data = {
        vertexPositions: new Float32Array(vertexIndices),
        vertexNormals: new Float32Array(normalIndices),
        vertexFrontcolors: new Float32Array(colors)
    };

    return Data;
}


function load_obj(filename, i, obj_type) {
    var request = new XMLHttpRequest();
    request.open("GET", "./model/" + filename);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if(obj_type == 0 )handle_loaded_obj(JSON.parse(request.responseText), i);
            else if(obj_type == 1) handle_loaded_obj(parse_obj(request.responseText,[0.628281,0.555802,0.366065]), i);
        }
    }
    request.send();
    num_obj++;
}