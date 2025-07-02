// Blog Page JavaScript

// Supabase Configuration
const SUPABASE_URL = "https://gkwksufqgkoxpgftirae.supabase.co";
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrd2tzdWZxZ2tveHBnZnRpcmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMzE4MTYsImV4cCI6MjA2NTYwNzgxNn0.YRgER0XusBuRmDV4Xk809-luvCO_vOkkHd3-5GdCyws";

// Initialize Supabase client
let supabase = null;

// Wait for Supabase library to load
function initializeSupabase() {
	if (typeof window.supabase !== "undefined") {
		supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
		console.log("Supabase client initialized successfully");
		return true;
	}
	console.error("Supabase library not loaded");
	return false;
}

// Initialize blog functionality
document.addEventListener("DOMContentLoaded", async function () {
	try {
		// Debug environment first
		debugEnvironment();

		// Initialize Supabase with better error handling
		if (!initializeSupabase()) {
			console.warn(
				"Failed to initialize Supabase - continuing with fallback mode"
			);
		} else {
			// Test the connection
			const connectionTest = await testSupabaseConnection();
			if (!connectionTest) {
				console.warn("Supabase connection test failed - using fallback mode");
			}
		}

		initializeBlogFeatures();
		initializeScrollEffects();
		initializeShareButtons();
		initializeNewsletterForm();

		// Mobile optimizations
		if (window.innerWidth <= 768) {
			initializeMobileOptimizations();
		}

		console.log("Blog page initialization completed");
	} catch (error) {
		console.error("Error during blog page initialization:", error);
		// Still try to initialize the newsletter form even if other things fail
		try {
			initializeNewsletterForm();
		} catch (newsletterError) {
			console.error("Failed to initialize newsletter form:", newsletterError);
		}
	}
});

// Initialize blog features
function initializeBlogFeatures() {
	// Add reading progress indicator
	createReadingProgress();

	// Initialize scroll to top button
	createScrollToTop();

	// Add image lazy loading
	initializeLazyLoading();

	// Add smooth scrolling for internal links
	initializeSmoothScrolling();
}

// Create reading progress indicator
function createReadingProgress() {
	const progressBar = document.createElement("div");
	progressBar.id = "reading-progress";
	progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #ff6b6b, #ff8e53);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
	document.body.appendChild(progressBar);

	// Update progress on scroll
	window.addEventListener("scroll", updateReadingProgress);
}

// Update reading progress
function updateReadingProgress() {
	const article = document.querySelector(".main-article");
	if (!article) return;

	const articleTop = article.offsetTop;
	const articleHeight = article.offsetHeight;
	const windowTop = window.pageYOffset;
	const windowHeight = window.innerHeight;

	const progress = Math.min(
		Math.max((windowTop - articleTop + windowHeight) / articleHeight, 0),
		1
	);

	document.getElementById("reading-progress").style.width =
		progress * 100 + "%";
}

