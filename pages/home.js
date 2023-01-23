function logout(){
    firebase.auth().signOut().then(function () {

      window.location.href="../index.html"
    }).catch(()=> {
    
        alert('Erro ao fazer logout')
    });
}
