window.addEventListener('load', () => {

	const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));

	lazyImages.map((image) => {
		image.src = image.dataset.src;
		image.srcset = image.dataset.srcset; 
	})

})