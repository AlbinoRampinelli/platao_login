/*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.relace("../index.html");
    }
})*/




function onChangeEmail(){

    const email= form.email().value;
    form.emailObrigatorio().style.display = email ? "none": "block";

    form.emailInvalido().style.display = validateEmail(email) ? "none" : "block";

}

function onChangePassword(){

    const password = form.password().value;
    form.passwordObrigatorio().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block"
    validatePasswordsMatch();
    toggleRegisterButtonDisable()
    
}

function onChangeConfirmPassword(){
    validatePasswordsMatch();
    toggleRegisterButtonDisable()
    

}

function register() {
    showLoading();
    const email = form.email().value;
    const password = form.password().value; 
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>{
        hedeLoading();
        console.log("Fui cadastrado");
        window.location.href="../pages/home.html"
    }).catch(error => {
        hideLoading();
        console.log("Não fui cadastrado");
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use" ){
        return "Email já esta em uso !!!"
    }
    return error.message;
}
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoesntMatchError().style.display = 
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }
    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
        
    }
    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }
    return true;
}
const form = {
    confirmPassword: ()=> document.getElementById("confirmPassword"),
    confirmPasswordDoesntMatchError: ()=> document.getElementById("password-doesnt-match-error"),
    email: () => document.getElementById("email"),
    emailObrigatorio: () => document.getElementById("email-obrigatorio"),
    emailInvalido: () => document.getElementById("email-invalido"),
    password: () => document.getElementById("password"),
    passwordObrigatorio: () => document.getElementById("password-obrigatorio"),
    passwordMinLengthError: () => document.getElementById("password-min-length-error"),
    registerButton: () => document.getElementById("register-button")
}