import GerenciadorCinema from "../modelo/GerenciadorCinema.js";

export default class ControllerReservas {

    constructor(){
        this.pegarSessoes();
        this.pegarClientes();
        this.tabela();
        this.dbS;
        this.dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];

    }

    pegarSessoes(){
        let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        let html = "<option value=''>Selecione uma Sessão</option>";
        dbSessoes.forEach(item => {
            html += `
                <option value="${item.id}">${
                    "Sessão " + item.id + " - " +
                    item.filme + ", " +
                    item.sala + ", " +
                    item.dia.split("-")[2] + "/" + item.dia.split("-")[1] + "/" + item.dia.split("-")[0] + ", " +
                    item.hora + ", " +
                    item.dubleg + ", " +
                    item.tresD
                }</option>
            `;
        });
        document.getElementById("sessao").innerHTML = html;
    }

    pegarClientes(){
        let dbClientes = localStorage.getItem("clientes") != null ? JSON.parse(localStorage.getItem("clientes")) : [];
        let html = "<option value=''>Selecione um Cliente</option>";
        dbClientes.forEach(item => {
            html += `
                <option value="${item.id}">${item.nome}</option>
            `;
        });
        document.getElementById("cliente").innerHTML = html;
    }

    pegarCadeiras(){
        let sessaoId = document.getElementById("sessao").value;
        let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        dbSessoes.forEach((item, c) => {
            if(sessaoId == item.id){
                let html = "";
                let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
                let fileiras = ["A","B","C","D","E","F"];
                dbSessoes[c].cadeiras.forEach((itemC, i) => {
                    html += `
                    <div class="row">
                        <div class="col-md-1 cadeira" style="border: 0; background-color: transparent; color: black; font-weight: bold;">${fileiras[i]}</div>`;
                        for(let d = 0; d < 10; d++){  
                                if(itemC[d] == 0){
                                    html += `<div class="cadeira desmarcada col-md-1" id="${"i"+i+"d"+d}" onclick="controllerReservas.marcar(${c}, ${i}, ${d}, '${"i"+i+"d"+d}')">${d+1}</div>`;
                                } else {
                                    html += `<div class="cadeira marcada col-md-1" id="${"i"+i+"d"+d}" onclick="controllerReservas.marcar(${c}, ${i}, ${d}, '${"i"+i+"d"+d}')">${d+1}</div>`;
                                }
                            }
                        html += "</div>";
                });
                document.querySelector(".sala").innerHTML = html;
            }
        });
    }

    marcar(sl, cd, pos, fill){
        // let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        if(document.getElementById(fill).style.backgroundColor == "red"){
            document.getElementById(fill).style.backgroundColor = "green";
        } else {
            document.getElementById(fill).style.backgroundColor = "red";
        }
        if(this.dbSessoes[sl].cadeiras[cd][pos] == 1){
            this.dbSessoes[sl].cadeiras[cd][pos] = 0;
        } else {
            this.dbSessoes[sl].cadeiras[cd][pos] = 1;
        }
        this.dbS = this.dbSessoes;
    }

    tabela(){
        let dbSessoes = localStorage.getItem("sessoes") != null ? JSON.parse(localStorage.getItem("sessoes")) : [];
        let cadeirasVazias = 0;
        function cv(c){
            dbSessoes[c].cadeiras.forEach(cad => {
                cad.forEach(c => {
                    if(c == 0){
                        cadeirasVazias++;
                    }
                })
            })
        }
        let html = "";
        dbSessoes.forEach((item, c) => {
            cv(c);
            html += `
                <tr>
                    <td>Sessão ${item.id}</td>
                    <td>${item.filme}</td>
                    <td>${item.sala}</td>
                    <td>${item.dia.split("-")[2] + "/" + item.dia.split("-")[1] + "/" + item.dia.split("-")[0]} | ${item.hora}</td>
                    <td>`+ cadeirasVazias +`</td>
                </tr>
            `;
            cadeirasVazias = 0;
        });
        document.querySelector("tbody").innerHTML = html;
    }

    salvar(){
        localStorage.setItem("sessoes", JSON.stringify(this.dbS));
        this.pegarCadeiras();
        location.reload();
    }

    cancelar(){
        location.reload();
    }

}