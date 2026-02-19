const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

const frameCount = 240; // Total number of frames
const images = [];
const imageSeq = {
    frame: 0
};

// Resize canvas properly
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Helper function to format numbers like 001, 002...
function pad(num) {
    return num.toString().padStart(3, '0');
}

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `frames/ezgif-frame-${pad(i)}.jpg`;
    images.push(img);
}

// Draw image to canvas
function render() {
    const img = images[imageSeq.frame];
    if (img) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Maintain aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
}

// Initial render after first image loads
images[0].onload = render;

// Scroll animation
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    if (frameIndex !== imageSeq.frame) {
        imageSeq.frame = frameIndex;
        requestAnimationFrame(render);
    }
});
