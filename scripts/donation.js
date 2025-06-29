// JavaScript for donation page functionality

document.addEventListener("DOMContentLoaded", function () {
	// Get all donation elements
	const amountButtons = document.querySelectorAll(".amount-button");
	const customAmountInput = document.getElementById("custom-amount-input");
	const donateButton = document.getElementById("donate-button");
	const donationWidget = document.querySelector(".donation-widget");
	const typeButtons = document.querySelectorAll(".type-button");

	let selectedAmount = 0;
	let isCustomAmount = false;
	let donationType = "one-time"; // Default to one-time

	// Create and insert selected amount display
	const selectedAmountDiv = document.createElement("div");
	selectedAmountDiv.className = "selected-amount";
	selectedAmountDiv.innerHTML =
		'<p>Selected: <span id="type-display">One-Time</span> - $<span id="amount-display">0</span></p>';
	donationWidget.insertBefore(selectedAmountDiv, donateButton);

	const amountDisplay = document.getElementById("amount-display");
	const typeDisplay = document.getElementById("type-display");

	// Handle donation type selection
	typeButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove active class from all type buttons
			typeButtons.forEach((btn) => btn.classList.remove("active"));

			// Add active class to clicked button
			this.classList.add("active");

			// Get the donation type
			donationType = this.dataset.type;
			updateDisplay();

			// Add animation effect
			this.style.transform = "scale(0.95)";
			setTimeout(() => {
				this.style.transform = "";
			}, 150);
		});
	});

	// Handle preset amount button clicks
	amountButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove selected class from all buttons
			amountButtons.forEach((btn) => btn.classList.remove("selected"));

			// Add selected class to clicked button
			this.classList.add("selected");

			// Get the amount from data attribute
			selectedAmount = parseInt(this.dataset.amount);
			isCustomAmount = false;

			// Clear custom input
			customAmountInput.value = "";

			// Update display
			updateDisplay();

			// Add animation effect
			this.style.transform = "scale(0.95)";
			setTimeout(() => {
				this.style.transform = "";
			}, 150);
		});
	});

	// Handle custom amount input
	customAmountInput.addEventListener("input", function () {
		const customValue = parseInt(this.value) || 0;

		if (customValue > 0) {
			// Remove selected class from all preset buttons
			amountButtons.forEach((btn) => btn.classList.remove("selected"));

			selectedAmount = customValue;
			isCustomAmount = true;
			updateDisplay();
		} else {
			selectedAmount = 0;
			isCustomAmount = false;
			updateDisplay();
		}
	});

	// Update display function
	function updateDisplay() {
		amountDisplay.textContent = selectedAmount;
		typeDisplay.textContent =
			donationType === "one-time" ? "One-Time" : "Monthly Recurring";

		if (selectedAmount > 0) {
			selectedAmountDiv.classList.add("show");
			donateButton.disabled = false;

			if (donationType === "recurring") {
				donateButton.textContent = `Start Monthly $${selectedAmount} Donation`;
			} else {
				donateButton.textContent = `Donate $${selectedAmount} Now`;
			}
		} else {
			selectedAmountDiv.classList.remove("show");
			donateButton.disabled = true;
			donateButton.textContent = "Select Amount to Donate";
		}
	}

	// Handle donate button click
	donateButton.addEventListener("click", function () {
		if (selectedAmount <= 0) {
			alert("Please select or enter a donation amount.");
			return;
		}

		// Disable button and show loading state
		donateButton.disabled = true;
		donateButton.textContent = "Processing...";

		// Add loading animation
		donateButton.style.background = "var(--text-gray)";

		// Simulate donation process
		setTimeout(() => {
			// Show success message
			showDonationSuccess();
		}, 2000);
	});

	// Show donation success modal/message
	function showDonationSuccess() {
		const donationTypeText =
			donationType === "recurring"
				? "monthly recurring donation"
				: "one-time donation";
		const additionalMessage =
			donationType === "recurring"
				? "Your monthly donation will be automatically processed each month."
				: "Your donation has been processed successfully.";

		// Create success modal
		const modal = document.createElement("div");
		modal.className = "donation-success-modal";
		modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✅</div>
                <h3>Thank You for Your ${
									donationType === "recurring" ? "Monthly " : ""
								}Donation!</h3>
                <p>Your generous <strong>${donationTypeText}</strong> of <strong>$${selectedAmount}</strong> will make a real difference in a child's life.</p>
                <p>${additionalMessage}</p>
                <p>You will receive a confirmation email shortly.</p>
                <button class="close-modal" onclick="closeDonationModal()">Close</button>
            </div>
        `;

		// Add modal styles
		modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

		// Style modal content
		const modalContent = modal.querySelector(".modal-content");
		modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            max-width: 500px;
            margin: 0 20px;
            box-shadow: var(--shadow-2xl);
            animation: slideUp 0.3s ease;
        `;

		// Style success icon
		const successIcon = modal.querySelector(".success-icon");
		successIcon.style.cssText = `
            font-size: 3rem;
            margin-bottom: 1rem;
        `;

		// Style close button
		const closeButton = modal.querySelector(".close-modal");
		closeButton.style.cssText = `
            background: var(--primary-orange);
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
            transition: all 0.3s ease;
        `;

		closeButton.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-2px)";
			this.style.boxShadow = "var(--shadow-orange)";
		});

		closeButton.addEventListener("mouseleave", function () {
			this.style.transform = "";
			this.style.boxShadow = "";
		});

		document.body.appendChild(modal);

		// Make close function globally accessible
		window.closeDonationModal = function () {
			modal.remove();
			resetDonationForm();
		};
	}

	// Reset donation form
	function resetDonationForm() {
		selectedAmount = 0;
		isCustomAmount = false;
		donationType = "one-time"; // Reset to default

		// Clear selections
		amountButtons.forEach((btn) => btn.classList.remove("selected"));
		customAmountInput.value = "";

		// Reset type buttons
		typeButtons.forEach((btn) => btn.classList.remove("active"));
		typeButtons[0].classList.add("active"); // Set first button (one-time) as active

		// Reset button
		donateButton.disabled = true;
		donateButton.textContent = "Select Amount to Donate";
		donateButton.style.background = "";

		// Hide selected amount display
		selectedAmountDiv.classList.remove("show");

		// Update display
		updateDisplay();
	}

	// Add CSS animations
	const style = document.createElement("style");
	style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                transform: translateY(30px);
                opacity: 0;
            }
            to { 
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .donation-success-modal h3 {
            color: var(--primary-green);
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .donation-success-modal p {
            color: var(--text-gray);
            line-height: 1.6;
            margin-bottom: 0.5rem;
        }
    `;
	document.head.appendChild(style);

	// Initial state
	updateSelectedAmount();

	// Add hover effects to amount buttons
	amountButtons.forEach((button) => {
		button.addEventListener("mouseenter", function () {
			if (!this.classList.contains("selected")) {
				this.style.transform = "translateY(-2px)";
			}
		});

		button.addEventListener("mouseleave", function () {
			if (!this.classList.contains("selected")) {
				this.style.transform = "";
			}
		});
	});

	// Add input validation
	customAmountInput.addEventListener("keypress", function (e) {
		// Only allow numbers
		if (
			!/[\d]/.test(e.key) &&
			!["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
		) {
			e.preventDefault();
		}
	});

	// Add focus effects
	customAmountInput.addEventListener("focus", function () {
		this.parentElement.style.transform = "scale(1.02)";
		this.parentElement.style.transition = "transform 0.3s ease";
	});

	customAmountInput.addEventListener("blur", function () {
		this.parentElement.style.transform = "";
	});
});
