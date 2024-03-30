function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var shaderSource = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            shaderSource += k.textContent;
        }

        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } 
    else if (shaderScript.type == "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } 
    else {
        return null;
    }

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initShaders() {
    var fragmentShader = getShader(gl, "fragmentShader");
    var vertexShader   = getShader(gl, "vertexShader");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexFrontColorAttribute = gl.getAttribLocation(shaderProgram, "aFrontColor");
    gl.enableVertexAttribArray(shaderProgram.vertexFrontColorAttribute);
    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "Ka"), ka); // 
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "lightLoc"), light_locations);
    shaderProgram.projectionUniform  = gl.getUniformLocation(shaderProgram, "projection");
    shaderProgram.modelUniform = gl.getUniformLocation(shaderProgram, "model");
    shaderProgram.viewUniform = gl.getUniformLocation(shaderProgram, "view");
}