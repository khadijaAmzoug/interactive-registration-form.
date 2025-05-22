const form = document.getElementById('registrationForm');
const username = document.getElementById("username");
const email = document.getElementById("email");
const password =document.getElementById ("password");
const confirmPassword = document.getElementById("confirmPassword");

const usernameError= document.getElementById("usernameError")
const emailError = document.getElementById ("emailError")
const passwordError = document.getElementById("passwordError")
const confirmPasswordError= document.getElementById("confirmPasswordError")
const successMessage= document.getElementById("successMessage")


const savedUsername = localStorage.getItem('username');
if (savedUsername) {
  username.value = savedUsername;
}


function showError (input, message, errorSpan){
    errorSpan.textContent = message;
    input.classList.add ("invalid");
}

function clearError (input, errorSpan){
     errorSpan.textContent = "";
     input.classList.remove ("invalid");

}

function validateUsername(){
    if(username.validity.valueMissing){
       showError (username, "Username is required", usernameError);
    }
    else if (username.value.length < 3) {
        showError (username, "Username shold be at least 3 characters", usernameError);
    }
    else { clearError(username, usernameError)
    }
}


function validateEmail() {
    if(email.validity.valueMissing){
       showError (email, "email is required", emailError);
    }
    else if (email.validity.typeMismatch) {
        showError (email, "please enter a valid Email", emailError);
    }
    else { clearError(email, emailError)
    }
}

function validatePassword()
 {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(password.validity.valueMissing){
       showError (password, "password is required", passwordError);
    }
    else if (!pattern.test(password.value)) {
        showError (password, "Password must contain at least 8 characters, including uppercase, lowercase, and a number", passwordError);}
    
    else { clearError(password, passwordError)
    }
}


function validateConfirmPassword()
 {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(confirmPassword.validity.valueMissing){
       showError (confirmPassword, "confirmPassword is required", confirmPasswordError);
    }
    else if (!pattern.test(confirmPassword.value)) {
        showError (confirmPassword, "confirmPassword must contain at least 8 characters, including uppercase, lowercase, and a number", confirmPasswordError);}
    
    else { clearError(confirmPassword, confirmPasswordError)
    }
}



username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);


form.addEventListener('submit', function (e){
     e.preventDefault();
     validateUsername();
     validateEmail();
    validatePassword();
    validateConfirmPassword();

     const isFormValid =
    username.checkValidity() &&
    email.checkValidity() &&
    password.checkValidity() &&
    confirmPassword.value=== password.value;

     if (isFormValid) {

    localStorage.setItem('username', username.value.trim());

    successMessage.textContent='Registration successful!'
    successMessage.style.color = 'green'

   // alert('Registration successful!');
    form.reset();
  }
});


