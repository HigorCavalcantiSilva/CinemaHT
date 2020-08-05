export default class Sessao {

    constructor(filme, sala, dubleg, tresD, dia, hora){
        this.data = dia;
        this.horarioInicio = hora;
        this.legendado = dubleg;
        this.tresD = tresD;
        this.sala = sala;
        this.filme = filme;
        this.cadeiras = 
        [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ];
    }

    salvar(indice){
        let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        let objSessoes = {
            id: dbSessoes.length < 1 ? 1 : dbSessoes[dbSessoes.length-1].id + 1,
            filme: this.filme,
            sala: this.sala,
            dubleg: this.legendado,
            tresD: this.tresD,
            dia: this.data,
            hora: this.horarioInicio,
            cadeiras: this.cadeiras
        }

        if(indice == -1){
            dbSessoes.push(objSessoes);
        } else {
            dbSessoes[indice].filme = this.filme,
            dbSessoes[indice].sala = this.sala,
            dbSessoes[indice].dubleg = this.legendado,
            dbSessoes[indice].tresD = this.tresD,
            dbSessoes[indice].dia = this.data,
            dbSessoes[indice].hora = this.horarioInicio
        }

        localStorage.setItem("sessoes", JSON.stringify(dbSessoes));
    }

    mostrar(){
        let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        let html = "";
        dbSessoes.forEach(item => {
            html += `
                <tr>
                    <td>${item.filme}</td>
                    <td>${item.dia.split("-")[2] + "/" + item.dia.split("-")[1] + "/" + item.dia.split("-")[0]}</td>
                    <td>${item.hora}</td>
                    <td>${item.dubleg}</td>
                    <td>${item.sala}</td>
                    <td>${item.tresD}</td>
                    <td>
                        <img onclick="controllerSessoes.editar(${item.id})" style="cursor: pointer; margin-right: 10px" width="23" src="../../img/edit.png">
                        <img onclick="controllerSessoes.apagar(${item.id})" style="cursor: pointer" width="23" src="../../img/trash.png">
                    </td>
                </tr>
            `;
        });
        document.querySelector("tbody").innerHTML = html;
    }

    deletar(indice){
        let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        dbSessoes.splice(indice, 1);
        localStorage.setItem("sessoes", JSON.stringify(dbSessoes));
        this.mostrar();
    }

    buscarPorId(id){
        let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        for(let c = 0; c < dbSessoes.length; c++){
            if(dbSessoes[c].id == id){
                return [dbSessoes[c], c];
            }
        }
    }
}