// maps white to "color" and the other colors respectively

function applyFilter(canvas, theme) {
  if (theme == null || theme == 'theme-light') {
    return;
  }

  // Assume it's theme-light
  // TODO fix  (--col2)
  let hexColor = "#161923";
  
  const diffR = 255 - parseInt(hexColor.slice(1, 3), 16);
    const diffG = 255 - parseInt(hexColor.slice(3, 5), 16);
    const diffB = 255 - parseInt(hexColor.slice(5, 7), 16);

    // Get the image data from the canvas
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Loop through each pixel in the image data
    let v1 = 255/diffR;
    let v2 = 255/diffG;
    let v3 = 255/diffB;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r == g && g == b && b != 255) {
            data[i] = 255 - r;
            data[i+1] = 255 - g;
            data[i+2] = 255 - b;
        } else {
            data[i] = r < diffR ? 255 - v1 * r : r - diffR;
            data[i+1] = g < diffG ? 255 - v2 * g : g - diffG;
            data[i+2] = b < diffB ? 255 - v3 * b : b - diffB;
        }
    }

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
}

/*

function applyFilter(canvas, hexColor) {
    const gl = canvas.getContext('webgl');

    let c2 = document.createElement( 'canvas' );
    let gl2 = c2.getContext('webgl');

    console.log(gl)
    console.log(gl2)

    if (gl == undefined) {
        alert("WebGL undefined");
        return;
    }
  
    // create a texture and upload the image data to the texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  
    // create a shader program and set the shader source code
    const program = gl.createProgram();
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
      attribute vec2 position;
      attribute vec2 texCoord;
      varying vec2 vTexCoord;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        vTexCoord = texCoord;
      }
    `);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, `
      precision highp float;
      uniform sampler2D texture;
      uniform vec3 diff;
      varying vec2 vTexCoord;
      void main() {
        vec4 color = texture2D(texture, vTexCoord);
        if (color.r == color.g && color.g == color.b && color.b != 1.0) {
          color.rgb = vec3(1.0) - color.rgb;
        } else {
          color.r = color.r < diff.r ? 1.0 - (255.0/diff.r) * color.r : color.r - diff.r;
          color.g = color.g < diff.g ? 1.0 - (255.0/diff.g) * color.g : color.g - diff.g;
          color.b = color.b < diff.b ? 1.0 - (255.0/diff.b) * color.b : color.b - diff.b;
        }
        gl_FragColor = color;
      }
    `);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
  
    // set the shader program and the texture data as the active texture
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation(program, 'texture'), 0);
  
    // set the difference values as a uniform variable in the shader
    const diffR = 255 - parseInt(hexColor.slice(1, 3), 16);
    const diffG = 255 - parseInt(hexColor.slice(3, 5), 16);
    const diffB = 255 - parseInt(hexColor.slice(5, 7), 16);
    gl.uniform3f(gl.getUniformLocation(program, 'diff'), diffR, diffG, diffB);
  
    // set up the vertices and texture coordinates for rendering
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);
    const positionAttrib = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ]), gl.STATIC_DRAW);
    const texCoordAttrib = gl.getAttribLocation(program, 'texCoord');
    gl.enableVertexAttribArray(texCoordAttrib);
    gl.vertexAttribPointer(texCoordAttrib, 2, gl.FLOAT, false, 0, 0);
  
    // render the modified texture to the canvas
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }*/