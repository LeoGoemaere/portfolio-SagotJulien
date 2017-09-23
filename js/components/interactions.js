window.addEventListener('DOMContentLoaded', () => {

	const buttons = Array.from(document.querySelectorAll('.js-cta'));
	const animateDevice = document.querySelector('.animate-device');
	const wrapperVideos = document.querySelector('.videos');
	const videos = Array.from(wrapperVideos.querySelectorAll('video'));
	const overlay  = document.querySelector('.overlay');
	const breakpoint = 768;
	let isActive = false;

	let formats = [
		"mp4",
		"webm"
	]

	function insertDatasInAnimateDevice(animateDevice, videosContainer, deviceType, videoName) {
		let chosenVideo = videosContainer.querySelector(`.js-${videoName}`);
		let animateVideo = animateDevice.querySelector('video');
		animateDevice.classList.add(deviceType);
		animateDevice.classList.add('activated');
		animateDevice.classList.remove('desactivated');
		animateDevice.dataset.device = deviceType;

		animateVideo.src = chosenVideo.dataset.src;
		animateVideo.play();	// When datas are insert we play the video
		isActive = true;
	}

	// function insertDatasInAnimateDevice(animateDevice, videosContainer, deviceType, videoName) {
	// 	let chosenVideo = videosContainer.querySelector(`.js-${videoName}`);
	// 	let animateVideo = animateDevice.querySelector('video');
	// 	let animateDeviceSourcesVideos = animateDevice.querySelectorAll('source');
	// 	console.log(animateDeviceSourcesVideos);
	// 	for (let i = 0; i < animateDeviceSourcesVideos.length; i++) {
	// 		animateDeviceSourcesVideos[i].src = `${chosenVideo.dataset.src}.${formats[i]}`;
	// 	}		
	// 	animateDevice.classList.add(deviceType);
	// 	animateDevice.classList.add('activated');
	// 	animateDevice.classList.remove('desactivated');
	// 	animateDevice.dataset.device = deviceType;
	// 	animateVideo.play();	// When datas are insert we play the video
	// 	isActive = true;
	// }

	function redirectToUrlVideo(videosContainer, videoName, sitePageName) {
		let chosenVideo = videosContainer.querySelector(`.js-${videoName}`);
		let pageName = new RegExp(`${sitePageName}.html`, 'g');
		let newSrc = window.location.href.replace(pageName, '');
		window.location.href = `${newSrc}${chosenVideo.dataset.src}`;
	}

	function desactivateAnimation(animateDevice) {
		animateDevice.classList.add('desactivated');
		animateDevice.classList.remove('activated');
		isActive = false;
	}

	function removeAttributesIfAnimationEnd(targetElement, classToRemove) {
		let animateVideo = targetElement.querySelector("video");
		animateVideo.src = '';
		targetElement.classList.remove(classToRemove);
		targetElement.dataset.device = '';
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
			insertDatasInAnimateDevice(animateDevice, wrapperVideos, getDevice(this), getVideoName(this));
			playAnimationOverlay(overlay, 'off', 'active', 'inactive');
		} else {
			redirectToUrlVideo(wrapperVideos, getVideoName(this), 'index-lazy');
		}
	}))

	videos.map(video => video.addEventListener('pause', function() { 
		this.classList.remove('active');
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