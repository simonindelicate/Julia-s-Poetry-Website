const images = [
    "image1.jpg", 
    "image2.jpg", 
    "image3.jpg", 
    "image4.jpg", 
    "image5.jpg", 
    "image6.jpg", 
    "image7.jpg", 
    "image8.jpg"
]; // List your images here

let currentIndex = 0;

function showImage(index) {
    const imgElement = document.getElementById('galleryImage');
    imgElement.src = images[index];
    imgElement.alt = `Displayed Image ${index + 1}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

document.getElementById('next').addEventListener('click', nextImage);
document.getElementById('prev').addEventListener('click', previousImage);

document.addEventListener('DOMContentLoaded', () => showImage(currentIndex));

// Adding swipe support for mobile devices
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
           evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */ 
            nextImage();
        } else {
            /* right swipe */
            previousImage();
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
