const container = document.querySelector('.container');
const image = document.querySelector('.car_image');
const rotateMessage = document.querySelector('.rotate-message');

const cursor = {
    isDragging: false,
    initialPosition: 0,
};

let current_image = 1;
const totalImages = 36;

const updateImage = (direction) => {
    if (direction < 0) {
        if (current_image == 12) {
            current_image = 1;
        } else {
            current_image += 1;
        }
    }

    if (direction > 0) {
        if (current_image == 1) {
            current_image = 12;
        } else {
            current_image -= 1;
        }
    }

    if (current_image > totalImages) current_image = 1;
    if (current_image < 1) current_image = totalImages;

    image.src = `./images/${current_image}.jpg`;
};

const getClientX = (event) => {
    if (event.touches && event.touches.length > 0) {
        return event.touches[0].clientX;
    }
    return event.clientX;
};

const startDrag = (event) => {
    cursor.isDragging = true;
    cursor.initialPosition = getClientX(event);
};

const endDrag = () => {
    cursor.isDragging = false;
};

const moveDrag = (event) => {
    if (!cursor.isDragging) return;

    if (event.cancelable) event.preventDefault();

    const currentX = getClientX(event);
    const offset = cursor.initialPosition - currentX;

    if (Math.abs(offset) >= 50) {
        updateImage(offset);
        cursor.initialPosition = currentX;
    }
};

container.addEventListener("mousedown", startDrag);
window.addEventListener("mouseup", endDrag);
container.addEventListener("mousemove", moveDrag);

container.addEventListener("touchstart", startDrag, { passive: true });
container.addEventListener("touchmove", moveDrag, { passive: false });
window.addEventListener("touchend", endDrag);
window.addEventListener("touchcancel", endDrag);

// orientação horizontal no mobile
const handleOrientation = () => {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    if (rotateMessage) {
        rotateMessage.style.display = isPortrait ? "flex" : "none";
    }
};

window.addEventListener("resize", handleOrientation);
window.addEventListener("orientationchange", handleOrientation);
handleOrientation();