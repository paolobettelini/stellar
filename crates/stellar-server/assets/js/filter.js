// maps the light-themed canvas to the current theme

// TODO
// The theme variable is not used.

// TODO: Observer for --col? O forse è meglio ri-renderizzare la pagina
// perché alcuni snippet sono strani e hanno cose custom

let themeFilterRenderer = null;

function createThemeFilterRenderer() {
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

	// Logic that transforms the colors
	const fragmentShaderSource = `
	precision mediump float;

	uniform sampler2D u_image;

	uniform vec3 u_col1; // Text
	uniform vec3 u_col2; // Background
	uniform vec3 u_col3; // Nav background
	uniform vec3 u_col4; // Accent / colored text

	varying vec2 v_texCoord;

	float luminance(vec3 color) {
		return dot(color, vec3(0.2126, 0.7152, 0.0722));
	}

	void main() {
		vec4 pixel = texture2D(u_image, v_texCoord);
		vec3 src = pixel.rgb;

		float lum = luminance(src);

		float maxChannel = max(max(src.r, src.g), src.b);
		float minChannel = min(min(src.r, src.g), src.b);
		float chroma = maxChannel - minChannel;

		// Base mapping:
		// original black -> theme text color
		// original white -> theme background color
		vec3 grayMapped = mix(u_col1, u_col2, lum);

		// Preserve part of the original hue/saturation.
		// This avoids pushing colored pixels too much toward gray.
		vec3 colorOffset = src - vec3(lum);

		float saturationPreservation = smoothstep(0.04, 0.22, chroma);
		vec3 colorMapped = grayMapped + colorOffset * 1.15;
		colorMapped = clamp(colorMapped, 0.0, 1.0);

		vec3 result = mix(
			grayMapped,
			colorMapped,
			saturationPreservation
		);

		// Original light nav background:
		// rgb(245, 245, 245) -> --col3
		vec3 lightNav = vec3(245.0 / 255.0);

		float navMask = 1.0 - smoothstep(
			0.015,
			0.045,
			distance(src, lightNav)
		);

		// Exact or near white must become exactly --col2
		float whiteMask = 1.0 - smoothstep(
			0.001,
			0.02,
			distance(src, vec3(1.0))
		);

		// Original accent is blue-ish.
		// This catches pure blue and similar colored text.
		float blueDominance = src.b - max(src.r, src.g);

		float accentMask =
			smoothstep(0.08, 0.25, chroma) *
			smoothstep(0.05, 0.25, blueDominance);

		// Darker blues become --col4.
		// Very light blues blend toward --col2 to remain readable.
		vec3 accentMapped = mix(
			u_col4,
			u_col2,
			smoothstep(0.25, 1.0, lum)
		);

		result = mix(result, accentMapped, accentMask);
		result = mix(result, u_col3, navMask);
		result = mix(result, u_col2, whiteMask);

		gl_FragColor = vec4(result, pixel.a);
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

	const col1Location = gl.getUniformLocation(program, "u_col1");
	const col2Location = gl.getUniformLocation(program, "u_col2");
	const col3Location = gl.getUniformLocation(program, "u_col3");
	const col4Location = gl.getUniformLocation(program, "u_col4");

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

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	// Avoid interpolation between pixels.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	gl.uniform1i(imageLocation, 0);

	return {
		gl,
		glCanvas,
		texture,
		col1Location,
		col2Location,
		col3Location,
		col4Location,
	};
}

const colorParserCanvas = document.createElement("canvas");
const colorParserCtx = colorParserCanvas.getContext("2d");

function cssColorToRgb(color) {
	if (!color || !color.trim()) {
		throw new Error("Invalid CSS color");
	}

	colorParserCtx.fillStyle = "#000000";
	colorParserCtx.fillStyle = color.trim();

	const normalized = colorParserCtx.fillStyle;

	if (normalized.startsWith("#")) {
		let hex = normalized.slice(1);

		if (hex.length === 3) {
			hex = hex
				.split("")
				.map((character) => character + character)
				.join("");
		}

		return {
			r: parseInt(hex.slice(0, 2), 16),
			g: parseInt(hex.slice(2, 4), 16),
			b: parseInt(hex.slice(4, 6), 16),
		};
	}

	const match = normalized.match(
		/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/
	);

	if (!match) {
		throw new Error(`Invalid CSS color: ${color}`);
	}

	return {
		r: Number(match[1]),
		g: Number(match[2]),
		b: Number(match[3]),
	};
}

function getThemeColor(canvas, cssVarName, fallback) {
	const canvasValue = getComputedStyle(canvas)
		.getPropertyValue(cssVarName)
		.trim();

	const bodyValue = getComputedStyle(document.body)
		.getPropertyValue(cssVarName)
		.trim();

	const rootValue = getComputedStyle(document.documentElement)
		.getPropertyValue(cssVarName)
		.trim();

	return cssColorToRgb(canvasValue || bodyValue || rootValue || fallback);
}

function setVec3Color(gl, location, color) {
	gl.uniform3f(
		location,
		color.r / 255,
		color.g / 255,
		color.b / 255
	);
}

function applyFilter(canvas, theme) {
	if (theme == null || theme === "theme-light") {
		return;
	}

	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("Canvas must have a 2D context");
	}

	if (!themeFilterRenderer) {
		themeFilterRenderer = createThemeFilterRenderer();
	}

	const {
		gl,
		glCanvas,
		texture,
		col1Location,
		col2Location,
		col3Location,
		col4Location,
	} = themeFilterRenderer;

	const col1 = getThemeColor(canvas, "--col1", "#c8c9db");
	const col2 = getThemeColor(canvas, "--col2", "#161923");
	const col3 = getThemeColor(canvas, "--col3", "#2c2d41");
	const col4 = getThemeColor(canvas, "--col4", "#286f96");

	glCanvas.width = canvas.width;
	glCanvas.height = canvas.height;

	gl.viewport(0, 0, canvas.width, canvas.height);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Maintain correct orientation.
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		canvas
	);

	setVec3Color(gl, col1Location, col1);
	setVec3Color(gl, col2Location, col2);
	setVec3Color(gl, col3Location, col3);
	setVec3Color(gl, col4Location, col4);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(glCanvas, 0, 0);
}