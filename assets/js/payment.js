/**
 * Care Mate - Payment Integration JavaScript
 * 
 * This file contains the functionality for payment processing
 * including Stripe integration, subscription management, and checkout flow.
 */

// Stripe instance
let stripe;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe if the API key is available
    const stripePublicKey = 'pk_test_placeholder'; // Replace with actual public key in production
    
    if (stripePublicKey) {
        stripe = Stripe(stripePublicKey);
        initPaymentForms();
    }
    
    // Initialize payment-related UI elements
    initPricingSelectors();
    initCheckoutModal();
});

/**
 * Initialize payment forms with Stripe Elements
 */
function initPaymentForms() {
    const elements = stripe.elements();
    
    // Create card element
    const cardElement = elements.create('card', {
        style: {
            base: {
                color: '#f0f0f0',
                fontFamily: '"Inter", sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#a0a0a0'
                }
            },
            invalid: {
                color: '#ff4d6d',
                iconColor: '#ff4d6d'
            }
        }
    });
    
    // Mount card element
    const cardContainer = document.getElementById('card-element');
    if (cardContainer) {
        cardElement.mount(cardContainer);
        
        // Handle validation errors
        cardElement.on('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (displayError) {
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
            }
        });
    }
    
    // Handle form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = paymentForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            }
            
            // Create payment method
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: document.getElementById('cardholder-name').value,
                    email: document.getElementById('cardholder-email').value
                }
            }).then(function(result) {
                if (result.error) {
                    // Show error
                    const errorElement = document.getElementById('card-errors');
                    if (errorElement) {
                        errorElement.textContent = result.error.message;
                    }
                    
                    // Reset button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Pay Now';
                    }
                } else {
                    // Send payment method ID to server
                    processPayment(result.paymentMethod.id);
                }
            });
        });
    }
}

/**
 * Process payment (placeholder for server integration)
 * @param {string} paymentMethodId - The Stripe payment method ID
 */
function processPayment(paymentMethodId) {
    // In a real app, this would make an API call to your server
    // The server would create a subscription or charge with Stripe
    
    console.log('Payment method ID:', paymentMethodId);
    
    // Simulate successful payment
    setTimeout(() => {
        // Show success message
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.innerHTML = `
                <div class="payment-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Payment Successful!</h3>
                    <p>Thank you for subscribing to Care Mate. Your account has been activated.</p>
                    <button class="btn btn-primary" onclick="closeCheckoutModal()">Continue</button>
                </div>
            `;
        }
        
        // Update user state (in a real app, this would be handled by the server)
        localStorage.setItem('userSubscribed', 'true');
        
        // Update UI to reflect subscribed state
        updateUIForSubscribedUser();
    }, 2000);
}

/**
 * Initialize pricing package selectors
 */
function initPricingSelectors() {
    const packageButtons = document.querySelectorAll('.select-package-btn');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const packagePrice = this.getAttribute('data-price');
            
            // Update checkout information
            updateCheckoutSummary(packageName, packagePrice);
            
            // Open checkout modal
            const checkoutModal = document.getElementById('checkout-modal');
            if (checkoutModal) {
                openModal(checkoutModal);
            }
        });
    });
}

/**
 * Update checkout summary with selected package
 * @param {string} packageName - The name of the selected package
 * @param {string} packagePrice - The price of the selected package
 */
function updateCheckoutSummary(packageName, packagePrice) {
    const planNameElement = document.getElementById('checkout-plan-name');
    const planPriceElement = document.getElementById('checkout-plan-price');
    const totalElement = document.getElementById('checkout-total-amount');
    
    if (planNameElement) {
        let displayName = 'Basic Plan';
        
        if (packageName === 'participant') {
            displayName = 'NDIS Participant / Carer Plan';
        } else if (packageName === 'coordinator') {
            displayName = 'Support Coordinator Plan';
        } else if (packageName === 'manager') {
            displayName = 'Plan Manager Plan';
        }
        
        planNameElement.textContent = displayName;
    }
    
    if (planPriceElement) {
        planPriceElement.textContent = `$${packagePrice}/month`;
    }
    
    if (totalElement) {
        totalElement.textContent = `$${packagePrice}`;
    }
}

/**
 * Initialize checkout modal
 */
function initCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    const cancelButton = document.getElementById('checkout-cancel');
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            closeCheckoutModal();
        });
    }
}

/**
 * Close checkout modal
 */
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        closeModal(checkoutModal);
    }
}

/**
 * Update UI for subscribed users
 */
function updateUIForSubscribedUser() {
    // Hide pricing buttons
    const pricingButtons = document.querySelectorAll('.select-package-btn');
    pricingButtons.forEach(button => {
        button.textContent = 'Current Plan';
        button.disabled = true;
    });
    
    // Update navigation
    const signupButton = document.querySelector('.signup-btn');
    if (signupButton) {
        signupButton.textContent = 'My Account';
        signupButton.setAttribute('data-modal', 'account-modal');
    }
    
    // Add account badge
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) {
        const accountBadge = document.createElement('div');
        accountBadge.className = 'account-badge';
        accountBadge.innerHTML = '<i class="fas fa-crown"></i>';
        navButtons.prepend(accountBadge);
    }
}

/**
 * Check if user is subscribed
 * @returns {boolean} - Whether the user is subscribed
 */
function isUserSubscribed() {
    return localStorage.getItem('userSubscribed') === 'true';
}

// Check subscription status on page load
if (isUserSubscribed()) {
    updateUIForSubscribedUser();
}
