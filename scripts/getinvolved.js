// Get Involved Page JavaScript

// Supabase Configuration
const SUPABASE_URL = "https://gkwksufqgkoxpgftirae.supabase.co";
const SUPABASE_ANON_KEY =
	"api_key_removed";

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
	// Initialize all functionality
	initTestimonialSlider();
	initProgramApplications();
	initVolunteerForm();
	initAnimations();
	initMobileMenu();
	initScrollEffects();
	initParallaxEffect();
});

// Testimonial Slider Functionality
let currentTestimonialIndex = 0;
let testimonialSlider = null;
let testimonialDots = null;
let testimonialCards = null;

function initTestimonialSlider() {
	// Get elements after DOM is loaded
	testimonialCards = document.querySelectorAll(".testimonial-card");
	testimonialDots = document.querySelectorAll(".dot");

	if (testimonialCards.length === 0) return;

	// Show first testimonial by default
	showTestimonial(0);

	// Auto-slide every 8 seconds
	testimonialSlider = setInterval(() => {
		changeTestimonial(1);
	}, 8000);
}

function showTestimonial(index) {
	if (!testimonialCards || testimonialCards.length === 0) return;

	// Hide all testimonials
	testimonialCards.forEach((testimonial) => {
		testimonial.classList.remove("active");
	});

	// Update dots
	if (testimonialDots) {
		testimonialDots.forEach((dot) => {
			dot.classList.remove("active");
		});
	}

	// Show current testimonial
	if (testimonialCards[index]) {
		testimonialCards[index].classList.add("active");
		if (testimonialDots && testimonialDots[index]) {
			testimonialDots[index].classList.add("active");
		}
	}

	currentTestimonialIndex = index;
}

function changeTestimonial(direction) {
	if (!testimonialCards || testimonialCards.length === 0) return;

	let newIndex = currentTestimonialIndex + direction;

	if (newIndex >= testimonialCards.length) {
		newIndex = 0;
	} else if (newIndex < 0) {
		newIndex = testimonialCards.length - 1;
	}

	showTestimonial(newIndex);
}

function goToTestimonial(index) {
	showTestimonial(index - 1);
}

// Program Application Buttons
function initProgramApplications() {
	const applyButtons = document.querySelectorAll(".apply-btn");
	const heroApplyBtn = document.querySelector(
		'.hero-content .btn[href="#volunteer-application"]'
	);

	// Handle program specific apply buttons
	applyButtons.forEach((button) => {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			const program = this.getAttribute("data-program");
			openVolunteerPopup(program);
		});
	});

	// Handle hero apply button
	if (heroApplyBtn) {
		heroApplyBtn.addEventListener("click", function (e) {
			e.preventDefault();
			openVolunteerPopup();
		});
	}
}

