const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__nextBtn');
const prevBtn = document.querySelector('.carousel__prevBtn');
const navDots = document.querySelector('.carousel__nav');
const dots = Array.from(navDots.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

track.style.transform = 'translateX(0)'; // fix for height issue change


// arrange slides next to each other

// 1st way
// slides[0].style.left = 0;
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

// 2nd way
// for (let index = 0; index < slides.length; index++) {
//     slides[index].style.left = slideWidth * index + 'px';
// }

// 3rd way
slides.forEach( (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
})


function moveToSlide(track, currentSlide, targetSlide) {
    // move to the target slide
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';

    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

function updateNavDots(currentDot, targetDot) {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

function hideShowArrows(slides, prevBtn, nextBtn, targetIndex) {
    // hide arrow buttons when start/end of slides reached
    if (targetIndex === 0) {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.add('is-hidden');
    } else {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.remove('is-hidden');
    }
}


// when previous button is clicked, move slides to the right
prevBtn.addEventListener('click', function(e){
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;    
    moveToSlide(track, currentSlide, prevSlide); // move to the next slide

    const currentDot = navDots.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    updateNavDots(currentDot, prevDot);

    const prevSlideIndex = slides.findIndex(slide => slide === prevSlide);
    hideShowArrows(slides, prevBtn, nextBtn, prevSlideIndex);
})

// when next button is clicked, move slides to the left
nextBtn.addEventListener('click', function(e){
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;    
    moveToSlide(track, currentSlide, nextSlide); // move to the next slide

    const currentDot = navDots.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    updateNavDots(currentDot, nextDot);

    const nextSlideIndex = slides.findIndex(slide => slide === nextSlide);
    hideShowArrows(slides, prevBtn, nextBtn, nextSlideIndex);
})


// when nav indicator is clicked, move to that slide
navDots.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentDot = navDots.querySelector('.current-slide');
    const targetDotIndex = dots.findIndex(dot => dot === targetDot);
    updateNavDots(currentDot, targetDot);
    
    const currentSlide = track.querySelector('.current-slide');
    const targetSlide = slides[targetDotIndex];
    moveToSlide(track, currentSlide, targetSlide);

    hideShowArrows(slides, prevBtn, nextBtn, targetDotIndex);
})

