// Adopt a Project JavaScript Functionality

// Global variables
let selectedSponsorshipData = {};

// DOM loaded event
document.addEventListener("DOMContentLoaded", function () {
	initializeAdoptProject();
});

// Initialize the page
function initializeAdoptProject() {
	setupEventListeners();
	setupScrollEffects();
	animateStats();
}

// Setup event listeners
function setupEventListeners() {
	// Duration button click events
	const durationButtons = document.querySelectorAll(".duration-btn");
	durationButtons.forEach((button) => {
		button.addEventListener("click", handleDurationClick);
	});

	// Form submission
	const sponsorshipForm = document.getElementById("sponsorship-form");
	if (sponsorshipForm) {
		sponsorshipForm.addEventListener("submit", handleFormSubmission);
	}

	// Modal close events
	const modals = document.querySelectorAll(".modal-overlay");
	modals.forEach((modal) => {
		modal.addEventListener("click", function (e) {
			if (e.target === modal) {
				closeAllModals();
			}
		});
	});

	// Smooth scrolling for internal links
	const internalLinks = document.querySelectorAll('a[href^="#"]');
	internalLinks.forEach((link) => {
		link.addEventListener("click", handleSmoothScroll);
	});
}

// Handle duration button clicks
function handleDurationClick(e) {
	const button = e.currentTarget;
	const childName = button.getAttribute("data-child");
	const duration = button.getAttribute("data-duration");
	const amount = button.getAttribute("data-amount");

	// Store sponsorship data
	selectedSponsorshipData = {
		child: childName,
		duration: duration,
		amount: amount,
		monthlyRate: 300,
	};

	// Open payment modal
	openPaymentModal();
}

// Open payment modal
function openPaymentModal() {
	const modal = document.getElementById("payment-modal");
	const childName = selectedSponsorshipData.child;

	// Get child data
	const childData = getChildData(childName);

	// Populate modal with child information
	populateModalData(childData);

	// Show modal with animation
	modal.classList.add("active");
	document.body.style.overflow = "hidden";

	// Add entrance animation
	const modalContent = modal.querySelector(".modal-content");
	modalContent.style.transform = "translateY(-20px) scale(0.95)";
	modalContent.style.opacity = "0";

	setTimeout(() => {
		modalContent.style.transform = "translateY(0) scale(1)";
		modalContent.style.opacity = "1";
	}, 10);
}

