import Cliente from "../modelo/Cliente.js";

export default class Controller {

    constructor(){
        new Cliente().mostrar();
        this.indice = -1;
    }
    
    salvar(){
        let nome = document.getElementById("nome").value;
        let idade = document.getElementById("idade").value;
        let email = document.getElementById("email").value;

        let cliente = new Cliente(nome, idade, email);
        cliente.salvar(this.indice);
        this.cancelar();
        cliente.mostrar();
    }

    cancelar(){
        document.getElementById("nome").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("email").value = "";
        this.indice = -1;
    }

    editar(id){
        let objEscolhido = new Cliente().buscarPorId(id);
        document.getElementById("nome").value = objEscolhido[0].nome;
        document.getElementById("idade").value = objEscolhido[0].idade;
        document.getElementById("email").value = objEscolhido[0].email;
        this.indice = objEscolhido[1];
    }

    apagar(id){
        let r = confirm("Deseja mesmo deletar este registro?");
        if(r){
            let indice = new Cliente().buscarPorId(id);
            new Cliente().deletar(indice[1]);
        }
    }
}