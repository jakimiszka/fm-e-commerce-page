const nav = document.querySelector('.navigation--links');
const nav_close = document.querySelector('.navigation--links img');
const nav_open = document.querySelector('.navigation--logo_menu');
const overlay = document.querySelector('.overlay');
const cartChart = document.querySelector('.cart');
const cartButton = document.querySelector('.navigation--cart_icon');
const mainImage = document.querySelector('.gallery--main_image-all');
const nextImageButton = document.querySelector('.gallery_navigation--next');
const previousImageButton = document.querySelector('.gallery_navigation--previous');

const galleryCloseButton = document.querySelector('.gallery--close');
const galleryOriginal = document.querySelector('.gallery');
const galleryPreview = galleryOriginal.cloneNode(true);
const previewContainer = document.querySelector('.preview-container');
galleryPreview.classList.add('gallery--preview');
previewContainer.appendChild(galleryPreview);

const currentImage = document.querySelector('.gallery--main_image [data-product="true"]');
const galleryImages = document.querySelectorAll('.gallery--main_image-all img');
let galleryImagesArray = Array.from(galleryImages);
const thumbnails = document.querySelectorAll('.gallery--thumbnail img');
let thumbnailsArray = Array.from(thumbnails);
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


// single function to change current image by delta (1 = next, -1 = previous)
function changeImage(delta){
    const len = galleryImagesArray.length / 2; // coz copied node of gallery 
    
    if (!len) return;

    // find current index once
    let currentIndex = galleryImagesArray.findIndex(img => img.dataset.product === 'true');

    // if none marked, initialize to 0
    if (currentIndex < 0) currentIndex = 0;

    // compute new index with wrap-around
    const newIndex = (currentIndex + delta + len) % len;

    // update main image
    mainImage.src = galleryImagesArray[newIndex].src;
    // update dataset flags
    if (currentIndex !== newIndex){
        galleryImagesArray[currentIndex].dataset.product = 'false';
        galleryImagesArray[newIndex].dataset.product = 'true';
        thumbnailsArray[currentIndex].dataset.selected = 'false';
        thumbnailsArray[newIndex].dataset.selected = 'true';
    }
}

function galleryPreviewShow(){
    overlay.style.visibility = 'visible';
    overlay.style.display = 'flex';
    mainImage.style.display = 'block';
    previewContainer.style.display = 'flex';
    galleryPreview.style.display = 'flex';
    galleryCloseButton.style.display = 'block';
    cartChart.style.display = 'none';
}

function closeGalleryPreview(){
    overlay.style.visibility = 'hidden';
    overlay.style.display = 'none';
    previewContainer.style.display = 'none';
    galleryPreview.style.display = 'none';
    cartChart.style.display = 'block';
}

nextImageButton.addEventListener('click', () => changeImage(1));
previousImageButton.addEventListener('click', () => changeImage(-1));
mainImage.addEventListener('click', galleryPreviewShow);
nav_close.addEventListener('click', closeMenu);
nav_open.addEventListener('click', openMenu);
cartButton.addEventListener('click', toggleCart);
galleryCloseButton.addEventListener('click', closeGalleryPreview);