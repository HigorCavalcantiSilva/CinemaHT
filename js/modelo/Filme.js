export default class Filme {

    constructor(titulo, duracao, classificacao){
        this.titulo = titulo;
        this.duracao = duracao;
        this.classificacao = classificacao;
    }

    salvar(indice){
        let dbFilmes = localStorage.getItem("filmes") != null ? JSON.parse(localStorage.getItem("filmes")) : [];
        let objFilmes = {
            id: dbFilmes.length < 1 ? 1 : dbFilmes[dbFilmes.length-1].id + 1,
            titulo: this.titulo,
            duracao: this.duracao,
            classificacao: this.classificacao
        }
        
        if(indice == -1){
            dbFilmes.push(objFilmes);
        } else {
            dbFilmes[indice].titulo = this.titulo;
            dbFilmes[indice].duracao = this.duracao;
            dbFilmes[indice].classificacao = this.classificacao;
        }

        localStorage.setItem("filmes", JSON.stringify(dbFilmes));
    }

    mostrar(){
        let dbFilmes = localStorage.getItem("filmes") != null ? JSON.parse(localStorage.getItem("filmes")) : [];
        let html = "";
        dbFilmes.forEach(item => {
            html += `
                <tr>
                    <td>${item.titulo}</td>
                    <td>${item.duracao}</td>
                    <td>${item.classificacao}</td>
                    <td>
                        <img onclick="controllerFilme.editar(${item.id})" style="cursor: pointer; margin-right: 10px" width="23" src="../../img/edit.png">
                        <img onclick="controllerFilme.apagar(${item.id})" style="cursor: pointer" width="23" src="../../img/trash.png">
                    </td>
                </tr>
            `;
        });
        document.querySelector("tbody").innerHTML = html;
    }

    deletar(indice){
        let dbFilmes = localStorage.getItem("filmes") != null ? JSON.parse(localStorage.getItem("filmes")) : [];
        dbFilmes.splice(indice, 1);
        localStorage.setItem("filmes", JSON.stringify(dbFilmes));
        this.mostrar();
    }

    buscarPorId(id){
        let dbFilmes = localStorage.getItem("filmes") != null ? JSON.parse(localStorage.getItem("filmes")) : [];
        for(let c = 0; c < dbFilmes.length; c++){
            if(dbFilmes[c].id == id){
                return [dbFilmes[c], c];
            }
        }
    }

}