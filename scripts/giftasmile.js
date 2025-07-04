// Gift a Smile Page JavaScript

// Global variables
let selectedAmount = 0;
let selectedDesign = null;
let donorData = {
	name: "",
	email: "",
	phone: "",
	amount: 0,
};

// Social media post templates
const postTemplates = {
	1: {
		text: "I Just Gifted a Smile!\n\nJust donated to @cryindia to help children in need. Every small act of kindness counts! 💝\n\n#GiftASmile #CRYIndia #ChildrenFirst #MakeADifference",
		hashtags: "#GiftASmile #CRYIndia #ChildrenFirst #MakeADifference",
	},
	2: {
		text: "Spreading Joy Today!\n\nProud to support @cryindia in their mission to protect children's rights. Together we can create change! 🌟\n\n#SpreadJoy #CRYIndia #ChildRights #DonateForACause",
		hashtags: "#SpreadJoy #CRYIndia #ChildRights #DonateForACause",
	},
	3: {
		text: "Brightening Lives!\n\nEvery child deserves happiness! Just donated to @cryindia to help make that possible. Join me! ☀️\n\n#BrightenLives #CRYIndia #HappyChildren #GiveBack",
		hashtags: "#BrightenLives #CRYIndia #HappyChildren #GiveBack",
	},
};

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
	initializeAmountButtons();
	initializeCustomAmount();
	updateDonorWallStats();
	setInterval(updateDonorWallStats, 30000); // Update stats every 30 seconds

	// Mobile-specific optimizations
	if (window.innerWidth <= 768) {
		initializeMobileOptimizations();
	}
});

// Mobile optimizations
function initializeMobileOptimizations() {
	// Disable video on mobile for better performance
	const video = document.querySelector(".video-background video");
	if (video) {
		video.style.display = "none";
	}

	// Add touch-friendly classes
	document.body.classList.add("mobile-device");

	// Improve form focus on mobile
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.addEventListener("focus", function () {
			// Scroll input into view on mobile
			setTimeout(() => {
				this.scrollIntoView({ behavior: "smooth", block: "center" });
			}, 300);
		});
	});

	// Optimize modal positioning on mobile
	const modal = document.getElementById("thankYouModal");
	if (modal) {
		modal.addEventListener("show", function () {
			document.body.style.overflow = "hidden";
		});

		modal.addEventListener("hide", function () {
			document.body.style.overflow = "auto";
		});
	}

	// Add haptic feedback for buttons (if supported)
	if ("vibrate" in navigator) {
		const buttons = document.querySelectorAll("button");
		buttons.forEach((button) => {
			button.addEventListener("click", function () {
				navigator.vibrate(50); // Short vibration on button press
			});
		});
	}
}

// Amount button functionality
function initializeAmountButtons() {
	const amountButtons = document.querySelectorAll(".amount-btn");

	amountButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove selected class from all buttons
			amountButtons.forEach((btn) => btn.classList.remove("selected"));

			// Add selected class to clicked button
			this.classList.add("selected");

			// Set selected amount
			selectedAmount = parseInt(this.dataset.amount);

			// Clear custom amount input
			document.getElementById("customAmount").value = "";
		});
	});
}

// Custom amount functionality
function initializeCustomAmount() {
	const customAmountInput = document.getElementById("customAmount");

	customAmountInput.addEventListener("input", function () {
		if (this.value) {
			// Remove selected class from amount buttons
			document.querySelectorAll(".amount-btn").forEach((btn) => {
				btn.classList.remove("selected");
			});

			selectedAmount = parseInt(this.value) || 0;
		}
	});
}

// Process donation
function processDonation() {
	const donorName = document.getElementById("donorName").value.trim();
	const donorEmail = document.getElementById("donorEmail").value.trim();
	const donorPhone = document.getElementById("donorPhone").value.trim();
	const customAmount = document.getElementById("customAmount").value;

	// Validation
	if (!donorName || !donorEmail || !donorPhone) {
		alert("Please fill in all your details.");
		return;
	}

	if (!selectedAmount && !customAmount) {
		alert("Please select or enter a donation amount.");
		return;
	}

	if (selectedAmount < 100 && customAmount < 100) {
		alert("Minimum donation amount is ₹100.");
		return;
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(donorEmail)) {
		alert("Please enter a valid email address.");
		return;
	}

	// Phone validation (basic)
	const phoneRegex = /^[0-9]{10}$/;
	if (!phoneRegex.test(donorPhone.replace(/\s/g, ""))) {
		alert("Please enter a valid 10-digit phone number.");
		return;
	}

	// Set final amount
	const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

	// Store donor data
	donorData = {
		name: donorName,
		email: donorEmail,
		phone: donorPhone,
		amount: finalAmount,
	};

	// Simulate donation processing
	const donateBtn = document.querySelector(".donate-btn");
	const originalText = donateBtn.innerHTML;

	donateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
	donateBtn.disabled = true;

	setTimeout(() => {
		donateBtn.innerHTML = originalText;
		donateBtn.disabled = false;

		// Show thank you modal
		showThankYouModal(finalAmount);

		// Add to donor wall
		addToDonorWall(donorName, finalAmount);

		// Reset form
		resetDonationForm();
	}, 2000);
}

