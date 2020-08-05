function cadastrar() {

    let nome = document.getElementById("nome").value;
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    if(nome == "" || usuario == "" || senha == ""){

        alert("Um ou mais campos estão vazios! Por favor preencha-os.");

    } else {

        let objUsuario = {
            nome: nome,
            usuario: usuario,
            senha: senha
        };
        
        let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
        
        if(listaUsuarios == null){
            listaUsuarios = [];
        }
        
        let c = carregarUsuario(listaUsuarios, usuario);

        listaUsuarios.push(objUsuario);    
    
        if(c < 0){
            localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
            document.getElementById("nome").value = "";
            document.getElementById("usuario").value = "";
            document.getElementById("senha").value = "";
        } else {
            alert("Este usuário ja existe! Por favor digite outro nome no campo usuário.");
        }

    }

}

function carregarUsuario(lista, usuario){
    for(let d = 0; d < lista.length; d++){
        if(lista[d].usuario.toUpperCase() == usuario.toUpperCase()){
            return d;
        }
    }
    return -1
}

function logar() {

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

    let c = carregarUsuario(listaUsuarios, usuario);

    if(c > -1){
        if(listaUsuarios[c].senha == senha){
            location.href = "./dashboard.html";
        } else {
            alert("Usuário ou senha incorretos! Tente novamente.")
        }
    } else {
        alert("Este usuário não foi encontrado! Tente novamente.");
    }
}