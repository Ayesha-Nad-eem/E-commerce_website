document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form Validation Helper Functions
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        // Basic phone validation (at least 8 characters, can include +, -, spaces, and brackets)
        const re = /^[+]?[\d\s\-\(\)]{8,}$/;
        return re.test(String(phone));
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
                // e.currentTarget.submit();
                alert('Login successful! (Validation passed)');
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
            const firstName = document.getElementById('regFirstName');
            const lastName = document.getElementById('regLastName');
            const phone = document.getElementById('regPhone');
            const username = document.getElementById('regUsername');
            const email = document.getElementById('regEmail');
            const password = document.getElementById('regPassword');

            // Generic required field validation
            const validateRequired = (input) => {
                if (!input.value.trim()) {
                    setFieldStatus(input, false);
                    isFormValid = false;
                } else {
                    setFieldStatus(input, true);
                }
            };

            validateRequired(firstName);
            validateRequired(lastName);
            validateRequired(username);
            validateRequired(password);

            // Phone specific validation
            if (!phone.value.trim() || !validatePhone(phone.value)) {
                setFieldStatus(phone, false);
                isFormValid = false;
            } else {
                setFieldStatus(phone, true);
            }

            // Email specific validation
            if (!email.value.trim() || !validateEmail(email.value)) {
                setFieldStatus(email, false);
                isFormValid = false;
            } else {
                setFieldStatus(email, true);
            }

            if (isFormValid) {
                console.log('Register form submitted successfully!');
                // e.currentTarget.submit();
                alert('Registration successful! (Validation passed)');
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
            }
        });
    });
});
