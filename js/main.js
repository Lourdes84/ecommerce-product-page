const imgPrincipal = document.getElementById('imagePrincipal')
const imgPrincipalModal = document.getElementById('imagePrincipalModal')
const imageThumbnailModal = document.querySelectorAll('.image__thumbnail__modal')

const containerCartInfo = document.querySelector('.container__cart__info')
const modalContainer = document.querySelector('.modal-container')
const modalContainerImages = document.querySelector('.modal-container__image')

const totalAdd = document.querySelector('.info__total__add')
const totalCart = document.querySelector('.header__cart__icon__total')
const btnCheckout = document.querySelector('.container__cart__button')

// SELECT MENU DESKTOP

const links = document.querySelectorAll('.header__nav__link')

links.forEach((item)=>{
    item.addEventListener('click', ()=>{
        removeClassActive(links)
        item.classList.add('header__nav__link--active')
    })
})

// CHANGE IMAGE PRINCIPAL AND CLASS ACTIVE

const imageThumbnail = document.querySelectorAll('.image__thumbnail')

imageThumbnail.forEach((item, index)=>{
    item.addEventListener('click', ()=>{
        removeClassActive(imageThumbnail)
        item.classList.add('active')
        changeImage(index, imgPrincipal)
    })
})

// MENU RESPONSIVE 

const btnMenu = document.getElementById('btnMenuResponsive')
const btnMenuClose = document.getElementById('btnCloseMenu')
const menuResponsive = document.querySelector('.menu-responsive__container')
const overflow = document.getElementById('overflow')

btnMenu.addEventListener('click', ()=> {
    menuResponsive.classList.add('menu-responsive__container--show')
    overflow.classList.add('overflow--active')
    modalContainer.style.opacity = "1"
    modalContainer.style.visibility = 'visible'
})

btnMenuClose.addEventListener('click', ()=> {
    menuResponsive.classList.remove('menu-responsive__container--show')
    overflow.classList.remove('overflow--active')
    modalContainer.style.opacity = "0"
    modalContainer.style.visibility = 'hidden'
})

//  SHOW MODAL 

imgPrincipal.addEventListener('click', ()=> showModal(modalContainer))

// BUTTON CLOSE MODAL

const btnClose = document.getElementById('btnClose')

btnClose.addEventListener('click', () => closeModal(modalContainer))

// BUTTON PREVIOUS IMAGE

const btnPrev = document.querySelectorAll('.btn-previous')

btnPrev.forEach((btn, index)=>{
    btn.addEventListener('click', () => {
        index === 0 ? getImagePrev(imgPrincipal) : getImagePrev(imgPrincipalModal)
        removeClassActive(imageThumbnailModal)
    })
})

// BUTTON NEXT IMAGE

const btnNext = document.querySelectorAll('.btn-next')

btnNext.forEach((btn, index)=>{
    btn.addEventListener('click', () => {
        index === 0 ? getImageNext(imgPrincipal) : getImageNext(imgPrincipalModal)
        removeClassActive(imageThumbnailModal)
    })
})


// IMAGES THUMBNAILS MODAL

imageThumbnailModal.forEach((item, index)=>{
    item.addEventListener('click', () => {
        removeClassActive(imageThumbnailModal)
        item.classList.add('active')
        changeImage(index, imgPrincipalModal)
    })
})

// BUTTON CART INFO

const buttonCart = document.getElementById('button-cart')
const containerCart = document.querySelector('.container__cart')

buttonCart.addEventListener('click', () => containerCart.classList.toggle('container__cart--active'))

// BUTTON DECREMENT

const btnDecrement = document.getElementById('decrement')

btnDecrement.addEventListener('click', () => decrement() )

// BUTTON INCREMENT 

const btnIncrement = document.getElementById('increment')

btnIncrement.addEventListener('click', ()=> increment() )

// BUTTON ADD TO CART 

const btnAddToCart = document.querySelector('.container-info__button__cart')

btnAddToCart.addEventListener('click', ()=>{
    totalCart.innerHTML = totalAdd.innerHTML
    totalCart.innerHTML > 0 ? totalCart.classList.add('header__cart__icon__total--active') : totalCart.classList.remove('header__cart__icon__total--active')
    let articles = totalAdd.innerHTML
    if( articles === "0") return
    containerCartInfo.innerHTML = `
            <div class="container__cart__info__img">
                <img src="images/image-product-1.jpg" alt="Image product">
            </div>
            <div class="container__cart__info__price">
                <p>Fall Limited Edition Sneakers</p>
                <p>$125.00 x ${articles} <span>$${calculate(articles)}</span></p>
            </div>
            <div class="container__cart__info__delete">
                <img src="images/icon-delete.svg" alt="delete" id="btnDelete">
            </div>
    `
    btnCheckout.classList.remove('container__cart__button--hidden')
    const btnDelete = document.getElementById('btnDelete')
    btnDelete.addEventListener('click', ()=>{
        deleteProducts()
        btnCheckout.classList.add('container__cart__button--hidden')
        totalCart.innerHTML = "0"
        totalCart.classList.remove('header__cart__icon__total--active')
    })
})

// BUTTON DELETE

function deleteProducts(){return containerCartInfo.innerHTML = `<p>Your cart is empty</p>`}

// FUNCTIONS

const images = ["images/image-product-1.jpg","images/image-product-2.jpg","images/image-product-3.jpg","images/image-product-4.jpg"]
let i = 0

function getImagePrev(img){
    if(i <= 0) i = images.length
    i--
    return img.src = `${images[i]}`
}

function getImageNext(img){
    if(i >= images.length - 1) i = - 1
    i++
    return img.src = `${images[i]}`
}

function showModal(container){
    container.style.opacity = "1"
    container.style.visibility = 'visible'
    modalContainerImages.classList.toggle('modal-container__close')
}

function closeModal(container){
    modalContainerImages.classList.toggle('modal-container__close')
    setTimeout(()=>{
        container.style.opacity = '0'
        container.style.visibility = 'hidden'
     }, 1000)
}

function removeClassActive(link){ link.forEach( item => item.classList.remove('active', 'header__nav__link--active'))}

function changeImage(index, img){img.src = `${images[index]}`}

function decrement(){
    let resta
    resta = totalAdd.innerHTML
    if(resta === "0") return
    resta--
    totalAdd.innerHTML = `${resta}`
}

function increment(){
    let suma
    suma = totalAdd.innerHTML
    if(suma === "99") return
    suma++
    totalAdd.innerHTML = `${suma}`
}

function calculate(num){
    let price = 125
    return price * num
}