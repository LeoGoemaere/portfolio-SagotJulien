window.addEventListener('load', () => {

	const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));

	const lazyVideos = Array.from(document.querySelectorAll('.lazy-video'));

	lazyImages.map((image) => {
		image.src = image.dataset.src;
		image.srcset = image.dataset.srcset; 
	})

	lazyVideos.map((video) => {
		video.src = video.dataset.src;
	})


})