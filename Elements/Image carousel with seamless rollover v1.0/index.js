const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__nextBtn');
const prevBtn = document.querySelector('.carousel__prevBtn');
const navDots = document.querySelector('.carousel__nav');
const dots = Array.from(navDots.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);


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
track.style.transform = 'translateX(-' + slideWidth + ')';

moveToSlide(track, slides[0], slides[1]);

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


// when previous button is clicked, move slides to the right
prevBtn.addEventListener('click', function(e){
    const currentSlide = track.querySelector('.current-slide');

    let prevSlideIndex = slides.findIndex(slide => slide === currentSlide.previousElementSibling);
    const prevSlide = slides[prevSlideIndex];
    if (prevSlide == null) return; // spam protection
    track.style.transition = "transform .6s ease";
    moveToSlide(track, currentSlide, prevSlide); // move to the previous slide

    if(!prevSlide.previousElementSibling)
        prevSlideIndex = slides.length - 2;

    track.ontransitionend = () => {
        if(!prevSlide.previousElementSibling){
            track.style.transition = "none";
            moveToSlide(track, prevSlide, slides[prevSlideIndex]);
        }       
    };


    const currentDot = navDots.querySelector('.current-slide');
    const prevDot = dots[prevSlideIndex - 1];
    updateNavDots(currentDot, prevDot);
})


// when next button is clicked, move slides to the left
nextBtn.addEventListener('click', function(e){
    const currentSlide = track.querySelector('.current-slide');

    let nextSlideIndex = slides.findIndex(slide => slide === currentSlide.nextElementSibling);
    const nextSlide = slides[nextSlideIndex];
    if (nextSlide == null) return; // spam protection
    track.style.transition = "transform .6s ease";
    moveToSlide(track, currentSlide, nextSlide); // move to the next slide

    if(!nextSlide.nextElementSibling)
        nextSlideIndex = 1;

    track.ontransitionend = () => {
        if(!nextSlide.nextElementSibling){
            track.style.transition = "none";
            moveToSlide(track, nextSlide, slides[nextSlideIndex]);
        }       
    };


    const currentDot = navDots.querySelector('.current-slide');
    const nextDot = dots[nextSlideIndex - 1];
    updateNavDots(currentDot, nextDot);
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
})


// automatically move slides every 3 seconds
// let rotationTimer = setInterval(() => nextBtn.click(), 3000);

// pause slides when hovering over them
// track.onmouseenter = () => { clearInterval(rotationTimer); };
// track.onmouseleave = () => { rotationTimer = setInterval(() => nextBtn.click(), 3000); };