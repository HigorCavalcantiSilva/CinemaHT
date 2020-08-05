import Filme from "../modelo/Filme.js";

export default class ControllerFilme {

    constructor(){
        new Filme().mostrar();
        this.indice = -1;
    }

    salvar(){
        let titulo = document.getElementById("titulo").value;
        let duracao = document.getElementById("duracao").value;
        let classificacao = document.getElementById("classificacao").value;

        let filme = new Filme(titulo, duracao, classificacao);
        filme.salvar(this.indice);
        filme.mostrar();
        this.cancelar();
    }

    cancelar(){
        document.getElementById("titulo").value = "";
        document.getElementById("duracao").value = "";
        document.getElementById("classificacao").value = "";
        this.indice = -1;
    }

    editar(id){
        let indice = new Filme().buscarPorId(id);
        document.getElementById("titulo").value = indice[0].titulo;
        document.getElementById("duracao").value = indice[0].duracao;
        document.getElementById("classificacao").value = indice[0].classificacao;
        this.indice = indice[1];        
    }

    apagar(id){
        let r = confirm("Deseja mesmo deletar este item?");
        if(r){
            let indice = new Filme().buscarPorId(id);
            new Filme().deletar(indice[1]);
        }
    }

}