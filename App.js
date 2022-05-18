async function getImg() {
return await fetch('https://picsum.photos/v2/list?page=2&limit=15')
.then(response => response.json())
.then(images => images)
}

getImg().then(images => {
    images.map(image => {
        const imgAuthor = image.author
        const modifiedUrl = changeUrlImageSize(image.download_url, 320, 500)
        const container = document.createElement('div')
        container.className = 'galery--item'
        const elem = document.createElement('img')
        const elemP = document.createElement('p')
        elemP.className = 'author-name'
        elemP.textContent = imgAuthor
        elem.src=modifiedUrl
        container.appendChild(elem)
        container.appendChild(elemP)
        document.querySelector('.galery--container').appendChild(container)
    })
    document.querySelectorAll('.galery--item')[2].classList.add('item--focus')

    document.querySelector('.next-btn').addEventListener('click', () =>{

        next(document.querySelector('.galery--container'))
    })
})

const next = (carouselSlide) => {   

      if (carouselSlide.children.length >= 5) {
        const firstElement = carouselSlide.children[0]
        const size = carouselSlide.children[0].offsetWidth       
        carouselSlide.style.transition = 'transform 0.5s ease-in-out'
        carouselSlide.style.transform = 'translateX(' + (-size - 30) + 'px)'  
        document.querySelectorAll('.galery--item')[3].classList.add('item--focus')
        document.querySelectorAll('.galery--item')[2].classList.remove('item--focus')
        const transition = () => {         
            carouselSlide.style.transition = 'none'         
            carouselSlide.style.transform = 'translateX(0)'          
            carouselSlide.appendChild(firstElement)         
            carouselSlide.removeEventListener('transitionend', transition)
        }        
        carouselSlide.addEventListener('transitionend', transition)    
    }   
}

function changeUrlImageSize(url, width, height = width) {
    const { devicePixelRatio } = window;
    const arr = url.split("/");
  
    arr.splice(
      -2,
      2,
      width * devicePixelRatio ?? 1,
      height * devicePixelRatio ?? 1
    );
  
    return arr.join("/");
  }