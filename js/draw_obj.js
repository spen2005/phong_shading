function draw_objects(i){
    if (VertexPositionBuffer[i]   == null || VertexNormalBuffer[i] == null || VertexFrontColorBuffer[i] == null) {     
        return;
    }
    // Setup Projection Matrix
    mat4.identity(projection);
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 3000.0, projection);
    // Setup Model-View Matrix
    mat4.identity(model);

    //scale
    mat4.scale(model, [obj_scale[i], obj_scale[i], obj_scale[i]]);
    var rotateVec_init = obj_rotate[i];
    mat4.rotate(model, degToRad(rotateVec_init[0]), [1, 0, 0]);
    mat4.rotate(model, degToRad(rotateVec_init[1]), [0, 1, 0]);
    mat4.rotate(model, degToRad(rotateVec_init[2]), [0, 0, 1]);


    //alert(model);
    //translate
    var translateVec = obj_translate[i];
    mat4.translate(model, translateVec);
    

    /*mat4.identity(view);
    // Modify the camera position in the Model-View Matrix
    var matrix = mat4.create();
    mat4.identity(matrix);
    var rotateVec = update_rotate();
    mat4.rotate(matrix, degToRad(rotateVec[0]), [1, 0, 0]);
    var vec = vec3.create();
    mat4.multiplyVec4(matrix,cameraDirection,vec);

    cameraDirection = vec;
    */
    var temp = vec3.create();
    temp[0] = cameraPosition[0] + cameraDirection[0];
    temp[1] = cameraPosition[1] + cameraDirection[1];
    temp[2] = cameraPosition[2] + cameraDirection[2];
    mat4.lookAt(cameraPosition, temp, cameraUp,view);
    setMatrixUniforms();

    gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer[i]);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, VertexPositionBuffer[i].itemSize, gl.FLOAT, false,  0, 0);

    // Setup front color data
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexFrontColorBuffer[i]);
    gl.vertexAttribPointer(shaderProgram.vertexFrontColorAttribute,VertexFrontColorBuffer[i].itemSize, gl.FLOAT, false, 0, 0);
    
    // Setup normal data
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexNormalBuffer[i]);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, VertexNormalBuffer[i].itemSize, gl.FLOAT, false, 0, 0);

    // Setup ambient light and light position
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "Ka"), ka);
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "lightLoc"), light_locations);

    //Setup material
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "Kd"), obj_mtl[i][1]);
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "Ks"), obj_mtl[i][2]);

    gl.drawArrays(gl.TRIANGLES, 0, VertexPositionBuffer[i].numItems);
}
   

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clearColor(0.1, 0.1, 0.1, ka);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //iterate all objects
    draw_objects(0);
    draw_objects(1);
    //draw_objects(2);
    //draw_objects(3);
    //draw_objects(4);
    //draw_objects(5);
}

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.projectionUniform, false, projection);
    gl.uniformMatrix4fv(shaderProgram.modelUniform, false, model);
    gl.uniformMatrix4fv(shaderProgram.viewUniform, false, view);
}