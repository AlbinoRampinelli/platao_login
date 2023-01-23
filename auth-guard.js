firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("passei pelo guarda !!!!!")
        window.location.href="../index.html";
    }
}) 


