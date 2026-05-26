// maps white to "color" and the other colors respectively

// TODO
// The theme variable is not used.
// It should directly use the --col2 variable (and others?)$

// TODO: Observer for --col2? O forse è meglio ri-renderizzare la pagina
// perché alcuni snippet sono strani e hanno cose custom

let darkModeRenderer = null;

function createDarkModeRenderer() {
    const glCanvas = document.createElement("canvas");
    const gl = glCanvas.getContext("webgl", {
        premultipliedAlpha: false,
        preserveDrawingBuffer: true,
    });

    if (!gl) {
        throw new Error("WebGL not available");
    }

    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;

        varying vec2 v_texCoord;

        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = a_texCoord;
        }
`;

const fragmentShaderSource = `
    precision mediump float;

    uniform sampler2D u_image;
    uniform vec3 u_diff;
    uniform vec3 u_v;

    varying vec2 v_texCoord;

    void main() {
        vec4 pixel = texture2D(u_image, v_texCoord);
        vec3 rgb = pixel.rgb * 255.0;

        float r = rgb.r;
        float g = rgb.g;
        float b = rgb.b;

        bool isGray = abs(r - g) < 0.5 && abs(g - b) < 0.5;
        bool isNotWhite = abs(b - 255.0) >= 0.5;

        vec3 result;

        if (isGray && isNotWhite) {
            result = 255.0 - rgb;
        } else {
            result = mix(
            255.0 - u_v * rgb,
            rgb - u_diff,
            step(u_diff, rgb)
            );
        }

        gl_FragColor = vec4(result / 255.0, pixel.a);
    }
`;

function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(error);
    }

    return shader;
}

const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

const positionLocation = gl.getAttribLocation(program, "a_position");
const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

const imageLocation = gl.getUniformLocation(program, "u_image");
const diffLocation = gl.getUniformLocation(program, "u_diff");
const vLocation = gl.getUniformLocation(program, "u_v");

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
        // x,  y,   u, v
        -1, -1,   0, 0,
        1, -1,   1, 0,
        -1,  1,   0, 1,
        1,  1,   1, 1,
    ]),
    gl.STATIC_DRAW
);

const stride = 4 * Float32Array.BYTES_PER_ELEMENT;

gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(
    positionLocation,
    2,
    gl.FLOAT,
    false,
    stride,
    0
);

gl.enableVertexAttribArray(texCoordLocation);
gl.vertexAttribPointer(
    texCoordLocation,
    2,
    gl.FLOAT,
    false,
    stride,
    2 * Float32Array.BYTES_PER_ELEMENT
);

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// Importante: evita interpolazioni tra pixel.
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

gl.uniform1i(imageLocation, 0);

return {
    gl,
    glCanvas,
    texture,
    diffLocation,
    vLocation,
    };
}

function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
    };
}

function applyFilter(canvas, theme) {
    if (theme == null || theme === "theme-light") {
        return;
    }

    // TODO we are using "theme" just to check it isn't white.

    const hexColor = getComputedStyle(document.body).getPropertyValue("--col2").trim();
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Canvas must have a 2D context");
    }

    if (!darkModeRenderer) {
        darkModeRenderer = createDarkModeRenderer();
    }

    const {
        gl,
        glCanvas,
        texture,
        diffLocation,
        vLocation,
    } = darkModeRenderer;

    const { r, g, b } = hexToRgb(hexColor);

    const diffR = 255 - r;
    const diffG = 255 - g;
    const diffB = 255 - b;

    const v1 = 255 / diffR;
    const v2 = 255 / diffG;
    const v3 = 255 / diffB;

    glCanvas.width = canvas.width;
    glCanvas.height = canvas.height;

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Maintain correct orientation
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        canvas
    );

    gl.uniform3f(diffLocation, diffR, diffG, diffB);
    gl.uniform3f(vLocation, v1, v2, v3);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(glCanvas, 0, 0);
}