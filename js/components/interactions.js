window.addEventListener('DOMContentLoaded', () => {

	const buttons = Array.from(document.querySelectorAll('.js-cta'));
	const animateDevice = document.querySelector('.animate-device');
	// const wrapperVideos = document.querySelector('.videos');
	const overlay  = document.querySelector('.overlay');
	const closeOverlay  = document.querySelector('.close-overlay');
	const breakpoint = 768;
	let isActive = false;

	function insertDatasInAnimateDevice(animateDevice, deviceType, videoName) {
		let chosenVideo = animateDevice.querySelector(`.js-${videoName}`);
		animateDevice.classList.add(deviceType);
		setElementActive(animateDevice, true);
		animateDevice.dataset.device = deviceType;
		chosenVideo.classList.add('active');
		chosenVideo.play();	// When datas are insert we play the video
		isActive = true;
	}

	function redirectToUrlVideo(videosContainer, videoName) {
		let chosenVideo = videosContainer.querySelector(`.js-${videoName} > source`);
		window.location.href = chosenVideo.src;
	}

	function desactivateAnimation(animateDevice) {
		setElementActive(animateDevice, false);
		isActive = false;
	}

	function removeAttributesIfAnimationEnd(targetElement, classToRemove) {
		let animateVideo = targetElement.querySelector("video.active");
		animateVideo.load();
		animateVideo.classList.remove('active');
		targetElement.classList.remove(classToRemove);
		targetElement.dataset.device = '';
	}

	function getDevice(targetElement) {
		return targetElement.parentNode.dataset.device;
	}

	function getVideoName(targetElement) {
		return targetElement.dataset.video;
	}

	function setElementActive(targetElement, activated) {
		if (activated) {
			targetElement.classList.add('activated');
			targetElement.classList.remove('desactivated');
		} else {
			targetElement.classList.add('desactivated');
			targetElement.classList.remove('activated');
		}
	}

	function playAnimationOverlay(overlayElement, offClass, addClassAnim, removeClassAnim) {
		if (offClass !== null) {
			overlayElement.classList.remove(offClass);
		}
		overlayElement.classList.add(addClassAnim);
		overlayElement.classList.remove(removeClassAnim);
	}

	buttons.map(button => button.addEventListener('click', function() { 
		if (window.innerWidth > breakpoint) {
			insertDatasInAnimateDevice(animateDevice, getDevice(this), getVideoName(this));
			playAnimationOverlay(overlay, 'off', 'active', 'inactive');
			playAnimationOverlay(closeOverlay, 'off', 'activated', 'desactivated');
		} else {
			redirectToUrlVideo(animateDevice, getVideoName(this), 'index');
		}
	}));

	overlay.addEventListener('click', function() {
			desactivateAnimation(animateDevice);
			playAnimationOverlay(closeOverlay, null, 'desactivated', 'activated');
			playAnimationOverlay(this, null, 'inactive', 'active');
	});


	overlay.addEventListener('animationend', function() {
		if (!isActive) {
			this.classList.add('off');
		}
	});
	
	closeOverlay.addEventListener('click', function() {
		desactivateAnimation(animateDevice);
		playAnimationOverlay(closeOverlay, null, 'desactivated', 'activated');
		playAnimationOverlay(overlay, null, 'inactive', 'active');
	});

	closeOverlay.addEventListener('animationend', function() {
		if (!isActive) {
			this.classList.add('off');
		}
	});

	animateDevice.addEventListener('animationend', function() {
		if (!isActive) {
			removeAttributesIfAnimationEnd(this, this.dataset.device)
		}
	});

})