// Create and show volunteer application popup
function openVolunteerPopup(preSelectedProgram = null) {
	// Remove existing popup if any
	const existingPopup = document.querySelector(".volunteer-popup");
	if (existingPopup) {
		existingPopup.remove();
	}

	// Create popup HTML
	const popup = document.createElement("div");
	popup.className = "volunteer-popup";
	popup.innerHTML = `
		<div class="volunteer-popup-overlay"></div>
		<div class="volunteer-popup-content">
			<button class="popup-close-btn">
				<i class="fas fa-times"></i>
			</button>
			<div class="popup-header">
				<h2>Volunteer Application</h2>
				<p>Join our community of passionate volunteers and help create a better future for India's children.</p>
			</div>
			<form id="popupVolunteerForm" class="popup-form">
				<div class="form-row">
					<div class="form-group">
						<label for="popupFirstName">First Name *</label>
						<input type="text" id="popupFirstName" name="firstName" required />
					</div>
					<div class="form-group">
						<label for="popupLastName">Last Name *</label>
						<input type="text" id="popupLastName" name="lastName" required />
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="popupEmail">Email Address *</label>
						<input type="email" id="popupEmail" name="email" required />
					</div>
					<div class="form-group">
						<label for="popupPhone">Phone Number *</label>
						<input type="tel" id="popupPhone" name="phone" required />
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="popupCity">City *</label>
						<input type="text" id="popupCity" name="city" required />
					</div>
					<div class="form-group">
						<label for="popupState">State *</label>
						<select id="popupState" name="state" required>
							<option value="">Select State</option>
							<option value="maharashtra">Maharashtra</option>
							<option value="delhi">Delhi</option>
							<option value="karnataka">Karnataka</option>
							<option value="gujarat">Gujarat</option>
							<option value="rajasthan">Rajasthan</option>
							<option value="uttar-pradesh">Uttar Pradesh</option>
							<option value="west-bengal">West Bengal</option>
							<option value="tamil-nadu">Tamil Nadu</option>
							<option value="kerala">Kerala</option>
							<option value="punjab">Punjab</option>
							<option value="haryana">Haryana</option>
							<option value="bihar">Bihar</option>
							<option value="odisha">Odisha</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="popupProgram">Preferred Program *</label>
					<select id="popupProgram" name="program" required>
						<option value="">Select Program</option>
						<option value="onground">Field Volunteering (Onground & Online)</option>
						<option value="hybrid">Hybrid Volunteering (Onground Online Hybrid)</option>
					</select>
				</div>
				<div class="form-group">
					<label for="popupExperience">Previous Volunteering Experience</label>
					<textarea id="popupExperience" name="experience" rows="3" placeholder="Tell us about any previous volunteering experience..."></textarea>
				</div>
				<div class="form-group">
					<label for="popupMotivation">Why do you want to volunteer with CRY? *</label>
					<textarea id="popupMotivation" name="motivation" rows="4" required placeholder="Share your motivation and what you hope to achieve..."></textarea>
				</div>
				<div class="form-group">
					<label for="popupAvailability">Availability *</label>
					<select id="popupAvailability" name="availability" required>
						<option value="">Select Availability</option>
						<option value="weekends">Weekends Only</option>
						<option value="weekdays">Weekdays</option>
						<option value="flexible">Flexible</option>
						<option value="full-time">Full Time</option>
					</select>
				</div>
				<div class="form-group checkbox-group">
					<label class="checkbox-label">
						<input type="checkbox" id="popupTerms" name="terms" required />
						<span class="custom-checkbox"></span>
						<span class="checkbox-text">I agree to CRY's terms and conditions and volunteer guidelines *</span>
					</label>
				</div>
				<div class="form-group checkbox-group">
					<label class="checkbox-label">
						<input type="checkbox" id="popupNewsletter" name="newsletter" />
						<span class="custom-checkbox"></span>
						<span class="checkbox-text">I would like to receive updates about CRY's work and volunteer opportunities</span>
					</label>
				</div>
				<button type="submit" class="btn btn-primary popup-submit-btn">
					<i class="fas fa-paper-plane"></i>
					Submit Application
				</button>
			</form>
		</div>
	`;

	// Add popup to document
	document.body.appendChild(popup);

	// Pre-select program if specified
	if (preSelectedProgram) {
		const programSelect = popup.querySelector("#popupProgram");
		programSelect.value = preSelectedProgram;
	}

	// Add event listeners
	const closeBtn = popup.querySelector(".popup-close-btn");
	const overlay = popup.querySelector(".volunteer-popup-overlay");
	const form = popup.querySelector("#popupVolunteerForm");

	closeBtn.addEventListener("click", closeVolunteerPopup);
	overlay.addEventListener("click", closeVolunteerPopup);
	form.addEventListener("submit", handlePopupFormSubmit);

	// Show popup with animation
	setTimeout(() => {
		popup.classList.add("show");
	}, 10);

	// Initialize form validation for popup
	initPopupFormValidation();
}

function closeVolunteerPopup() {
	const popup = document.querySelector(".volunteer-popup");
	if (popup) {
		popup.classList.remove("show");
		setTimeout(() => {
			popup.remove();
		}, 300);
	}
}

function handlePopupFormSubmit(e) {
	e.preventDefault();

	if (validatePopupForm()) {
		submitPopupForm();
	}
}

