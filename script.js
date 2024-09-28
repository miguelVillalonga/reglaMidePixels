document.getElementById('upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const img = document.getElementById('image');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const reader = new FileReader();
    reader.onload = function(event) {
        img.src = event.target.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            img.style.display = 'none';
        }
    }
    reader.readAsDataURL(file);
});

let startX, startY, endX, endY;

document.getElementById('canvas').addEventListener('mousedown', function(e) {
    const rect = this.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
});

document.getElementById('canvas').addEventListener('mouseup', function(e) {
    const rect = this.getBoundingClientRect();
    endX = e.clientX - rect.left;
    endY = e.clientY - rect.top;

    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)).toFixed(2);
    document.getElementById('output').innerText = `Distancia: ${distance} píxeles`;

    // Redraw the image and the line
    const ctx = this.getContext('2d');
    const img = document.getElementById('image');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
});
