/*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.relace("./pages/home.html");
    }
})*/






function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors()
}
/* ******** */

function login() { 
    showLoading()  
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
       hideLoading();
       //console.log("Estou logado !!!!");
        window.location.href="pages/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });   
}
/* ******** */

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(()=> {
        hideLoading();
        alert("Email enviado com sucesso !!!!")
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
/* ******** */

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password"){
        return "senha Invalida";
    }
    return error.message;
}
/* ******** */

function isEmailValid(){
    const email= form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}
/* ******** */

function toggleEmailErrors() {    
    const email= form.email().value;
    form.emailObrigatorio().style.display = email ? "none": "block";
    form.emailInvalido().style.display = validateEmail(email) ? "none" : "block";
}
/* ******** */

function togglePasswordErrors() {
    const password = form.password().value;
    if(!password){
        form.passwordObrigatorio().style.display = "block";
    }else {
        form.passwordObrigatorio().style.display = "none";
    } 
}

/* ******** */

function toggleButtonDisable() {
    const emailValid = isEmailValid();
   form.recoverPassword().disabled = !emailValid;
    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

/* ******** */

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}
/* ******** */

const form = {
    email: ()=> document.getElementById("email"),
    emailInvalido: ()=> document.getElementById("email-invalido"),
    emailObrigatorio: () => document.getElementById('email-obrigatorio'),
    loginButton: ()=> document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    recoverPassword: () =>  document.getElementById("recorver-password-button"),
    passwordObrigatorio: () => document.getElementById("password-obrigatorio")


} 