function validatePopupForm() {
	const form = document.getElementById("popupVolunteerForm");
	const requiredFields = form.querySelectorAll("[required]");
	let isValid = true;

	requiredFields.forEach((field) => {
		if (!validatePopupField(field)) {
			isValid = false;
		}
	});

	// Validate email format
	const email = document.getElementById("popupEmail");
	if (email.value && !isValidEmail(email.value)) {
		showPopupFieldError(email, "Please enter a valid email address");
		isValid = false;
	}

	// Validate phone format
	const phone = document.getElementById("popupPhone");
	if (phone.value && !isValidPhone(phone.value)) {
		showPopupFieldError(phone, "Please enter a valid phone number");
		isValid = false;
	}

	return isValid;
}

function validatePopupField(field) {
	const value = field.value.trim();

	if (field.hasAttribute("required") && !value) {
		showPopupFieldError(field, "This field is required");
		return false;
	}

	clearPopupFieldError(field);
	return true;
}

function showPopupFieldError(field, message) {
	clearPopupFieldError(field);

	const errorDiv = document.createElement("div");
	errorDiv.className = "field-error";
	errorDiv.textContent = message;
	errorDiv.style.color = "#e74c3c";
	errorDiv.style.fontSize = "0.875rem";
	errorDiv.style.marginTop = "0.5rem";

	field.parentNode.appendChild(errorDiv);
	field.style.borderColor = "#e74c3c";
}

function clearPopupFieldError(field) {
	const errorDiv = field.parentNode.querySelector(".field-error");
	if (errorDiv) {
		errorDiv.remove();
	}
	field.style.borderColor = "";
}

async function submitPopupForm() {
	const submitBtn = document.querySelector(".popup-submit-btn");
	const originalText = submitBtn.innerHTML;

	// Show loading state
	submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
	submitBtn.disabled = true;

	try {
		// Get form data
		const form = document.getElementById("popupVolunteerForm");
		const formData = new FormData(form);

		const volunteerData = {
			first_name: formData.get("firstName"),
			last_name: formData.get("lastName"),
			email: formData.get("email"),
			phone: formData.get("phone"),
			city: formData.get("city"),
			state: formData.get("state"),
			preferred_program: formData.get("program"),
			previous_experience: formData.get("experience") || null,
			motivation: formData.get("motivation"),
			availability: formData.get("availability"),
			agrees_to_terms: formData.get("terms") === "on",
			newsletter_subscription: formData.get("newsletter") === "on",
			application_type: "popup",
			created_at: new Date().toISOString(),
		};

		// Submit to Supabase
		const { data, error } = await supabase
			.from("volunteer_applications")
			.insert([volunteerData]);

		if (error) {
			throw error;
		}

		console.log("Application submitted successfully:", data);
		closeVolunteerPopup();
		showThankYouPopup();
	} catch (error) {
		console.error("Error submitting application:", error);
		alert("There was an error submitting your application. Please try again.");
	} finally {
		// Reset button
		submitBtn.innerHTML = originalText;
		submitBtn.disabled = false;
	}
}

function showThankYouPopup() {
	const popup = document.createElement("div");
	popup.className = "thank-you-popup";
	popup.innerHTML = `
		<div class="thank-you-popup-overlay"></div>
		<div class="thank-you-popup-content">
			<div class="thank-you-icon">
				<i class="fas fa-check-circle"></i>
			</div>
			<h2>Thank You for Applying!</h2>
			<p>Your volunteer application has been submitted successfully. We're excited about your interest in helping children across India.</p>
			<div class="thank-you-details">
				<div class="detail-item">
					<i class="fas fa-clock"></i>
					<span>We'll review your application within 3-5 business days</span>
				</div>
				<div class="detail-item">
					<i class="fas fa-envelope"></i>
					<span>You'll receive a confirmation email shortly</span>
				</div>
				<div class="detail-item">
					<i class="fas fa-phone"></i>
					<span>Our team may contact you for additional information</span>
				</div>
			</div>
			<div class="thank-you-actions">
				<button class="btn btn-primary" onclick="closeThankYouPopup()">
					<i class="fas fa-heart"></i>
					Great! Thank You
				</button>
				<a href="../index.html" class="btn btn-outline">
					<i class="fas fa-home"></i>
					Back to Home
				</a>
			</div>
		</div>
	`;

	document.body.appendChild(popup);

	// Show popup with animation
	setTimeout(() => {
		popup.classList.add("show");
	}, 10);

	// Add click handler for overlay
	const overlay = popup.querySelector(".thank-you-popup-overlay");
	overlay.addEventListener("click", closeThankYouPopup);
}

