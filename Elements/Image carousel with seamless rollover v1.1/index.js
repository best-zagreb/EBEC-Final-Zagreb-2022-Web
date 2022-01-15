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
    let currentSlide = track.querySelector('.current-slide');

    if(currentSlide == slides[1]){
        track.style.transition = "transform .001s";
        moveToSlide(track, currentSlide, slides[slides.length - 1]);
            
        track.ontransitionend = () => {
            if(currentSlide == slides[1]){
                currentSlide = slides[slides.length - 1];
                moveToPreviousSlide(); 
            }  
        };
    } else {
        moveToPreviousSlide();
    }

    function moveToPreviousSlide(){
        let prevSlideIndex = slides.findIndex(slide => slide === currentSlide.previousElementSibling);
        const prevSlide = slides[prevSlideIndex];
        track.style.transition = "transform .6s ease";
        moveToSlide(track, currentSlide, prevSlide); // move to the previous slide


        const currentDot = navDots.querySelector('.current-slide');
        const prevDot = dots[prevSlideIndex - 1];
        updateNavDots(currentDot, prevDot);ž
    }
})


// when next button is clicked, move slides to the left
nextBtn.addEventListener('click', function(e){
    let currentSlide = track.querySelector('.current-slide');

    if(currentSlide == slides[slides.length - 2]){
        track.style.transition = "transform .001s";
        moveToSlide(track, currentSlide, slides[0]);
            
        track.ontransitionend = () => {
            if(currentSlide == slides[slides.length - 2]){
                currentSlide = slides[0];
                moveToNextSlide(); 
            }  
        };
    } else {
        moveToNextSlide();
    }

    function moveToNextSlide(){
        let nextSlideIndex = slides.findIndex(slide => slide === currentSlide.nextElementSibling);
        const nextSlide = slides[nextSlideIndex];
        track.style.transition = "transform .6s ease";
        moveToSlide(track, currentSlide, nextSlide); // move to the previous slide


        const currentDot = navDots.querySelector('.current-slide');
        const prevDot = dots[nextSlideIndex - 1];
        updateNavDots(currentDot, prevDot);
    }
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


// known problems: 
// when previous arrow is spammed, the transition from slide 0->last is started before
// the transition from slide 1->0 is finished, causing glitchy effect 
// when next arrow is spammed, the transition from slide last->0 is started before
// the transition from slide last-1->last is finished, causing glitchy effect 