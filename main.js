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

    const ourProduct = rawData.products[25]
    console.log(ourProduct);
    

// Or it can be done in another way, in separate lines: 
    // const firstProduct = products[0]
    // console.log(firstProduct);

    const productPhotos = ourProduct.images;
    console.log('Product photos', productPhotos);
    renderSlider(productPhotos)

})

.catch(error => {
    console.log(('Error fetching product data', error));
})

function renderSlider(photos) {
    const slider = document.getElementById('slider')

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