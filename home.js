function flipImage(element) {
    var image = element.parentNode.nextElementSibling.querySelector('.flippable');
    image.classList.toggle('flipped');
}