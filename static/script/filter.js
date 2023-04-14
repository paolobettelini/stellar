// maps white to "color" and the other colors respectively
function applyFilter(canvas, hexColor) {
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
        const alpha = data[i + 3];

        data[i] = r < diffR ? 255 - v1 * r : r - diffR;
        data[i+1] = g < diffG ? 255 - v2 * g : g - diffG;
        data[i+2] = b < diffB ? 255 - v3 * b : b - diffB;
    }

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
}