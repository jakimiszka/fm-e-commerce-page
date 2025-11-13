const nav = document.querySelector('.navigation--links');
const nav_close = document.querySelector('.navigation--links img');
const nav_open = document.querySelector('.navigation--logo_menu');
const overlay = document.querySelector('.overlay');
//cart
const cartContent = document.querySelector('.cart--content');
const cartItem = document.querySelector('.cart--content--item');
const cartEpmty = document.querySelector('.cart--content--empty');
const cartChart = document.querySelector('.cart');
const chartQuantity = document.querySelector('.item_quantity');
const chartTotalPrice = document.querySelector('.item_total_price');
//order
const cartButton = document.querySelector('.navigation--cart_icon');
const mainImage = document.querySelector('.gallery--main_image-all');
const nextImageButton = document.querySelector('.gallery_navigation--next');
const previousImageButton = document.querySelector('.gallery_navigation--previous');
const quantityValue = document.querySelector('.quantity_box--number');
const quantityMinus = document.querySelector('.quantity_box--minus');
const quantityPlus = document.querySelector('.quantity_box--plus');
const addToCartButton = document.querySelector('.buttons_wrapper .chart_button');
const price = document.querySelector('.product-details--pricing__new--new_price');
// gallery
const galleryCloseButton = document.querySelector('.gallery--close');
const galleryOriginal = document.querySelector('.gallery');
const currentImage = document.querySelector('.gallery--main_image [data-product="true"]');
const galleryImages = document.querySelectorAll('.gallery--main_image-all img');
let galleryImagesArray = Array.from(galleryImages);
const thumbnails = document.querySelectorAll('.gallery--thumbnail img');
let thumbnailsArray = Array.from(thumbnails);
//gallery preview
const galleryPreview = galleryOriginal.cloneNode(true);
const previewNext = galleryPreview.querySelector('.gallery_navigation--next');
const previewPrev = galleryPreview.querySelector('.gallery_navigation--previous');
const previewMainImageAll = galleryPreview.querySelectorAll('.gallery--main_image-all img');
let previewImagesArray = Array.from(previewMainImageAll);
const previewThumbnails = galleryPreview.querySelectorAll('.gallery--thumbnail img');
let previewThumbnailsArray = Array.from(previewThumbnails);
// preview container
const previewContainer = document.querySelector('.preview-container');
galleryPreview.classList.add('gallery--preview');
previewContainer.appendChild(galleryPreview);

function closeMenu(){
    nav.style.display = 'none';
    overlay.style.visibility = 'hidden';
};

function openMenu(){
    nav.style.display = 'flex';
    overlay.style.visibility = 'visible';
    overlay.style.display = 'flex';
};

function toggleCart(){
    if(cartChart.style.display === 'flex'){
        cartChart.style.display = 'none';
    } else {
        cartChart.style.display = 'flex';
    }
}

function changeQuantity(delta){
    console.log(quantityValue.innerHTML);
    if (Number(quantityValue.innerHTML) + delta < 0) return;
    quantityValue.innerHTML = Number(quantityValue.innerHTML) + delta;
}

function changeImage(delta){
    const len = galleryImagesArray.length;
    if (!len) return;

    let currentIndex = galleryImagesArray.findIndex(img => img.dataset.product === 'true');
    if (currentIndex < 0) currentIndex = 0;
    const newIndex = (currentIndex + delta + len) % len;

    if (currentIndex !== newIndex){
        // gallery
        galleryImagesArray[currentIndex].dataset.product = 'false';
        galleryImagesArray[newIndex].dataset.product = 'true';
        thumbnailsArray[currentIndex].dataset.selected = 'false';
        thumbnailsArray[newIndex].dataset.selected = 'true';
        //preview
        previewImagesArray[currentIndex].dataset.product = 'false';
        previewImagesArray[newIndex].dataset.product = 'true';
        previewThumbnailsArray[currentIndex].dataset.selected = 'false';
        previewThumbnailsArray[newIndex].dataset.selected = 'true';
    }
}

window.addEventListener('resize', () => {
    if (window.visualViewport.width < 1024){
        closeGalleryPreview();
    }
})

function galleryPreviewShow(){
    if (window.visualViewport.width < 1024){
        return;
    }
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
}

function addToChart(){
    const quantity = Number(quantityValue.innerHTML);
    const shoePrice = Number(price.dataset.price);
    const total = shoePrice * quantity;
    
    if (!!quantity){
        cartChart.style.display = 'flex';
        cartEpmty.style.display = 'none';

        const newItem = cartItem.cloneNode(true);
        const id = Math.floor(Math.random() * 100)
        newItem.dataset.id = id;
        newItem.querySelector('.cart--content--item_delete').addEventListener('click', () => {
            const itemList = cartContent.querySelectorAll('.cart--content--item');
            const deleteItem = Array.from(itemList).find(item => item.dataset.id == id.toString());
            deleteItem.remove();

            const itemListAfter = cartContent.querySelectorAll('.cart--content--item');
            const itemListAfterArray = Array.from(itemListAfter);
            if (itemListAfterArray.length === 0){
                cartEpmty.style.display = 'flex';
                cartItem.style.display = 'none';
            }
        })

        newItem.style.display = 'flex';
        newItem.querySelector('.item_quantity').innerHTML = quantity;
        newItem.querySelector('.item_total_price').innerHTML = total;
        cartContent.appendChild(newItem);
    }else{
        cartEpmty.style.display = 'flex';
        cartChart.style.display = 'flex';
        cartItem.style.display = 'none';
    }
}

nextImageButton.addEventListener('click', () => changeImage(1));
previousImageButton.addEventListener('click', () => changeImage(-1));
if (previewNext) previewNext.addEventListener('click', () => changeImage(1));
if (previewPrev) previewPrev.addEventListener('click', () => changeImage(-1));
mainImage.addEventListener('click', galleryPreviewShow);
nav_close.addEventListener('click', closeMenu);
nav_open.addEventListener('click', openMenu);
cartButton.addEventListener('click', toggleCart);
galleryCloseButton.addEventListener('click', closeGalleryPreview);
quantityMinus.addEventListener('click', () => changeQuantity(-1));
quantityPlus.addEventListener('click', () => changeQuantity(1));
addToCartButton.addEventListener('click', addToChart);


