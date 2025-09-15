//Signin Page
// DOM Elements
        const loginForm = document.getElementById('loginForm');
        const emailMobileInput = document.getElementById('emailMobile');
        const passwordInput = document.getElementById('password');
        const signInBtn = document.getElementById('signInBtn');
        const otpSignInBtn = document.getElementById('otpSignInBtn');
        const togglePasswordBtn = document.getElementById('togglePassword');
        const signUpLink = document.getElementById('signUpLink');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const notificationModal = document.getElementById('notificationModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        // Utility functions
        function showModal(title, message) {
            modalTitle.textContent = title;
            modalText.textContent = message;
            notificationModal.style.display = 'flex';
        }

        function hideModal() {
            notificationModal.style.display = 'none';
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function hideError(elementId) {
            const errorElement = document.getElementById(elementId);
            errorElement.style.display = 'none';
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validateMobile(mobile) {
            const mobileRegex = /^[0-9]{10}$/;
            return mobileRegex.test(mobile.replace(/\D/g, ''));
        }

        function validateEmailOrMobile(input) {
            return validateEmail(input) || validateMobile(input);
        }

        function setLoadingState(button, isLoading) {
            if (isLoading) {
                button.classList.add('loading-state');
                button.innerHTML = '<span class="loading-spinner"></span>' + button.textContent;
                button.disabled = true;
            } else {
                button.classList.remove('loading-state');
                button.innerHTML = button.textContent.replace('Sign In', 'Sign In');
                button.disabled = false;
            }
        }

        // Password toggle functionality
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });

        // Form validation
        function validateForm() {
            let isValid = true;
            
            // Clear previous errors
            hideError('emailError');
            hideError('passwordError');

            // Validate email/mobile
            const emailMobileValue = emailMobileInput.value.trim();
            if (!emailMobileValue) {
                showError('emailError', 'Please enter your email or mobile number');
                isValid = false;
            } else if (!validateEmailOrMobile(emailMobileValue)) {
                showError('emailError', 'Please enter a valid email or 10-digit mobile number');
                isValid = false;
            }

            // Validate password
            const passwordValue = passwordInput.value;
            if (!passwordValue) {
                showError('passwordError', 'Please enter your password');
                isValid = false;
            } else if (passwordValue.length < 6) {
                showError('passwordError', 'Password must be at least 6 characters long');
                isValid = false;
            }

            return isValid;
        }

        // Sign In form submission
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            setLoadingState(signInBtn, true);

            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Simulate successful login
                const emailMobile = emailMobileInput.value.trim();
                const password = passwordInput.value;
                
                // Demo credentials for testing
                if ((emailMobile === 'demo@example.com' || emailMobile === '1234567890') && password === 'password123') {
                    showModal('Success!', 'Login successful! Welcome back.');
                    
                    // Reset form after successful login
                    setTimeout(() => {
                        loginForm.reset();
                        hideModal();
                    }, 2000);
                } else {
                    showModal('Login Failed', 'Invalid credentials. Try demo@example.com with password: password123');
                }
                
            } catch (error) {
                showModal('Error', 'An error occurred during login. Please try again.');
            } finally {
                setLoadingState(signInBtn, false);
            }
        });

        // OTP Sign In button
        otpSignInBtn.addEventListener('click', async function() {
            const emailMobile = emailMobileInput.value.trim();
            
            if (!emailMobile) {
                showError('emailError', 'Please enter your email or mobile number');
                return;
            }
            
            if (!validateEmailOrMobile(emailMobile)) {
                showError('emailError', 'Please enter a valid email or mobile number');
                return;
            }

            hideError('emailError');
            setLoadingState(otpSignInBtn, true);

            // Simulate OTP generation
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showModal('OTP Sent!', `A verification code has been sent to ${emailMobile}. Please check and enter the OTP.`);
            } catch (error) {
                showModal('Error', 'Failed to send OTP. Please try again.');
            } finally {
                setLoadingState(otpSignInBtn, false);
            }
        });

        // Sign Up link
        signUpLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('Sign Up', 'Redirecting to Sign Up page...');
            setTimeout(() => {
                hideModal();
                // Here you would typically redirect to sign up page
                console.log('Redirecting to sign up page');
            }, 1500);
        });

        // Forgot Password link
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('Password Reset', 'Please check your email for password reset instructions.');
        });

        // Modal close functionality
        modalCloseBtn.addEventListener('click', hideModal);
        notificationModal.addEventListener('click', function(e) {
            if (e.target === notificationModal) {
                hideModal();
            }
        });

        // Real-time input validation
        emailMobileInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validateEmailOrMobile(value)) {
                showError('emailError', 'Please enter a valid email or 10-digit mobile number');
            } else {
                hideError('emailError');
            }
        });

        passwordInput.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 6) {
                showError('passwordError', 'Password must be at least 6 characters long');
            } else {
                hideError('passwordError');
            }
        });

        // Clear errors when user starts typing
        emailMobileInput.addEventListener('input', function() {
            if (this.value.trim()) {
                hideError('emailError');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Close modal with Escape key
            if (e.key === 'Escape' && notificationModal.style.display === 'flex') {
                hideModal();
            }
        });

//Black T-shirt
 // Image mapping for different colors
        const colorImages = {
            'red': 'https://via.placeholder.com/600x500/e74c3c/ffffff?text=Red+Anime+T-Shirt',
            'blue': 'https://via.placeholder.com/600x500/3498db/ffffff?text=Blue+Anime+T-Shirt',
            'yellow': 'https://via.placeholder.com/600x500/f1c40f/333333?text=Yellow+Anime+T-Shirt',
            'black': 'https://via.placeholder.com/600x500/2c3e50/ffffff?text=Black+Anime+T-Shirt'
        };

        // Base price for calculation
        const basePrice = 1299;
        let currentQuantity = 1;
        let currentColor = 'red';

        // Function to change shirt color and main image
        function changeShirtColor(selectedColor) {
            currentColor = selectedColor;
            
            // Update main product image with smooth transition
            const mainImage = document.getElementById('mainProductImage');
            mainImage.style.opacity = '0.5';
            
            setTimeout(() => {
                mainImage.src = colorImages[selectedColor];
                mainImage.style.opacity = '1';
            }, 200);

            // Update color selector dots
            document.querySelectorAll('.color-choice-dot').forEach(dot => {
                dot.classList.remove('selected-color');
            });
            document.querySelector(`.color-choice-dot[data-color="${selectedColor}"]`).classList.add('selected-color');

            // Update gallery selection
            document.querySelectorAll('.shirt-color-option').forEach(option => {
                option.classList.remove('active-selection');
            });
            document.querySelector(`.shirt-color-option[data-color="${selectedColor}"]`).classList.add('active-selection');

            // Add scaling animation to main image
            showColorChangeAnimation();
        }

        // Function to show color change animation
        function showColorChangeAnimation() {
            const mainImage = document.getElementById('mainProductImage');
            mainImage.style.transform = 'scale(1.05)';
            mainImage.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            
            setTimeout(() => {
                mainImage.style.transform = 'scale(1)';
            }, 300);
        }

        // Function to increase quantity
        function increaseQuantity() {
            if (currentQuantity < 10) {
                currentQuantity++;
                updateQuantityDisplay();
                updateTotalPrice();
                animateQuantityButton('increase');
            }
        }

        // Function to decrease quantity
        function decreaseQuantity() {
            if (currentQuantity > 1) {
                currentQuantity--;
                updateQuantityDisplay();
                updateTotalPrice();
                animateQuantityButton('decrease');
            }
        }

        // Function to update quantity display
        function updateQuantityDisplay() {
            const quantityInput = document.getElementById('quantityInput');
            quantityInput.value = currentQuantity;
            
            // Add animation to quantity input
            quantityInput.style.transform = 'scale(1.1)';
            quantityInput.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                quantityInput.style.transform = 'scale(1)';
            }, 200);
        }

        // Function to animate quantity buttons
        function animateQuantityButton(action) {
            const buttons = document.querySelectorAll('.quantity-adjust-btn');
            const button = action === 'increase' ? buttons[1] : buttons[0];
            
            button.style.transform = 'scale(0.9)';
            button.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        }

        // Function to update total price
        function updateTotalPrice() {
            const totalPrice = basePrice * currentQuantity;
            const priceElement = document.getElementById('totalPrice');
            priceElement.textContent = `₹${totalPrice.toLocaleString()} + Tax`;
            
            // Add animation to price update
            priceElement.style.color = '#e74c3c';
            priceElement.style.transition = 'color 0.3s ease';
            
            setTimeout(() => {
                priceElement.style.color = '#333';
            }, 300);
        }

        // Function to show customization options
        function showCustomizationOptions() {
            alert('Advanced customization options:\n\n• Custom text/logo printing\n• Size modifications\n• Fabric options\n• Bulk order discounts\n\nContact us for more details!');
        }

        // Function to handle payment
        function proceedToPayment() {
            const totalAmount = basePrice * currentQuantity;
            
            // Show confirmation dialog
            const confirmPayment = confirm(
                `Order Summary:\n\n` +
                `Product: Lady Anime T-Shirt\n` +
                `Color: ${currentColor.charAt(0).toUpperCase() + currentColor.slice(1)}\n` +
                `Quantity: ${currentQuantity}\n` +
                `Total Amount: ₹${totalAmount.toLocaleString()} + Tax\n\n` +
                `Proceed to payment?`
            );
            
            if (confirmPayment) {
                // Animate pay now button
                const payButton = document.querySelector('.pay-now-button');
                const originalText = payButton.textContent;
                payButton.textContent = 'Processing...';
                payButton.style.opacity = '0.7';
                payButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    alert('Payment successful! Your order has been placed.\n\nOrder details will be sent to your email.');
                    payButton.textContent = originalText;
                    payButton.style.opacity = '1';
                    payButton.disabled = false;
                }, 2000);
            }
        }

        // Initialize the page
        function initializePage() {
            updateTotalPrice();
            
            // Add hover effects to color dots
            document.querySelectorAll('.color-choice-dot').forEach(dot => {
                dot.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('selected-color')) {
                        this.style.transform = 'scale(1.1)';
                    }
                });
                
                dot.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('selected-color')) {
                        this.style.transform = 'scale(1)';
                    }
                });
            });

            // Add keyboard support for quantity controls
            document.getElementById('quantityInput').addEventListener('keydown', function(e) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    increaseQuantity();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    decreaseQuantity();
                }
            });
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', initializePage);

        //Gpay payment page
          function processPayment() {
            const paymentContent = document.getElementById('paymentPageContent');
            const successContent = document.getElementById('successPageContent');
            
            // Add fade out effect to payment content
            paymentContent.classList.add('fade-out');
            
            // After fade out completes, switch content
            setTimeout(() => {
                paymentContent.classList.add('hidden-content');
                successContent.classList.remove('hidden-content');
                
                // Trigger fade in for success content
                setTimeout(() => {
                    successContent.style.opacity = '1';
                }, 50);
            }, 300);
        }

        //Customization filter
        // Filter functionality
        let activeFilters = {
            tag: [],
            color: [],
            size: [],
            category: []
        };

        // Initialize filter functionality
        document.addEventListener('DOMContentLoaded', function() {
            const checkboxes = document.querySelectorAll('.filter-checkbox-input');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateActiveFilters);
            });
        });

        function updateActiveFilters() {
            // Reset active filters
            activeFilters = {
                tag: [],
                color: [],
                size: [],
                category: []
            };

            // Get all checked checkboxes
            const checkedBoxes = document.querySelectorAll('.filter-checkbox-input:checked');
            
            checkedBoxes.forEach(checkbox => {
                const filterType = checkbox.dataset.filter;
                const filterValue = checkbox.dataset.value;
                
                if (activeFilters[filterType]) {
                    activeFilters[filterType].push(filterValue);
                }
            });

            // Update visual feedback
            updateFilterVisualFeedback();
        }

        function updateFilterVisualFeedback() {
            const filterItems = document.querySelectorAll('.filter-option-item');
            filterItems.forEach(item => {
                const checkbox = item.querySelector('.filter-checkbox-input');
                if (checkbox && checkbox.checked) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        function applyFilters() {
            const products = document.querySelectorAll('.product-showcase-card');
            let visibleCount = 0;

            products.forEach(product => {
                let shouldShow = true;

                // Check each filter category
                for (let filterType in activeFilters) {
                    if (activeFilters[filterType].length > 0) {
                        const productValue = product.dataset[filterType];
                        if (!activeFilters[filterType].includes(productValue)) {
                            shouldShow = false;
                            break;
                        }
                    }
                }

                // Show/hide product
                if (shouldShow) {
                    product.classList.remove('filter-hidden');
                    visibleCount++;
                } else {
                    product.classList.add('filter-hidden');
                }
            });

            // Show feedback
            showFilterFeedback(visibleCount);
        }

        function clearAllFilters() {
            // Uncheck all checkboxes
            const checkboxes = document.querySelectorAll('.filter-checkbox-input');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

            // Reset active filters
            activeFilters = {
                tag: [],
                color: [],
                size: [],
                category: []
            };

            // Show all products
            const products = document.querySelectorAll('.product-showcase-card');
            products.forEach(product => {
                product.classList.remove('filter-hidden');
            });

            // Update visual feedback
            updateFilterVisualFeedback();
            
            // Show feedback
            showFilterFeedback(products.length);
        }

        function showFilterFeedback(count) {
            // Create or update feedback message
            let feedback = document.getElementById('filter-feedback');
            if (!feedback) {
                feedback = document.createElement('div');
                feedback.id = 'filter-feedback';
                feedback.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #333;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    z-index: 1000;
                    font-weight: bold;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(feedback);
            }

            feedback.textContent = `Showing ${count} product(s)`;
            feedback.style.opacity = '1';

            // Hide after 2 seconds
            setTimeout(() => {
                feedback.style.opacity = '0';
            }, 2000);
        }

        // Auto-apply filters on checkbox change (optional)
        document.addEventListener('DOMContentLoaded', function() {
            const checkboxes = document.querySelectorAll('.filter-checkbox-input');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    updateActiveFilters();
                    // Uncomment the line below to auto-apply filters without clicking Submit
                    // applyFilters();
                });
            });
        });

        // Add some interactive effects
        document.querySelectorAll('.product-showcase-card').forEach(card => {
            card.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Logo card interactions
        document.querySelectorAll('.logo-showcase-card').forEach(card => {
            card.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
