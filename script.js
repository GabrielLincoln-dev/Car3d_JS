const container = document.querySelector('.container');
const image = document.querySelector('.car_image');

const cursor = {
    isDragging: false,
    initialPosition: 0,
};
let current_image = 1;
const totalImages = 36; // Defina aqui o total de fotos que você tem

const updateImage = (direction) => {
    if (direction < 0) {
        if( current_image ==12)
            { current_image=1}
       else{current_image += 1;}
    }

    if (direction > 0) {
       if( current_image ==1)
        { current_image=12}
       else{current_image -= 1;}
    }

    // Lógica para girar em loop
    if (current_image > totalImages) current_image = 1;
    if (current_image < 1) current_image = totalImages;

    image.src = `./images/${current_image}.jpg`;
};

container.addEventListener("mousedown", (event) => {
    cursor.isDragging = true;
    cursor.initialPosition = event.clientX;
});

window.addEventListener("mouseup", () => {
    cursor.isDragging = false;
});

container.addEventListener("mousemove", (event) => {
    if (!cursor.isDragging) return;

    const currentX = event.clientX;
    const offset = cursor.initialPosition - currentX;

    if (Math.abs(offset) >= 50) {
        updateImage(offset);
        cursor.initialPosition = currentX;
    }
});