function closeThankYouPopup() {
	const popup = document.querySelector(".thank-you-popup");
	if (popup) {
		popup.classList.remove("show");
		setTimeout(() => {
			popup.remove();
		}, 300);
	}
}

function initPopupFormValidation() {
	const form = document.getElementById("popupVolunteerForm");
	if (!form) return;

	const inputs = form.querySelectorAll("input, select, textarea");

	inputs.forEach((input) => {
		// Real-time validation
		input.addEventListener("blur", function () {
			validatePopupField(this);
		});

		input.addEventListener("input", function () {
			clearPopupFieldError(this);
		});

		// Auto-format phone number
		if (input.id === "popupPhone") {
			input.addEventListener("input", function () {
				let value = this.value.replace(/\D/g, "");
				if (value.length > 10) {
					value = value.substring(0, 10);
				}
				this.value = value;
			});
		}

		// Capitalize first letter of names
		if (input.id === "popupFirstName" || input.id === "popupLastName") {
			input.addEventListener("input", function () {
				this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
			});
		}
	});
}

// Volunteer Form Handling
function initVolunteerForm() {
	const form = document.getElementById("volunteerForm");

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		if (validateForm()) {
			submitForm();
		}
	});

	// Real-time validation
	const inputs = form.querySelectorAll("input, select, textarea");
	inputs.forEach((input) => {
		input.addEventListener("blur", function () {
			validateField(this);
		});

		input.addEventListener("input", function () {
			clearFieldError(this);
		});
	});
}

function validateForm() {
	const form = document.getElementById("volunteerForm");
	const requiredFields = form.querySelectorAll("[required]");
	let isValid = true;

	requiredFields.forEach((field) => {
		if (!validateField(field)) {
			isValid = false;
		}
	});

	// Validate email format
	const email = document.getElementById("email");
	if (email.value && !isValidEmail(email.value)) {
		showFieldError(email, "Please enter a valid email address");
		isValid = false;
	}

	// Validate phone format
	const phone = document.getElementById("phone");
	if (phone.value && !isValidPhone(phone.value)) {
		showFieldError(phone, "Please enter a valid phone number");
		isValid = false;
	}

	return isValid;
}

function validateField(field) {
	const value = field.value.trim();

	if (field.hasAttribute("required") && !value) {
		showFieldError(field, "This field is required");
		return false;
	}

	clearFieldError(field);
	return true;
}

function showFieldError(field, message) {
	clearFieldError(field);

	const errorDiv = document.createElement("div");
	errorDiv.className = "field-error";
	errorDiv.textContent = message;
	errorDiv.style.color = "#e74c3c";
	errorDiv.style.fontSize = "0.875rem";
	errorDiv.style.marginTop = "0.5rem";

	field.parentNode.appendChild(errorDiv);
	field.style.borderColor = "#e74c3c";
}