// Show thank you modal
function showThankYouModal(amount) {
	const modal = document.getElementById("thankYouModal");
	const donationAmountSpan = document.getElementById("donationAmount");

	donationAmountSpan.textContent = `₹${amount.toLocaleString()}`;
	modal.style.display = "flex";
}

// Close thank you modal
function closeThankYouModal() {
	document.getElementById("thankYouModal").style.display = "none";
}

// Show social buttons from modal
function showSocialButtons() {
	closeThankYouModal();
	document.getElementById("socialButtons").style.display = "block";
	document
		.getElementById("socialButtons")
		.scrollIntoView({ behavior: "smooth" });
}

// Select design functionality
function selectDesign(designNumber) {
	// Remove selected class from all design cards
	document.querySelectorAll(".design-card").forEach((card) => {
		card.classList.remove("selected");
	});

	// Add selected class to chosen design
	document
		.querySelector(`[data-design="${designNumber}"]`)
		.classList.add("selected");

	selectedDesign = designNumber;

	// Show social buttons
	document.getElementById("socialButtons").style.display = "block";
}

// Social media sharing functions
function shareOnInstagram() {
	if (!selectedDesign) {
		showMobileAlert("Please select a design first!");
		return;
	}

	const template = postTemplates[selectedDesign];
	const text = template.text.replace("@cryindia", "@cry_india");

	// Instagram doesn't support direct text sharing, so we'll copy to clipboard
	copyToClipboard(text);

	// Better mobile experience
	if (isMobileDevice()) {
		showMobileAlert("Post text copied! Opening Instagram app...");
		// Try to open Instagram app first, fallback to web
		setTimeout(() => {
			window.open("instagram://", "_blank");
			setTimeout(() => {
				window.open("https://www.instagram.com/", "_blank");
			}, 1000);
		}, 500);
	} else {
		alert(
			"Post text copied to clipboard! You can now paste it when creating your Instagram post."
		);
		window.open("https://www.instagram.com/", "_blank");
	}
}

function shareOnFacebook() {
	if (!selectedDesign) {
		showMobileAlert("Please select a design first!");
		return;
	}

	const template = postTemplates[selectedDesign];
	const url = encodeURIComponent("https://www.cry.org/");
	const text = encodeURIComponent(template.text);

	if (isMobileDevice()) {
		// Try to open Facebook app first, fallback to web
		window.open(
			`fb://facewebmodal/f?href=https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
			"_blank"
		);
		setTimeout(() => {
			window.open(
				`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
				"_blank"
			);
		}, 1000);
	} else {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
			"_blank"
		);
	}
}

function shareOnTwitter() {
	if (!selectedDesign) {
		showMobileAlert("Please select a design first!");
		return;
	}

	const template = postTemplates[selectedDesign];
	const text = encodeURIComponent(template.text + "\n\nhttps://www.cry.org/");

	if (isMobileDevice()) {
		// Try to open Twitter app first, fallback to web
		window.open(`twitter://post?message=${text}`, "_blank");
		setTimeout(() => {
			window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
		}, 1000);
	} else {
		window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
	}
}

function shareOnLinkedIn() {
	if (!selectedDesign) {
		showMobileAlert("Please select a design first!");
		return;
	}

	const template = postTemplates[selectedDesign];
	const url = encodeURIComponent("https://www.cry.org/");
	const text = encodeURIComponent(template.text);

	window.open(
		`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
		"_blank"
	);
}

function shareOnWhatsApp() {
	if (!selectedDesign) {
		showMobileAlert("Please select a design first!");
		return;
	}

	const template = postTemplates[selectedDesign];
	const text = encodeURIComponent(template.text + "\n\nhttps://www.cry.org/");

	if (isMobileDevice()) {
		// Open WhatsApp app directly on mobile
		window.open(`whatsapp://send?text=${text}`, "_blank");
		setTimeout(() => {
			window.open(`https://wa.me/?text=${text}`, "_blank");
		}, 1000);
	} else {
		window.open(`https://wa.me/?text=${text}`, "_blank");
	}
}

// Mobile utility functions
function isMobileDevice() {
	return (
		window.innerWidth <= 768 ||
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	);
}

