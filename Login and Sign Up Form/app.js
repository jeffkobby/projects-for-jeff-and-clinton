let timeout
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
const password = document.getElementById('signUpPassword')
const confirmPassword = document.getElementById('confirmPassword')
const passwordStrength = document.getElementById('passwordStrength')
const passwordMatch = document.getElementById('passwordMatch')

//The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, 
//without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', () => {  
    // selectors
    const loginForm = document.getElementById('login')
    const createAccountForm = document.getElementById('createAccount')
    const linkLogin = document.getElementById('linkLogin')
    const linkCreateAccount = document.getElementById('linkCreateAccount')
    const inputElements = document.querySelectorAll('.form__input')
    
    // event listeners

    // function to display sign up form to user if user does not have an account
    linkCreateAccount.addEventListener('click', (event) =>{
        event.preventDefault()
        loginForm.classList.toggle('form--hidden')
        createAccountForm.classList.toggle('form--hidden')
    })
    
    // function to take user back to the login page if user account already exists
    linkLogin.addEventListener('click', (event) =>{
        event.preventDefault()
        createAccountForm.classList.toggle('form--hidden')
        loginForm.classList.toggle('form--hidden')
    })
    
    // function to submit the form to servers
    // needs to be completed
    loginForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        
        // fetch code goes here
        formStatusMessage(loginForm, "error", "Invalid username/password combination")
        
    })

    // function to run other functions on all DOM inputs
    inputElements.forEach(inputElement => {

        // show error message to user if user clicks out of input element 
        // and does not satisfy the condition/requirement
        inputElement.addEventListener('blur', event =>{
            event.preventDefault()
            if(event.target.id === "signupUsername" && event.target.value.length < 10){
                inputStatusMessage(inputElement, "username cannot be less than 10 characters")
            }
        })

        // check password strength
        password.addEventListener('blur', () =>{
            clearTimeout(timeout)
            timeout = setTimeout(() =>    
            passwordStrengthChecker(password.value), 500);
        })

        // compare the two password inputs
        confirmPassword.addEventListener('input', ()=>{
            comparePasswords(password, confirmPassword)
        })



        // clear error message from DOM
        inputElement.addEventListener('input', event =>{
            clearInputStatusMessage(inputElement)
        })

    })
})


// functions

// function to display current status of submitted form.
// NB: needs to be used with sign up form
function formStatusMessage(formElement, type, message){
    const messageElement = formElement.querySelector('.form__message')

    messageElement.textContent = message
    messageElement.classList.remove('form__message--error', 'form__message--success')
    messageElement.classList.add(`form__message--${type}`)
}

// function to display error message of selected input.
// NB: needs to be used with sign in form
function inputStatusMessage(inputElement, message){
    inputElement.classList.add('form__input--error')
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = message
}

// function to clear error message
function clearInputStatusMessage(inputElement){
    inputElement.classList.remove('form__input--error')
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = ""
}

// function to check password strength
function passwordStrengthChecker(userPassword){

    if (strongPassword.test(userPassword)){
        passwordStrength.style.display = "block"
        passwordStrength.style.backgroundColor = "var(--color-primary-dark)"
        passwordStrength.textContent = "Strong Password"
        setTimeout(() => {
            passwordStrength.style.display = "none"
            passwordStrength.style.transition = "all 2s ease-in;"
        }, 2000)
    }  
    
    else if(mediumPassword.test(userPassword)){
        passwordStrength.style.display = "block"
        passwordStrength.style.backgroundColor = "var(--color-secondary)"
        passwordStrength.textContent = "Medium Strength Password"
        setTimeout(() => {
            passwordStrength.style.display = "none"
            passwordStrength.style.transition = "all 2s ease-in;"
        }, 2000)
    }

    else{
        passwordStrength.style.display = "block"
        passwordStrength.style.backgroundColor = "var(--color-error)"
        passwordStrength.textContent = "Weak Password"
        setTimeout(() => {
            passwordStrength.style.display = "none"
        }, 2000)
    }

}

// function to compare passwords
function comparePasswords(passwordInput, confirmInput){
    if(passwordInput.value === confirmInput.value){
        setTimeout(()=>{
            passwordMatch.style.display = "block"   
            passwordMatch.style.background = "var(--color-primary-dark)"
            passwordMatch.textContent = "Password match"
        }, 3000)
        
    } else{
        setTimeout(()=>{
            passwordMatch.style.display = "block"
            passwordMatch.style.background = "var(--color-error)"
            passwordMatch.textContent = "Password do not match"
        }, 3000)

    }
}