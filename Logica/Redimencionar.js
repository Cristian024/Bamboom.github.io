function RedimencionarImagen(srcData, width, height){
    var imageObj = new Image(),
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        xStart = 0,
        yStart = 0,
        aspectRadio,
        newWidth,
        newHeight;
    imageObj.src = srcData;
    canvas.width = width;
    canvas.height = height;
    return canvas.toDataURL("image/jpeg", 0.75);
}