function showMobileAlert(message) {
	if (isMobileDevice()) {
		// Create a more mobile-friendly alert
		const alertDiv = document.createElement("div");
		alertDiv.className = "mobile-alert";
		alertDiv.innerHTML = `
            <div class="mobile-alert-content">
                <i class="fas fa-info-circle"></i>
                <p>${message}</p>
                <button onclick="closeMobileAlert()" class="mobile-alert-btn">OK</button>
            </div>
        `;

		document.body.appendChild(alertDiv);

		// Auto-close after 3 seconds
		setTimeout(() => {
			closeMobileAlert();
		}, 3000);
	} else {
		alert(message);
	}
}

function closeMobileAlert() {
	const alertDiv = document.querySelector(".mobile-alert");
	if (alertDiv) {
		alertDiv.remove();
	}
}

// Enhanced copy to clipboard for mobile
function copyToClipboard(text) {
	if (navigator.clipboard && window.isSecureContext) {
		// Use modern clipboard API
		navigator.clipboard
			.writeText(text)
			.then(() => {
				if (isMobileDevice()) {
					showMobileAlert("Text copied to clipboard!");
				}
			})
			.catch(() => {
				fallbackCopyToClipboard(text);
			});
	} else {
		fallbackCopyToClipboard(text);
	}
}

function fallbackCopyToClipboard(text) {
	// Fallback for older browsers or non-secure contexts
	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.style.position = "fixed";
	textArea.style.left = "-999999px";
	textArea.style.top = "-999999px";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		document.execCommand("copy");
		if (isMobileDevice()) {
			showMobileAlert("Text copied to clipboard!");
		}
	} catch (err) {
		console.error("Failed to copy text: ", err);
		if (isMobileDevice()) {
			showMobileAlert("Copy failed. Please copy manually.");
		}
	}

	document.body.removeChild(textArea);
}

// Add to donor wall
function addToDonorWall(name, amount) {
	const donorWall = document.getElementById("donorWall");
	const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
		name
	)}&background=${getRandomColor()}&color=fff&size=60`;

	const donorCard = document.createElement("div");
	donorCard.className = "donor-card";
	donorCard.style.animation = "slideInFromBottom 0.5s ease";

	donorCard.innerHTML = `
        <div class="donor-avatar">
            <img src="${avatarUrl}" alt="${name}">
        </div>
        <div class="donor-info">
            <h4>${name}</h4>
            <p class="donation-amount">₹${amount.toLocaleString()}</p>
            <p class="donation-time">Just now</p>
        </div>
        <div class="donor-message">
            <i class="fas fa-quote-left"></i>
            <p>"${getRandomMessage()}"</p>
        </div>
    `;

	// Add to beginning of donor wall
	donorWall.insertBefore(donorCard, donorWall.firstChild);

	// Limit to 8 donor cards
	const donorCards = donorWall.querySelectorAll(".donor-card");
	if (donorCards.length > 8) {
		donorWall.removeChild(donorCards[donorCards.length - 1]);
	}
}

// Helper functions
function getRandomColor() {
	const colors = [
		"ff6b6b",
		"4ecdc4",
		"45b7d1",
		"f7b731",
		"5f27cd",
		"ff9ff3",
		"54a0ff",
		"5f27cd",
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomMessage() {
	const messages = [
		"Happy to contribute to such a noble cause!",
		"Every child deserves a bright future!",
		"Spreading smiles one donation at a time!",
		"Making a difference together!",
		"Proud to support children's rights!",
		"Small acts, big impact!",
		"Together we can create change!",
		"Grateful to help children in need!",
	];
	return messages[Math.floor(Math.random() * messages.length)];
}

// Update donor wall stats
function updateDonorWallStats() {
	const totalDonorsEl = document.getElementById("totalDonors");
	const totalAmountEl = document.getElementById("totalAmount");
	const smilesGiftedEl = document.getElementById("smilesGifted");

	// Simulate live updates (in real app, this would come from server)
	const currentDonors = parseInt(totalDonorsEl.textContent);
	const currentAmount = parseInt(
		totalAmountEl.textContent.replace(/[₹,]/g, "")
	);
	const currentSmiles = parseInt(smilesGiftedEl.textContent);

	// Random small increments
	if (Math.random() > 0.7) {
		totalDonorsEl.textContent = currentDonors + 1;
		totalAmountEl.textContent = `₹${(
			currentAmount +
			Math.floor(Math.random() * 2000) +
			500
		).toLocaleString()}`;
		smilesGiftedEl.textContent =
			currentSmiles + Math.floor(Math.random() * 3) + 1;
	}
}

// Reset donation form
function resetDonationForm() {
	document.getElementById("donorName").value = "";
	document.getElementById("donorEmail").value = "";
	document.getElementById("donorPhone").value = "";
	document.getElementById("customAmount").value = "";

	document.querySelectorAll(".amount-btn").forEach((btn) => {
		btn.classList.remove("selected");
	});

	selectedAmount = 0;
}

// Add CSS animation for new donor cards
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInFromBottom {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.onclick = function (event) {
	const modal = document.getElementById("thankYouModal");
	if (event.target === modal) {
		closeThankYouModal();
	}
};
