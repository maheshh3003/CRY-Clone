// CRY Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
	// Loading Screen
	const loadingScreen = document.querySelector(".loading-wrapper");

	// Hide loading screen after page loads
	window.addEventListener("load", function () {
		setTimeout(() => {
			loadingScreen.classList.add("hidden");
			setTimeout(() => {
				loadingScreen.style.display = "none";

				// Show education popup after loading screen disappears
				// Show popup on every page load/refresh
				setTimeout(() => {
					showEducationPopup();
				}, 1000); // Show popup 1 second after loading screen disappears
			}, 500);
		}, 2000); // Show loading for 2 seconds
	});

	// Mobile Menu Toggle
	const menuBtn = document.querySelector(".menu-btn");
	const navWrapper = document.querySelector(".nav-wrapper");

	if (menuBtn) {
		menuBtn.addEventListener("click", function () {
			navWrapper.classList.toggle("active");
			menuBtn.classList.toggle("active");
		});
	}

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	// Counter Animation
	function animateCounters() {
		const counters = document.querySelectorAll(".counter");

		counters.forEach((counter) => {
			const target = parseInt(counter.getAttribute("data-target"));
			const duration = 2000; // 2 seconds
			const increment = target / (duration / 16); // 60fps
			let current = 0;

			const timer = setInterval(() => {
				current += increment;
				if (current >= target) {
					current = target;
					clearInterval(timer);
				}

				// Format numbers with commas for large numbers
				if (target > 1000) {
					counter.textContent = Math.floor(current).toLocaleString();
				} else {
					counter.textContent = Math.floor(current);
				}
			}, 16);
		});
	}

	// Intersection Observer for animations
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	// Counter animation observer
	const counterObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateCounters();
				counterObserver.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe stats section
	const statsSection = document.querySelector(".impact-stats");
	if (statsSection) {
		counterObserver.observe(statsSection);
	}

	// Animate sections on scroll
	const animateObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animate-section");
			}
		});
	}, observerOptions);

	// Observe elements to animate
	const elementsToAnimate = document.querySelectorAll(
		".donate-card, .approach-icon-item, .stats-item"
	);
	elementsToAnimate.forEach((el) => {
		animateObserver.observe(el);
	});

	// Header scroll effect
	let lastScrollTop = 0;
	const header = document.querySelector("header");

	window.addEventListener("scroll", function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollTop > lastScrollTop && scrollTop > 100) {
			// Scrolling down
			header.style.transform = "translateY(-100%)";
		} else {
			// Scrolling up
			header.style.transform = "translateY(0)";
		}

		lastScrollTop = scrollTop;
	});

	// Parallax effect for hero video
	const heroVideo = document.querySelector(".hero-video-wrapper video");
	if (heroVideo) {
		window.addEventListener("scroll", function () {
			const scrolled = window.pageYOffset;
			const parallax = scrolled * 0.5;
			heroVideo.style.transform = `translate3d(0, ${parallax}px, 0)`;
		});
	}

	// Approach circle interactions
	const approachItems = document.querySelectorAll(".approach-circle-item");
	approachItems.forEach((item) => {
		const modal = item.querySelector(".approach-circle-modal");

		item.addEventListener("mouseenter", function () {
			// Hide all other modals
			approachItems.forEach((otherItem) => {
				if (otherItem !== item) {
					const otherModal = otherItem.querySelector(".approach-circle-modal");
					otherModal.style.opacity = "0";
					otherModal.style.visibility = "hidden";
				}
			});
		});
	});

	// Video autoplay management
	const videos = document.querySelectorAll("video");
	videos.forEach((video) => {
		video.muted = true; // Ensure videos are muted for autoplay
		video.play().catch((e) => {
			console.log("Video autoplay prevented:", e);
		});
	});

	// Search functionality
	const searchInput = document.querySelector(".nav-search-wrapper input");
	const searchIcon = document.querySelector(".nav-search-wrapper i");

	if (searchInput && searchIcon) {
		searchIcon.addEventListener("click", function () {
			const query = searchInput.value.trim();
			if (query) {
				// Implement search functionality here
				console.log("Searching for:", query);
			}
		});

		searchInput.addEventListener("keypress", function (e) {
			if (e.key === "Enter") {
				const query = this.value.trim();
				if (query) {
					// Implement search functionality here
					console.log("Searching for:", query);
				}
			}
		});
	}

	// Donation card hover effects
	const donateCards = document.querySelectorAll(".donate-card");
	donateCards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-10px) scale(1.02)";
		});

		card.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0) scale(1)";
		});
	});

	// Social media links
	const socialLinks = document.querySelectorAll(
		".social-links a, .social-icons a"
	);
	socialLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			// Add analytics tracking here if needed
			console.log("Social link clicked:", this.href);
		});
	});

	// Lazy loading for images
	const images = document.querySelectorAll("img[data-src]");
	const imageObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.removeAttribute("data-src");
				imageObserver.unobserve(img);
			}
		});
	});

	images.forEach((img) => {
		imageObserver.observe(img);
	});

	// Performance optimization: Debounce scroll events
	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	// Apply debouncing to scroll-heavy operations
	const debouncedScrollHandler = debounce(function () {
		// Any additional scroll-based functionality can go here
	}, 10);

	window.addEventListener("scroll", debouncedScrollHandler);

	// Add loading states for buttons
	const buttons = document.querySelectorAll(".btn");
	buttons.forEach((button) => {
		button.addEventListener("click", function (e) {
			// Add loading state if it's a form submission or AJAX call
			if (this.dataset.loading !== "false") {
				const originalText = this.innerHTML;
				this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Loading...';
				this.disabled = true;

				// Simulate loading (remove this in production)
				setTimeout(() => {
					this.innerHTML = originalText;
					this.disabled = false;
				}, 2000);
			}
		});
	});

	// Education Popup Functions
	window.showEducationPopup = function () {
		const popup = document.getElementById("education-popup");
		if (popup) {
			popup.classList.add("show");
			document.body.style.overflow = "hidden"; // Prevent background scrolling
		}
	};

	window.closeEducationPopup = function () {
		const popup = document.getElementById("education-popup");
		if (popup) {
			popup.classList.remove("show");
			document.body.style.overflow = ""; // Restore scrolling
		}
	};

	// Close popup when clicking outside the modal
	document.addEventListener("click", function (e) {
		const popup = document.getElementById("education-popup");
		const modal = document.querySelector(".popup-modal");

		if (popup && e.target === popup && !modal.contains(e.target)) {
			closeEducationPopup();
		}
	});

	// Close popup with Escape key
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") {
			closeEducationPopup();
		}
	});

	// Add event listener for popup close button
	const closeButton = document.querySelector(".popup-close");
	if (closeButton) {
		closeButton.addEventListener("click", function () {
			closeEducationPopup();
		});
	}

	// Initialize tooltips or other UI components
	console.log("CRY Website loaded successfully!");
});