// Get child data based on name
function getChildData(childName) {
	const childrenData = {
		priya: {
			name: "Priya",
			age: "8 years old",
			location: "Mumbai, Maharashtra",
			image:
				"https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		},
		arjun: {
			name: "Arjun",
			age: "10 years old",
			location: "Delhi, NCR",
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
		},
	};

	return childrenData[childName] || childrenData["priya"];
}

// Populate modal with child and sponsorship data
function populateModalData(childData) {
	// Child information
	document.getElementById("modal-child-name").textContent = childData.name;
	document.getElementById("modal-child-location").textContent =
		childData.location;
	document.getElementById("modal-child-image").src = childData.image;
	document.getElementById(
		"modal-child-image"
	).alt = `${childData.name} - ${childData.age}`;

	// Sponsorship details
	const duration = selectedSponsorshipData.duration;
	let durationText = "";

	switch (duration) {
		case "1":
			durationText = "1 Month";
			break;
		case "3":
			durationText = "3 Months";
			break;
		case "6":
			durationText = "6 Months";
			break;
		case "12":
			durationText = "1 Year";
			break;
		case "lifetime":
			durationText = "Lifetime Sponsorship";
			break;
		default:
			durationText = "1 Month";
	}

	document.getElementById("modal-duration").textContent = durationText;
	document.getElementById(
		"modal-amount"
	).textContent = `$${selectedSponsorshipData.amount}`;
}

// Handle form submission
function handleFormSubmission(e) {
	e.preventDefault();

	// Get form data
	const formData = new FormData(e.target);
	const sponsorData = {
		name: formData.get("sponsor-name"),
		email: formData.get("sponsor-email"),
		phone: formData.get("sponsor-phone"),
		upiHandle: formData.get("upi-handle"),
	};

	// Validate form data
	if (!validateFormData(sponsorData)) {
		return;
	}

	// Show loading state
	const submitButton = e.target.querySelector('button[type="submit"]');
	const originalText = submitButton.innerHTML;
	submitButton.innerHTML =
		'<i class="fas fa-spinner fa-spin"></i> Processing...';
	submitButton.disabled = true;

	// Simulate payment processing
	setTimeout(() => {
		// Reset button
		submitButton.innerHTML = originalText;
		submitButton.disabled = false;

		// Close payment modal and show success
		closePaymentModal();
		showSuccessModal();

		// Store sponsorship data (in real app, this would be sent to server)
		storeSponsorshipData(sponsorData);
	}, 2000);
}

// Validate form data
function validateFormData(data) {
	const errors = [];

	if (!data.name || data.name.trim().length < 2) {
		errors.push("Please enter a valid full name");
	}

	if (!data.email || !isValidEmail(data.email)) {
		errors.push("Please enter a valid email address");
	}

	if (!data.phone || data.phone.trim().length < 10) {
		errors.push("Please enter a valid phone number");
	}

	if (!data.upiHandle || !isValidUPI(data.upiHandle)) {
		errors.push("Please enter a valid UPI handle");
	}

	if (errors.length > 0) {
		alert("Please fix the following errors:\n\n" + errors.join("\n"));
		return false;
	}

	return true;
}

// Email validation
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// UPI validation
function isValidUPI(upi) {
	const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
	return upiRegex.test(upi);
}

// Show success modal
function showSuccessModal() {
	const modal = document.getElementById("success-modal");
	const childName = getChildData(selectedSponsorshipData.child).name;

	// Update child name in success message
	document.getElementById("success-child-name").textContent = childName;

	// Show modal
	modal.classList.add("active");

	// Add confetti effect (optional)
	createConfettiEffect();
}

// Create confetti effect
function createConfettiEffect() {
	// Simple confetti effect - you can enhance this
	const colors = ["#f6910e", "#54c06a", "#00a0d2", "#ec4899"];
	const confettiCount = 50;

	for (let i = 0; i < confettiCount; i++) {
		createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
	}
}

// Create individual confetti piece
function createConfettiPiece(color) {
	const confetti = document.createElement("div");
	confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: 10px;
        height: 10px;
        background: ${color};
        z-index: 9999;
        pointer-events: none;
        transform: rotate(${Math.random() * 360}deg);
    `;

	document.body.appendChild(confetti);

	// Animate confetti
	const animation = confetti.animate(
		[
			{ transform: `translateY(0) rotate(0deg)`, opacity: 1 },
			{
				transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
				opacity: 0,
			},
		],
		{
			duration: 3000 + Math.random() * 2000,
			easing: "cubic-bezier(0.5, 0, 0.5, 1)",
		}
	);

	animation.onfinish = () => confetti.remove();
}

// Store sponsorship data
function storeSponsorshipData(sponsorData) {
	const sponsorshipRecord = {
		id: generateUniqueId(),
		sponsor: sponsorData,
		child: selectedSponsorshipData,
		timestamp: new Date().toISOString(),
		status: "active",
	};

	// In a real application, this would be sent to a server
	console.log("Sponsorship recorded:", sponsorshipRecord);

	// Store in localStorage for demo purposes
	const existingSponsorships = JSON.parse(
		localStorage.getItem("sponsorships") || "[]"
	);
	existingSponsorships.push(sponsorshipRecord);
	localStorage.setItem("sponsorships", JSON.stringify(existingSponsorships));
}

// Generate unique ID
function generateUniqueId() {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Close payment modal
function closePaymentModal() {
	const modal = document.getElementById("payment-modal");
	modal.classList.remove("active");
	document.body.style.overflow = "";

	// Reset form
	const form = document.getElementById("sponsorship-form");
	if (form) {
		form.reset();
	}
}

// Close success modal
function closeSuccessModal() {
	const modal = document.getElementById("success-modal");
	modal.classList.remove("active");
	document.body.style.overflow = "";
}

// Close all modals
function closeAllModals() {
	const modals = document.querySelectorAll(".modal-overlay");
	modals.forEach((modal) => {
		modal.classList.remove("active");
	});
	document.body.style.overflow = "";
}

// Setup scroll effects
function setupScrollEffects() {
	// Header scroll effect
	let lastScrollTop = 0;
	const header = document.querySelector("header");

	window.addEventListener("scroll", () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollTop > 100) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}

		lastScrollTop = scrollTop;
	});

	// Intersection Observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animate-in");
			}
		});
	}, observerOptions);

	// Observe story cards
	const storyCards = document.querySelectorAll(".story-card");
	storyCards.forEach((card) => {
		observer.observe(card);
	});

	// Observe benefit cards
	const benefitCards = document.querySelectorAll(".benefit-card");
	benefitCards.forEach((card) => {
		observer.observe(card);
	});
}

// Animate statistics
function animateStats() {
	const statNumbers = document.querySelectorAll(".stat-number");

	const animateNumber = (element, target) => {
		const increment = target / 100;
		let current = 0;

		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				current = target;
				clearInterval(timer);
			}

			// Format number with commas
			element.textContent = Math.floor(current).toLocaleString() + "+";
		}, 20);
	};

	// Trigger animation when stats section is visible
	const statsSection = document.querySelector(".impact-stats");
	const statsObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				statNumbers.forEach((stat) => {
					const text = stat.textContent;
					const number = parseInt(text.replace(/[^\d]/g, ""));
					animateNumber(stat, number);
				});
				statsObserver.unobserve(entry.target);
			}
		});
	});

	if (statsSection) {
		statsObserver.observe(statsSection);
	}
}

// Handle smooth scrolling
function handleSmoothScroll(e) {
	e.preventDefault();
	const targetId = e.currentTarget.getAttribute("href");
	const targetElement = document.querySelector(targetId);

	if (targetElement) {
		const headerHeight = document.querySelector("header").offsetHeight;
		const targetPosition = targetElement.offsetTop - headerHeight - 20;

		window.scrollTo({
			top: targetPosition,
			behavior: "smooth",
		});
	}
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		closeAllModals();
	}
});

// Window resize handler
window.addEventListener("resize", function () {
	// Handle any responsive adjustments if needed
	if (window.innerWidth <= 768) {
		// Mobile specific adjustments
		const modals = document.querySelectorAll(".modal-content");
		modals.forEach((modal) => {
			modal.style.margin = "1rem";
		});
	}
});

// Utility functions
const utils = {
	// Debounce function
	debounce: function (func, wait, immediate) {
		let timeout;
		return function executedFunction() {
			const context = this;
			const args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},

	// Format currency
	formatCurrency: function (amount) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	},

	// Show notification
	showNotification: function (message, type = "info") {
		// Create notification element
		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.textContent = message;

		// Style notification
		notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
							type === "success"
								? "#54c06a"
								: type === "error"
								? "#ef4444"
								: "#f6910e"
						};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

		document.body.appendChild(notification);

		// Animate in
		setTimeout(() => {
			notification.style.transform = "translateX(0)";
		}, 10);

		// Remove after delay
		setTimeout(() => {
			notification.style.transform = "translateX(100%)";
			setTimeout(() => {
				notification.remove();
			}, 300);
		}, 4000);
	},
};

// Export functions for potential external use
window.adoptProjectFunctions = {
	openPaymentModal,
	closePaymentModal,
	closeSuccessModal,
	closeAllModals,
	utils,
};