function clearFieldError(field) {
	const errorDiv = field.parentNode.querySelector(".field-error");
	if (errorDiv) {
		errorDiv.remove();
	}
	field.style.borderColor = "";
}

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function isValidPhone(phone) {
	const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
	return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

async function submitForm() {
	const submitBtn = document.querySelector(".submit-btn");
	const originalText = submitBtn.innerHTML;

	// Show loading state
	submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
	submitBtn.disabled = true;

	try {
		// Get form data
		const form = document.getElementById("volunteerForm");
		const formData = new FormData(form);

		const volunteerData = {
			first_name: formData.get("firstName"),
			last_name: formData.get("lastName"),
			email: formData.get("email"),
			phone: formData.get("phone"),
			city: formData.get("city"),
			state: formData.get("state"),
			preferred_program: formData.get("program"),
			previous_experience: formData.get("experience") || null,
			motivation: formData.get("motivation"),
			availability: formData.get("availability"),
			agrees_to_terms: formData.get("terms") === "on",
			newsletter_subscription: formData.get("newsletter") === "on",
			application_type: "main_form",
			created_at: new Date().toISOString(),
		};

		// Submit to Supabase
		const { data, error } = await supabase
			.from("volunteer_applications")
			.insert([volunteerData]);

		if (error) {
			throw error;
		}

		console.log("Application submitted successfully:", data);
		showSubmissionSuccess();
		resetForm();
	} catch (error) {
		console.error("Error submitting application:", error);
		alert("There was an error submitting your application. Please try again.");
	} finally {
		// Reset button
		submitBtn.innerHTML = originalText;
		submitBtn.disabled = false;
	}
}

function showSubmissionSuccess() {
	// Create success modal
	const modal = document.createElement("div");
	modal.className = "success-modal";
	modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Application Submitted Successfully!</h3>
            <p>Thank you for your interest in volunteering with CRY. We'll review your application and get back to you within 3-5 business days.</p>
            <button class="btn btn-primary" onclick="closeSuccessModal()">
                <i class="fas fa-heart"></i>
                Great! Thank You
            </button>
        </div>
        <div class="success-modal-overlay" onclick="closeSuccessModal()"></div>
    `;

	// Add modal styles
	const style = document.createElement("style");
	style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .success-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
        }
        
        .success-modal-content {
            position: relative;
            background: white;
            padding: 3rem 2rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 500px;
            margin: 1rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .success-icon {
            font-size: 4rem;
            color: var(--primary-green);
            margin-bottom: 1.5rem;
        }
        
        .success-modal-content h3 {
            font-size: 1.75rem;
            color: var(--text-dark);
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .success-modal-content p {
            color: var(--text-gray);
            line-height: 1.6;
            margin-bottom: 2rem;
        }
    `;

	document.head.appendChild(style);
	document.body.appendChild(modal);

	// Animate in
	modal.style.opacity = "0";
	setTimeout(() => {
		modal.style.opacity = "1";
		modal.style.transition = "opacity 0.3s ease";
	}, 10);
}

function closeSuccessModal() {
	const modal = document.querySelector(".success-modal");
	if (modal) {
		modal.style.opacity = "0";
		setTimeout(() => {
			modal.remove();
		}, 300);
	}
}

function resetForm() {
	const form = document.getElementById("volunteerForm");
	form.reset();

	// Clear any remaining errors
	const errorDivs = form.querySelectorAll(".field-error");
	errorDivs.forEach((error) => error.remove());

	// Reset field styles
	const fields = form.querySelectorAll("input, select, textarea");
	fields.forEach((field) => {
		field.style.borderColor = "";
	});
}

// Animation on Scroll
function initAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = "1";
				entry.target.style.transform = "translateY(0)";

				// Animate stats numbers
				if (entry.target.classList.contains("stat-card")) {
					animateStatNumber(entry.target);
				}
			}
		});
	}, observerOptions);

	// Observe elements
	const elementsToAnimate = document.querySelectorAll(
		".stat-card, .reason-card, .program-card, .testimonial-card"
	);
	elementsToAnimate.forEach((element) => {
		element.style.opacity = "0";
		element.style.transform = "translateY(30px)";
		element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
		observer.observe(element);
	});
}

