export default class Cliente {

    constructor(nome, idade, email){
        this.nome = nome;
        this.idade = idade;
        this.email = email;
    }

    salvar(indice){
        let dbClientes = localStorage.getItem("clientes") != null ? JSON.parse(localStorage.getItem("clientes")) : [];
        let newCliente = {
            id: dbClientes.length < 1 ? 1 : dbClientes[dbClientes.length-1].id + 1,
            nome: this.nome,
            idade: this.idade,
            email: this.email
        };

        if(indice == -1){
            dbClientes.push(newCliente);
        } else {
            dbClientes[indice].nome = this.nome;
            dbClientes[indice].idade = this.idade;
            dbClientes[indice].email = this.email;
        }

        localStorage.setItem("clientes", JSON.stringify(dbClientes));
    }

    deletar(indice){
        let dbClientes = localStorage.getItem("clientes") != null ? JSON.parse(localStorage.getItem("clientes")) : [];
        dbClientes.splice(indice, 1);
        localStorage.setItem("clientes", JSON.stringify(dbClientes));
        this.mostrar();
    }

    mostrar(){
        let dbClientes = localStorage.getItem("clientes") != null ? JSON.parse(localStorage.getItem("clientes")) : [];
        let html = "";
        dbClientes.forEach(linha => {
            html += `<tr>
                        <td>${linha.nome}</td>
                        <td>${linha.idade}</td>
                        <td>${linha.email}</td>
                        <td>
                            <img onclick="controllerCliente.editar(${linha.id})" style="cursor: pointer; margin-right: 10px" width="23" src="../../img/edit.png">
                            <img onclick="controllerCliente.apagar(${linha.id})" style="cursor: pointer" width="23" src="../../img/trash.png">
                        </td>
                    </tr>`;
        });
        document.querySelector("tbody").innerHTML = html;
    }

    buscarPorId(id){
        let dbClientes = localStorage.getItem("clientes") != null ? JSON.parse(localStorage.getItem("clientes")) : [];
        for(let c = 0; c < dbClientes.length; c++){
            if(dbClientes[c].id == id){
                return [dbClientes[c], c];
            }
        }
    }

}