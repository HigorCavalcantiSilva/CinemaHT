export default class Sala {

    constructor(sala){
        this.sala = sala;
    }

    salvar(indice){
        let dbSalas = localStorage.getItem("salas") != null ? JSON.parse(localStorage.getItem("salas")) : [];
        let objSala = {
            id: dbSalas.length < 1 ? 1 : dbSalas[dbSalas.length-1].id + 1,
            sala: this.sala,
        }
        if(indice == -1){
            dbSalas.push(objSala);
        } else {
            dbSalas[indice].sala = this.sala;
        }
        localStorage.setItem("salas", JSON.stringify(dbSalas));
    }

    deletar(indice){
        let dbSalas = localStorage.getItem("salas") != null ? JSON.parse(localStorage.getItem("salas")) : [];
        dbSalas.splice(indice, 1);
        localStorage.setItem("salas", JSON.stringify(dbSalas));
        this.mostrar();
    }

    mostrar(){
        let dbSalas = localStorage.getItem("salas") != null ? JSON.parse(localStorage.getItem("salas")) : [];
        let html = "";
        dbSalas.forEach(sala => {
            html += `
                <tr>
                    <td>${sala.sala}</td>
                    <td>
                        <img onclick="controllerSala.editar(${sala.id})" style="cursor: pointer; margin-right: 10px" width="23" src="../../img/edit.png">
                        <img onclick="controllerSala.apagar(${sala.id})" style="cursor: pointer" width="23" src="../../img/trash.png">
                    </td>
                </tr>
            `;
        }); 
        document.querySelector("tbody").innerHTML = html;
    }

    buscarPorId(id){
        let dbSalas = localStorage.getItem("salas") != null ? JSON.parse(localStorage.getItem("salas")) : [];
        for(let c = 0; c < dbSalas.length; c++){
            if(dbSalas[c].id == id){
                return [dbSalas[c], c];
            }
        }
    }

}