function animateStatNumber(statCard) {
	const numberElement = statCard.querySelector(".stat-number");
	const finalNumber = numberElement.textContent.replace(/,/g, "");
	const isDecimal = finalNumber.includes(".");
	const numericPart = parseFloat(finalNumber.replace(/[^\d.]/g, ""));

	if (isNaN(numericPart)) return;

	let currentNumber = 0;
	const increment = numericPart / 50;
	const duration = 2000;
	const stepTime = duration / 50;

	const timer = setInterval(() => {
		currentNumber += increment;

		if (currentNumber >= numericPart) {
			currentNumber = numericPart;
			clearInterval(timer);
		}

		// Format number with commas
		let displayNumber = Math.floor(currentNumber);
		if (finalNumber.includes(",")) {
			displayNumber = displayNumber.toLocaleString();
		}

		numberElement.textContent = displayNumber;
	}, stepTime);
}

// Mobile Menu (if needed)
function initMobileMenu() {
	const menuBtn = document.querySelector(".menu-btn");
	const nav = document.querySelector(".nav-wrapper");

	if (menuBtn && nav) {
		menuBtn.addEventListener("click", function () {
			this.classList.toggle("active");
			nav.classList.toggle("active");
		});
	}
}

// Smooth scroll for anchor links
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

// Form input enhancements
document.addEventListener("DOMContentLoaded", function () {
	// Auto-format phone number
	const phoneInput = document.getElementById("phone");
	if (phoneInput) {
		phoneInput.addEventListener("input", function () {
			let value = this.value.replace(/\D/g, "");
			if (value.length > 10) {
				value = value.substring(0, 10);
			}
			this.value = value;
		});
	}

	// Capitalize first letter of names
	const nameInputs = document.querySelectorAll("#firstName, #lastName");
	nameInputs.forEach((input) => {
		input.addEventListener("input", function () {
			this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
		});
	});
});

// Export functions for global access
window.changeTestimonial = changeTestimonial;
window.goToTestimonial = goToTestimonial;
window.closeSuccessModal = closeSuccessModal;
window.closeVolunteerPopup = closeVolunteerPopup;
window.closeThankYouPopup = closeThankYouPopup;

// Scroll Effects
function initScrollEffects() {
	let lastScrollTop = 0;
	const header = document.querySelector("header");

	window.addEventListener("scroll", function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Add scrolled class to body for header styling
		if (scrollTop > 100) {
			document.body.classList.add("scrolled");
		} else {
			document.body.classList.remove("scrolled");
		}

		// Hide/show header on scroll
		if (scrollTop > lastScrollTop && scrollTop > 100) {
			// Scrolling down
			header.style.transform = "translateY(-100%)";
		} else {
			// Scrolling up
			header.style.transform = "translateY(0)";
		}

		lastScrollTop = scrollTop;
	});
}

// Parallax Effect for Background Video
function initParallaxEffect() {
	const video = document.querySelector(".video-background video");

	if (video) {
		window.addEventListener("scroll", function () {
			const scrolled = window.pageYOffset;
			const parallaxSpeed = 0.5;
			const yPos = -(scrolled * parallaxSpeed);

			video.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
		});
	}
}

// Enhanced form validation with better UX
function enhanceFormValidation() {
	const form = document.getElementById("volunteerForm");
	const inputs = form.querySelectorAll("input, select, textarea");

	inputs.forEach((input) => {
		// Add focus/blur effects
		input.addEventListener("focus", function () {
			this.parentNode.classList.add("focused");
		});

		input.addEventListener("blur", function () {
			this.parentNode.classList.remove("focused");
			if (this.value.trim() === "") {
				this.parentNode.classList.remove("filled");
			} else {
				this.parentNode.classList.add("filled");
			}
		});

		// Check initial state
		if (input.value.trim() !== "") {
			input.parentNode.classList.add("filled");
		}
	});
}

// Add smooth reveal animations for sections
function addRevealAnimations() {
	const sections = document.querySelectorAll("section");

	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -100px 0px",
	};

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("revealed");
			}
		});
	}, observerOptions);

	sections.forEach((section) => {
		section.classList.add("reveal-section");
		sectionObserver.observe(section);
	});
}

// Initialize enhanced features
document.addEventListener("DOMContentLoaded", function () {
	enhanceFormValidation();
	addRevealAnimations();
});
