import Sala from "../modelo/Sala.js";

export default class ControllerSala {

    constructor(){
        this.indice = -1;
        new Sala().mostrar()
    }

    salvar(){
        let sl = document.getElementById("sala").value;
        let sala = new Sala(sl);
        sala.salvar(this.indice);
        sala.mostrar();
        this.cancelar();
        this.indice =  -1;
    }

    editar(id){
        let indice = new Sala().buscarPorId(id);
        document.getElementById("sala").value = indice[0].sala;
        this.indice = indice[1];
    }

    apagar(id){
        let r = confirm("Deseja mesmo apagar este registro?");
        if(r){
            let indice = new Sala().buscarPorId(id);
            new Sala().deletar(indice[1]);
        }
    }

    cancelar(){
        document.getElementById("sala").value = "";
        this.indice =  -1;
    }


}