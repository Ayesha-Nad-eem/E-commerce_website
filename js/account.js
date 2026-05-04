document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    });

    // Form Validation Helper Functions
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const setFieldStatus = (inputElement, isValid) => {
        const formGroup = inputElement.closest('.form-group');
        if (isValid) {
            formGroup.classList.remove('has-error');
        } else {
            formGroup.classList.add('has-error');
        }
    };

    // Validate Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            const username = document.getElementById('loginUsername');
            const password = document.getElementById('loginPassword');

            // Username/Email Validation
            if (!username.value.trim()) {
                setFieldStatus(username, false);
                isFormValid = false;
            } else {
                setFieldStatus(username, true);
            }

            // Password Validation
            if (!password.value) {
                setFieldStatus(password, false);
                isFormValid = false;
            } else {
                setFieldStatus(password, true);
            }

            if (isFormValid) {
                console.log('Login form submitted successfully!');
                alert('Login validation passed.');
                // e.currentTarget.submit();
            }
        });
    }

    // Validate Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            // Fields to validate
            const username = document.getElementById('regUsername');
            const email = document.getElementById('regEmail');
            const password = document.getElementById('regPassword');
            const confirmPassword = document.getElementById('regConfirmPassword');

            // Generic required field validation
            const validateRequired = (input) => {
                if (!input.value.trim()) {
                    setFieldStatus(input, false);
                    isFormValid = false;
                } else {
                    setFieldStatus(input, true);
                }
            };

            validateRequired(username);
            validateRequired(password);

            // Email specific validation
            if (!email.value.trim() || !validateEmail(email.value)) {
                setFieldStatus(email, false);
                isFormValid = false;
            } else {
                setFieldStatus(email, true);
            }

            // Confirm Password validation
            if (!confirmPassword.value.trim() || confirmPassword.value !== password.value) {
                setFieldStatus(confirmPassword, false);
                isFormValid = false;
            } else {
                setFieldStatus(confirmPassword, true);
            }

            if (isFormValid) {
                console.log('Register form submitted successfully!');
                alert('Registration validation passed. Passwords match.');
                // e.currentTarget.submit();
            }
        });
    }

    // Real-time validation clearing when typing
    const allInputs = document.querySelectorAll('.auth-form input');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                const formGroup = this.closest('.form-group');
                formGroup.classList.remove('has-error');
                
                // Special check for confirm password while typing
                if (this.id === 'regConfirmPassword') {
                    const pass = document.getElementById('regPassword');
                    if (this.value === pass.value) {
                        formGroup.classList.remove('has-error');
                    } else if (this.value.length > 0) {
                        formGroup.classList.add('has-error');
                    }
                }
                if (this.id === 'regPassword') {
                    const confirmPass = document.getElementById('regConfirmPassword');
                    if (confirmPass.value.length > 0) {
                        const confirmGroup = confirmPass.closest('.form-group');
                        if (this.value === confirmPass.value) {
                            confirmGroup.classList.remove('has-error');
                        } else {
                            confirmGroup.classList.add('has-error');
                        }
                    }
                }
            }
        });
    });

    // Smooth scroll for 'scroll to top'
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll top button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });
    }
});
