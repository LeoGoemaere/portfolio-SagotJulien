window.addEventListener('DOMContentLoaded', () => {

	const buttons = Array.from(document.querySelectorAll('.cta'));
	const animateDevice = document.querySelector('.animate-device');
	const overlay  = document.querySelector('.overlay');
	let isActive = false;

	const videoTest = "";


	function insertDatasInAnimateDevice(animateDevice, deviceType, deviceSrc) {
		animateDevice.classList.add(deviceType);
		animateDevice.dataset.device = deviceType;
		animateDevice.querySelector("video").src = deviceSrc;

		animateDevice.classList.add('activated');
		animateDevice.classList.remove('desactivated');

		isActive = true;
	}

	function desactivateAnimation(animateDevice) {
		animateDevice.classList.add('desactivated');
		animateDevice.classList.remove('activated');
		isActive = false;
	}

	function removeAttributesAndSrcIfAnimationEnd(targetElement, classToRemove) {
		targetElement.classList.remove(classToRemove);
		targetElement.dataset.device = '';
		targetElement.querySelector("video").src = '';
	}

	function getDevice(targetElement) {
		return targetElement.parentNode.dataset.device;
	}

	function getSrc(targetElement) {
		return targetElement.dataset.src;
	}

	function toggleOverlay(overlayElement, classToAdd) {
		overlayElement.classList.toggle(classToAdd);
	}

	buttons.map(button => button.addEventListener('click', function() { 
		insertDatasInAnimateDevice(animateDevice, getDevice(this), getSrc(this));
		toggleOverlay(overlay, 'active');
	}))

	overlay.addEventListener('click', function() {
		// RemoveDatasInAnimateDevice(animateDevice);
		desactivateAnimation(animateDevice);
		toggleOverlay(this, 'active');
	})

	animateDevice.addEventListener('animationend', function() {
		if (!isActive) {
			removeAttributesAndSrcIfAnimationEnd(this, this.dataset.device)
		}
	})

})