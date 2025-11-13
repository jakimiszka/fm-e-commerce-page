const nav = document.querySelector('.navigation--links');
const nav_close = document.querySelector('.navigation--links img');
const nav_open = document.querySelector('.navigation--logo_menu');
const overlay = document.querySelector('.overlay');
const cartChart = document.querySelector('.cart');
const cartButton = document.querySelector('.navigation--cart_icon');

const nextImageButton = document.querySelector('.gallery_navigation--next');
const previousImageButton = document.querySelector('.gallery_navigation--previous');
const galleryImages = document.querySelectorAll('.gallery--main_image [data-id]');
const thumbnails = document.querySelectorAll('.gallery--thumbnail img');

function closeMenu(){
    nav.style.display = 'none';
    overlay.style.visibility = 'hidden';
};

function openMenu(){
    nav.style.display = 'flex';
    overlay.style.visibility = 'visible';
};

function toggleCart(){
    if(cartChart.style.display === 'flex'){
        cartChart.style.display = 'none';
    } else {
        cartChart.style.display = 'flex';
    }
}

function nextImage(){
    console.log('next');
}
function previousImage(){
    console.log('previous');
}
nextImageButton.addEventListener('click', nextImage);
previousImageButton.addEventListener('click', previousImage);

nav_close.addEventListener('click', closeMenu);
nav_open.addEventListener('click', openMenu);
cartButton.addEventListener('click', toggleCart);