// Create scroll to top button
function createScrollToTop() {
	const scrollBtn = document.createElement("button");
	scrollBtn.id = "scroll-to-top";
	scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
	scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ff6b6b;
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    `;

	scrollBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	document.body.appendChild(scrollBtn);

	// Show/hide based on scroll position
	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 500) {
			scrollBtn.style.opacity = "1";
			scrollBtn.style.transform = "translateY(0)";
		} else {
			scrollBtn.style.opacity = "0";
			scrollBtn.style.transform = "translateY(20px)";
		}
	});
}

// Initialize lazy loading for images
function initializeLazyLoading() {
	if ("IntersectionObserver" in window) {
		const imageObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;
					if (img.dataset.src) {
						img.src = img.dataset.src;
						img.classList.add("loaded");
						imageObserver.unobserve(img);
					}
				}
			});
		});

		document.querySelectorAll("img[data-src]").forEach((img) => {
			imageObserver.observe(img);
		});
	}
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
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
}

// Initialize scroll effects
function initializeScrollEffects() {
	// Animate elements on scroll
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

	// Observe elements for animation
	document
		.querySelectorAll(
			".impact-item, .story-card, .action-card, .milestone-card"
		)
		.forEach((el) => {
			observer.observe(el);
		});

	// Add CSS for animations
	const style = document.createElement("style");
	style.textContent = `
        .impact-item, .story-card, .action-card, .milestone-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .impact-item, .story-card, .action-card, .milestone-card {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
	document.head.appendChild(style);
}

// Initialize share buttons
function initializeShareButtons() {
	// Get article details for sharing
	const articleTitle = document.querySelector("h1").textContent;
	const articleUrl = window.location.href;
	const articleDescription =
		document.querySelector(".blog-subtitle").textContent;
}

// Share article function
function shareArticle(platform) {
	const articleTitle = encodeURIComponent(
		document.querySelector("h1").textContent
	);
	const articleUrl = encodeURIComponent(window.location.href);
	const articleDescription = encodeURIComponent(
		document.querySelector(".blog-subtitle").textContent
	);

	const shareText = `${articleTitle} - ${articleDescription}`;

	let shareUrl = "";

	switch (platform) {
		case "facebook":
			shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}&quote=${encodeURIComponent(
				shareText
			)}`;
			break;
		case "twitter":
			shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				shareText
			)}&url=${articleUrl}&hashtags=CRYIndia,ChildRights,MakeADifference`;
			break;
		case "linkedin":
			shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}&summary=${encodeURIComponent(
				shareText
			)}`;
			break;
		case "whatsapp":
			shareUrl = `https://wa.me/?text=${encodeURIComponent(
				shareText + " " + decodeURIComponent(articleUrl)
			)}`;
			break;
	}

	if (shareUrl) {
		if (isMobileDevice() && platform === "whatsapp") {
			// Try to open WhatsApp app on mobile
			window.open(
				`whatsapp://send?text=${encodeURIComponent(
					shareText + " " + decodeURIComponent(articleUrl)
				)}`,
				"_blank"
			);
			setTimeout(() => {
				window.open(shareUrl, "_blank");
			}, 1000);
		} else {
			window.open(shareUrl, "_blank", "width=600,height=400");
		}
	}

	// Track sharing event (if analytics is available)
	if (typeof gtag !== "undefined") {
		gtag("event", "share", {
			method: platform,
			content_type: "article",
			item_id: "blog-2-million-children",
		});
	}
}

// Quick donate function
function quickDonate(amount) {
	// Store the amount and redirect to donation page
	sessionStorage.setItem("donationAmount", amount);
	window.location.href = "donation.html?amount=" + amount + "&source=blog";
}

// Mobile optimizations
function initializeMobileOptimizations() {
	// Disable video on mobile for better performance
	const video = document.querySelector(".video-background video");
	if (video) {
		video.style.display = "none";
	}

	// Add mobile-specific classes
	document.body.classList.add("mobile-device");

	// Improve touch interactions
	const buttons = document.querySelectorAll("button, .action-btn, .cta-btn");
	buttons.forEach((button) => {
		button.style.minHeight = "44px";
		button.addEventListener("touchstart", function () {
			this.style.transform = "scale(0.98)";
		});
		button.addEventListener("touchend", function () {
			this.style.transform = "scale(1)";
		});
	});

	// Optimize sidebar for mobile
	const sidebar = document.querySelector(".blog-sidebar");
	if (sidebar && window.innerWidth <= 768) {
		// Move sidebar content to bottom on mobile
		const mainContent = document.querySelector(".blog-content .container");
		if (mainContent) {
			mainContent.appendChild(sidebar);
		}
	}

	// Add haptic feedback if supported
	if ("vibrate" in navigator) {
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				navigator.vibrate(50);
			});
		});
	}
}

// Utility function to detect mobile devices
function isMobileDevice() {
	return (
		window.innerWidth <= 768 ||
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	);
}

// Print functionality
function printArticle() {
	window.print();
}

// Copy article link
function copyArticleLink() {
	const url = window.location.href;

	if (navigator.clipboard) {
		navigator.clipboard.writeText(url).then(() => {
			showNotification("Article link copied to clipboard!");
		});
	} else {
		// Fallback for older browsers
		const textArea = document.createElement("textarea");
		textArea.value = url;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);
		showNotification("Article link copied to clipboard!");
	}
}

// Show notification
function showNotification(message) {
	const notification = document.createElement("div");
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
	notification.textContent = message;
	document.body.appendChild(notification);

	// Animate in
	setTimeout(() => {
		notification.style.transform = "translateX(0)";
	}, 100);

	// Remove after 3 seconds
	setTimeout(() => {
		notification.style.transform = "translateX(100%)";
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

// Email subscription (if newsletter feature is needed)
function subscribeToNewsletter(email) {
	if (!email || !email.includes("@")) {
		showNotification("Please enter a valid email address");
		return;
	}

	// Here you would typically send the email to your backend
	console.log("Newsletter subscription for:", email);
	showNotification("Thank you for subscribing to our newsletter!");

	// Supabase: Insert email into newsletter table
	supabase
		.from("newsletter")
		.insert([{ email: email }])
		.then((response) => {
			if (response.error) {
				console.error("Error inserting email:", response.error);
				showNotification("Error subscribing to newsletter. Please try again.");
			} else {
				console.log("Email subscribed successfully:", response.data);
				showNotification("Thank you for subscribing to our newsletter!");
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			showNotification("Error subscribing to newsletter. Please try again.");
		});
}

// Helper function to send newsletter notification (fallback)
async function sendNewsletterNotification(data) {
	try {
		console.log("Newsletter subscription data to be processed:", data);

		// Store the notification request for manual processing
		const notifications = JSON.parse(
			localStorage.getItem("newsletter_notifications") || "[]"
		);
		notifications.push({
			...data,
			timestamp: new Date().toISOString(),
			processed: false,
		});
		localStorage.setItem(
			"newsletter_notifications",
			JSON.stringify(notifications)
		);

		console.log("Newsletter notification stored for manual processing");

		// Here you could integrate with services like EmailJS, Formspree, or Netlify Forms
		// For now, we'll just log it for manual processing
		return Promise.resolve();
	} catch (error) {
		console.error("Failed to send newsletter notification:", error);
		throw error;
	}
}

// Initialize newsletter form
function initializeNewsletterForm() {
	const form = document.getElementById("newsletter-form");
	const successMessage = document.getElementById("newsletter-success");
	const errorMessage = document.getElementById("newsletter-error");

	if (!form) {
		console.log("Newsletter form not found");
		return;
	}

	form.addEventListener("submit", async function (e) {
		e.preventDefault();

		const submitBtn = form.querySelector(".newsletter-btn");
		const originalBtnText = submitBtn.innerHTML;

		// Show loading state
		submitBtn.innerHTML =
			'<i class="fas fa-spinner fa-spin"></i> Subscribing...';
		submitBtn.disabled = true;

		// Hide previous messages
		successMessage.style.display = "none";
		errorMessage.style.display = "none";

		try {
			// Get form data
			const formData = new FormData(form);
			const newsletterData = {
				name: formData.get("name")?.trim(),
				email: formData.get("email")?.trim(),
				interests: formData.get("interests") || null,
				subscribed_at: new Date().toISOString(),
				source: "blog_page",
				status: "active",
			};

			// Validate required fields
			if (!newsletterData.name || !newsletterData.email) {
				throw new Error("Please fill in all required fields.");
			}

			// Validate email format
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(newsletterData.email)) {
				throw new Error("Please enter a valid email address.");
			}

			console.log("Submitting newsletter data:", newsletterData);

			// Check for duplicates in localStorage first
			const existingSubscriptions = JSON.parse(
				localStorage.getItem("newsletter_subscriptions") || "[]"
			);
			const isDuplicate = existingSubscriptions.some(
				(sub) => sub.email === newsletterData.email
			);
			if (isDuplicate) {
				throw new Error("This email is already subscribed to our newsletter.");
			}

			let success = false;

			// Try Supabase first if available and properly configured
			if (supabase) {
				try {
					const { data, error } = await supabase
						.from("newsletter_subscriptions")
						.insert([newsletterData])
						.select();

					console.log("Supabase response:", { data, error });

					if (!error && data) {
						console.log("Supabase submission successful:", data);
						success = true;
					} else {
						console.warn("Supabase error, using fallback:", error);
						// Check if it's a duplicate email error
						if (
							error &&
							(error.code === "23505" ||
								error.message.includes("duplicate") ||
								error.message.includes("unique") ||
								error.message.includes("already exists"))
						) {
							throw new Error(
								"This email is already subscribed to our newsletter."
							);
						}
					}
				} catch (supabaseError) {
					console.warn("Supabase failed, using fallback:", supabaseError);
					// Don't throw error here, use fallback instead
				}
			}

			// Fallback: Store locally and prepare for manual processing
			if (!success) {
				console.log("Using fallback storage method");

				// Store in localStorage for backup
				existingSubscriptions.push(newsletterData);
				localStorage.setItem(
					"newsletter_subscriptions",
					JSON.stringify(existingSubscriptions)
				);

				// Send notification for manual processing
				try {
					await sendNewsletterNotification(newsletterData);
				} catch (emailError) {
					console.warn("Email notification failed:", emailError);
					// Don't fail the whole process if email fails
				}

				success = true;
			}

			// Success - show success message
			form.style.display = "none";
			successMessage.style.display = "block";

			// Track subscription event
			if (typeof gtag !== "undefined") {
				gtag("event", "newsletter_subscription", {
					event_category: "engagement",
					event_label: "blog_page",
					value: 1,
				});
			}

			// Add haptic feedback for mobile
			if (navigator.vibrate) {
				navigator.vibrate([100, 50, 100]);
			}
		} catch (error) {
			console.error("Newsletter subscription error:", error);

			// Show error message
			errorMessage.style.display = "block";
			const errorText = errorMessage.querySelector("p");

			if (error.message.includes("already subscribed")) {
				errorText.innerHTML =
					"This email is already subscribed to our newsletter. Thank you for your continued support!";
			} else if (error.message.includes("valid email")) {
				errorText.innerHTML = "Please enter a valid email address.";
			} else if (error.message.includes("required fields")) {
				errorText.innerHTML = "Please fill in all required fields.";
			} else if (
				error.message.includes("network") ||
				error.message.includes("connection")
			) {
				errorText.innerHTML =
					"Connection issue. Please check your internet connection and try again.";
			} else if (error.message.length > 0) {
				errorText.innerHTML = `Something went wrong: ${error.message}. Please try again or contact us at <a href="mailto:writetous@crymail.org">writetous@crymail.org</a>`;
			} else {
				errorText.innerHTML = `Something went wrong. Please try again or contact us at <a href="mailto:writetous@crymail.org">writetous@crymail.org</a>`;
			}

			// For debugging purposes, also log what's in localStorage
			console.log(
				"Current newsletter subscriptions in localStorage:",
				JSON.parse(localStorage.getItem("newsletter_subscriptions") || "[]")
			);

			// Fallback: Send notification data to email service even on error
			try {
				await sendNewsletterNotification({
					name: formData.get("name")?.trim() || "Unknown",
					email: formData.get("email")?.trim() || "unknown@example.com",
					interests: formData.get("interests") || "not specified",
					error: error.message,
					timestamp: new Date().toISOString(),
				});
			} catch (notificationError) {
				console.warn("Failed to send error notification:", notificationError);
			}
		} finally {
			// Reset button state
			submitBtn.innerHTML = originalBtnText;
			submitBtn.disabled = false;
		}
	});
}

// Debug function to check environment
function debugEnvironment() {
	console.log("=== Debug Environment ===");
	console.log(
		"Window supabase available:",
		typeof window.supabase !== "undefined"
	);
	console.log("Supabase client initialized:", supabase !== null);
	console.log(
		"Newsletter form exists:",
		document.getElementById("newsletter-form") !== null
	);
	console.log(
		"Success message exists:",
		document.getElementById("newsletter-success") !== null
	);
	console.log(
		"Error message exists:",
		document.getElementById("newsletter-error") !== null
	);
	console.log("=========================");
}

// Debug functions for newsletter subscription troubleshooting
window.debugNewsletter = function () {
	console.log("=== Newsletter Debug Information ===");
	console.log("Supabase client initialized:", supabase !== null);
	console.log(
		"Newsletter form exists:",
		document.getElementById("newsletter-form") !== null
	);
	console.log(
		"Newsletter subscriptions in localStorage:",
		JSON.parse(localStorage.getItem("newsletter_subscriptions") || "[]")
	);
	console.log(
		"Newsletter notifications in localStorage:",
		JSON.parse(localStorage.getItem("newsletter_notifications") || "[]")
	);
	console.log("=====================================");
};

// Function to manually clear subscription data (for testing)
window.clearNewsletterData = function () {
	localStorage.removeItem("newsletter_subscriptions");
	localStorage.removeItem("newsletter_notifications");
	console.log("Newsletter data cleared from localStorage");
};

// Function to test newsletter form without actually submitting
window.testNewsletterForm = function (
	email = "test@example.com",
	name = "Test User"
) {
	const form = document.getElementById("newsletter-form");
	if (!form) {
		console.error("Newsletter form not found");
		return;
	}

	const nameInput = form.querySelector("#newsletter-name");
	const emailInput = form.querySelector("#newsletter-email");

	if (nameInput && emailInput) {
		nameInput.value = name;
		emailInput.value = email;
		console.log(
			"Test values set. You can now click the subscribe button to test."
		);
	} else {
		console.error("Form inputs not found");
	}
};

// Test Supabase connection
async function testSupabaseConnection() {
	if (!supabase) {
		console.error("Supabase client not initialized");
		return false;
	}

	try {
		console.log("Testing Supabase connection...");

		// Try a simple health check first
		const { data, error } = await supabase
			.from("newsletter_subscriptions")
			.select("*")
			.limit(1);

		if (error) {
			console.error("Supabase connection test failed:", error.message);

			// Check if it's a table doesn't exist error
			if (
				error.message.includes("relation") &&
				error.message.includes("does not exist")
			) {
				console.warn(
					"Newsletter subscriptions table doesn't exist - fallback mode will be used"
				);
			}

			return false;
		}

		console.log("Supabase connection test successful");
		return true;
	} catch (error) {
		console.error("Supabase connection test error:", error);
		return false;
	}
}

// Helper function for email validation
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Helper function to sanitize input
function sanitizeInput(input) {
	return input.trim().replace(/[<>]/g, "");
}

// Performance monitoring (optional)
if ("performance" in window) {
	window.addEventListener("load", () => {
		const loadTime =
			performance.timing.loadEventEnd - performance.timing.navigationStart;
		console.log("Page load time:", loadTime + "ms");

		// Track performance if analytics is available
		if (typeof gtag !== "undefined") {
			gtag("event", "timing_complete", {
				name: "blog_page_load",
				value: Math.round(loadTime),
			});
		}
	});
}

// Add helpful console messages for users
console.log(
	`
%c🌟 CRY India Newsletter System Status 🌟
%c
To debug newsletter issues, use these commands in the console:
- debugNewsletter()     : Show current status
- testNewsletterForm()  : Pre-fill form with test data  
- clearNewsletterData() : Clear stored data for testing

Note: Newsletter subscriptions are stored locally as a backup 
while we work on database connectivity.
`,
	"color: #ff6b6b; font-weight: bold; font-size: 14px;",
	"color: #666; font-size: 12px;"
);
