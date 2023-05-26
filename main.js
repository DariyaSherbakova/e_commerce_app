const hamburger = document.getElementById('ham_menu');
const navMenu = document.getElementById('nav_menu');

hamburger.addEventListener('click', toggleHamMenu)
navMenu.addEventListener('click', toggleHamMenu)

function toggleHamMenu () {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
}

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(rawData => {
    const products = rawData.products;

    const productIds = [25, 26, 27, 28, 21, 30];
    productIds.forEach((productId) => {
      const imageElement = document.getElementById(`product-${productId}`);
      console.log('imageElement:', imageElement);
      imageElement.addEventListener('click', () => {
        renderSlider(products[productId - 1].images);
        renderProductDetails(products[productId - 1]);
      });
    })

    // const ourProduct = rawData.products[25]
    // console.log(ourProduct);
    

// Or it can be done in another way, in separate lines: 
    // const firstProduct = products[0]
    // console.log(firstProduct);

    const productPhotos = ourProduct.images;
    console.log('Product photos', productPhotos);
    renderSlider(productPhotos)
    renderProductDetails(ourProduct)

})

.catch(error => {
    console.log(('Error fetching product data', error));
})

function renderSlider(photos) {
    const slider = document.getElementById('slider')
    slider.innerHTML = ""

    photos.slice(0, 4).forEach(photoUrl => {
        const image = document.createElement('img');
        image.src = photoUrl;
        slider.appendChild(image)
        console.log('image:', image);
    });

    const pagination = document.getElementById('pagination')

    pagination.addEventListener('click', handlePaginationClick);

    function handlePaginationClick(event) {
        const clickedDot = event.target;
        if (clickedDot.classList.contains('page-dot')) {
            const index = parseInt(clickedDot.dataset.index)
            scrollToIndex(index)
        }
    }

      function scrollToIndex(index) {
        const scrollAmount = index * slider.offsetWidth
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })
      }



}


function renderProductDetails(product){
    const titleElement = document.getElementById('product-title')
    const descriptionElement = document.getElementById('product-description')
    const priceElement = document.getElementById('product-price');
    titleElement.innerText = product.title;
    descriptionElement.innerText = product.description;
    priceElement.innerText = `EUR ${product.price}`;
    const buyBtn = document.getElementById('buy-btn');
    buyBtn.addEventListener('click',alertOnclick);
    function alertOnclick(){
       alert(`${product.title} for EUR ${product.price} has been added to you`)
    }
 }