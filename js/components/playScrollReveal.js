window.addEventListener('DOMContentLoaded', () => {

	const breakpoint = 768;

	if (window.innerWidth > breakpoint) {
		window.sr = ScrollReveal({ 
			origin: 'top',
			duration: 600,
			easing: 'ease-out',
			distance: '4%',
		});
		sr.reveal('.js-sr');
	}
})