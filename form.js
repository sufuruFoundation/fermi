


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('successMessage');

    //REAL TIME UPDATE AS THE USER TYPES

    document.getElementById('name').addEventListener('input', clearError);
    document.getElementById('email').addEventListener('input', clearError);
    document.getElementById('phone').addEventListener('input', clearError);
    document.getElementById('date').addEventListener('change', clearError); 

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            successMessage.textContent = 'Appointment scheduled successfully!';
            successMessage.style.color = '#28a745';
            successMessage.style.fontWeight = 'bold';
            
            //loading state to button
            const submitBtn = form.querySelector('.submit-button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Scheduling... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            //processing
            setTimeout(() => {
                form.reset();
                successMessage.textContent = '';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                //confirmation Message
                successMessage.textContent = 'Appointment scheduled successfully! We will contact you shortly.';
                setTimeout(() => {
                    successMessage.textContent = '';
                }, 5000);
            }, 1500);
        }
    });

    //validation

    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        clearAllErrors();
        
        // Validate Name
        if (!validateName()) isValid = false;
        
        // Validate Email
        if (!validateEmail()) isValid = false;
        
        // Validate Phone
        if (!validatePhone()) isValid = false;
        
        // Validate Date
        if (!validateDate()) isValid = false;
        
        return isValid;
    }

    //VALIDATING NAME
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError('nameError', 'Name is required.');
            return false;
        }
        
        if (nameValue.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long.');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            showError('nameError', 'Name can only contain letters and spaces.');
            return false;
        }
        
        return true;
    }

    //VALIDATE EMAIL

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError('emailError', 'Email is required.');
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            showError('emailError', 'Please enter a valid email address.');
            return false;
        }
        
        return true;
    }

    //PHONE NUMBER VALIDATION
    
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^[\d\s\-\(\)\+]{10,15}$/;
        
        if (phoneValue === '') {
            showError('phoneError', 'Phone number is required.');
            return false;
        }
        
        // Remove non-digits for length check
        const digitsOnly = phoneValue.replace(/\D/g, '');
        
        if (digitsOnly.length < 10) {
            showError('phoneError', 'Phone number must be at least 10 digits.');
            return false;
        }
        
        if (digitsOnly.length > 15) {
            showError('phoneError', 'Phone number is too long.');
            return false;
        }
        
        return true;
    }

    //DATE VALIDATION
    function validateDate() {
        const dateInput = document.getElementById('date'); 
        const dateValue = dateInput.value;
        
        if (dateValue === '') {
            showError('dateError', 'Please select a date.');
            return false;
        }
        
        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        if (selectedDate < today) {
            showError('dateError', 'Invalid date.');
            return false;
        }
        
       // Restriction to within 1 year
        const maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() + 1);
        
        if (selectedDate > maxDate) {
            showError('dateError', 'Please select a date within the next year.');
            return false;
        }
        
        return true;
    }


    //SHOWERROR FUNCTION

    function showError(errorElementId, message) {
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        
        const inputId = errorElementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.style.borderColor = '#dc3545';
        }
    }

    function clearError(event) {
        const inputId = event.target.id;
        const errorElement = document.getElementById(inputId + 'Error');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        // Reset input styling
        event.target.style.borderColor = '';
    }

    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        // Reset all input borders
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
});