window.addEventListener('DOMContentLoaded', () => {

	const buttons = Array.from(document.querySelectorAll('.js-cta'));
	const animateDevice = document.querySelector('.animate-device');
	const overlay  = document.querySelector('.overlay');
	const breakpoint = 768;
	let isActive = false;

	function insertDatasInAnimateDevice(animateDevice, deviceType, videoName) {
		let chosenVideo = animateDevice.querySelector(`.js-${videoName}`);
		animateDevice.classList.add(deviceType);
		animateDevice.classList.add('activated');
		animateDevice.classList.remove('desactivated');
		animateDevice.dataset.device = deviceType;
		chosenVideo.classList.add('active');
		chosenVideo.play();	// When datas are insert we play the video
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
		}
	}))

	overlay.addEventListener('click', function() {
			desactivateAnimation(animateDevice);
			playAnimationOverlay(this, null, 'inactive', 'active');
	})

	overlay.addEventListener('animationend', function() {
		if (!isActive) {
			this.classList.add('off');
		}
	})

	animateDevice.addEventListener('animationend', function() {
		if (!isActive) {
			removeAttributesIfAnimationEnd(this, this.dataset.device)
		}
	})

})