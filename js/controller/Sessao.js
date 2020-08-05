import Sessao from "../modelo/Sessao.js";

export default class ControllerSessao {

    constructor(){
        this.pegarFilmes();
        this.pegarSalas();
        new Sessao().mostrar();
        this.indice = -1;
    }

    pegarFilmes(){
        let dbFilmes = localStorage.getItem("filmes") != null ? JSON.parse(localStorage.getItem("filmes")) : [];
        let html = "<option value=''>Selecione o Filme</option>";
        dbFilmes.forEach(item => {
            html += `
                <option value="${item.titulo}">${item.titulo}</option>
            `;
        });
        document.getElementById("filme").innerHTML = html;
    }

    pegarSalas(){
        let dbSalas = localStorage.getItem("salas") != null ? JSON.parse(localStorage.getItem("salas")) : [];
        let html = "<option value=''>Selecione a Sala</option>";
        dbSalas.forEach(item => {
            html += `
                <option value="${item.sala}">${item.sala}</option>
            `;
        });
        document.getElementById("sala").innerHTML = html;
    }

    salvar(){
        let filme = document.getElementById("filme").value;
        let sala = document.getElementById("sala").value;
        let dubleg = document.getElementById("dubleg").value;
        let tresD = document.getElementById("tresD").value;
        let dia = document.getElementById("dia").value;
        let hora = document.getElementById("hora").value;

        let sessao = new Sessao(filme, sala, dubleg, tresD, dia, hora);
        sessao.salvar(this.indice);
        sessao.mostrar();
        this.cancelar();
    }

    cancelar(){
        document.getElementById("filme").value = "";
        document.getElementById("sala").value = "";
        document.getElementById("dubleg").value = "";
        document.getElementById("tresD").value = "";
        document.getElementById("dia").value = "";
        document.getElementById("hora").value = "";
        this.indice = -1;
    }

    editar(id){
        let indice = new Sessao().buscarPorId(id);
        document.getElementById("filme").value = indice[0].filme;
        document.getElementById("sala").value = indice[0].sala;
        document.getElementById("dubleg").value = indice[0].dubleg;
        document.getElementById("tresD").value = indice[0].tresD;
        document.getElementById("dia").value = indice[0].dia;
        document.getElementById("hora").value = indice[0].hora;
        this.indice = indice[1];
    }

    apagar(id){
        let r = confirm("Deseja mesmo excluir este item?");
        if(r){
            let indice = new Sessao().buscarPorId(id);
            new Sessao().deletar(indice[1]);
        }
    
    }

}