window.addEventListener('DOMContentLoaded', () => {

	const buttons = Array.from(document.querySelectorAll('.cta'));
	const animateDevice = document.querySelector('.animate-device');
	const overlay  = document.querySelector('.overlay');
	let isActive = false;

	const videoTest = "";


	function insertDatasInAnimateDevice(animateDevice, deviceType, videoName) {
		let choosenVideo = animateDevice.querySelector(`.js-${videoName}`);
		animateDevice.classList.add(deviceType);
		animateDevice.classList.add('activated');
		animateDevice.classList.remove('desactivated');
		animateDevice.dataset.device = deviceType;
		choosenVideo.classList.add('active');
		choosenVideo.play();	// When datas are insert we play the video
		isActive = true;
	}

	function desactivateAnimation(animateDevice) {
		animateDevice.classList.add('desactivated');
		animateDevice.classList.remove('activated');
		isActive = false;
	}

	function removeAttributesIfAnimationEnd(targetElement, classToRemove) {
		let activeVideo = targetElement.querySelector("video.active");
		targetElement.classList.remove(classToRemove);
		targetElement.dataset.device = '';
		activeVideo.classList.remove('active');
		activeVideo.load();	// Stop the video when animation end
	}

	function getDevice(targetElement) {
		return targetElement.parentNode.dataset.device;
	}

	function getVideoName(targetElement) {
		return targetElement.dataset.video;
	}

	function toggleOverlay(overlayElement, classToAdd) {
		overlayElement.classList.toggle(classToAdd);
	}

	buttons.map(button => button.addEventListener('click', function() { 
		insertDatasInAnimateDevice(animateDevice, getDevice(this), getVideoName(this));
		toggleOverlay(overlay, 'active');
	}))

	overlay.addEventListener('click', function() {
		desactivateAnimation(animateDevice);
		toggleOverlay(this, 'active');
	})

	animateDevice.addEventListener('animationend', function() {
		if (!isActive) {
			removeAttributesIfAnimationEnd(this, this.dataset.device)
		}
	})

})