import "./home.css";
import Tarefa from "../../components/tarefas/tarefas";
import { useEffect, useState } from "react";


function Home(){

    const [tarefas, setTarefas ] = useState([]);
    const [descricao, setDescricao]= useState("");


    function ListarTarefas(){
        fetch ("http://localhost:3001/tarefas") 
        .then(function(response) {
            response.json().then(json => {
                setTarefas(json);
            }) 

        })
    }

    function AddTarefa(){
        const json = {
            descricao:descricao,
            concluido:"N"
        } 
        fetch ("http://localhost:3001/tarefas/",{
        method:"POST",
        body: JSON.stringify(json),
        headers:{
            "Content-Type":"Application/json"
        }
        })

        .then(function(response) {
           ListarTarefas();
           setDescricao("");
        })
        .catch(error =>{
            console.log (error);
        });
    }

    function DeleteTarefa(id_tarefa){       
        
        fetch ("http://localhost:3001/tarefas/" + id_tarefa, {
            method:"DELETE"
            })    
            .then(function(response){
               ListarTarefas();               
            })
            .catch(error =>{
                console.log (error);
            });          

    }

    function TarefaConcluida (id_tarefa,descricao, concluido){

        const json = {
            descricao:descricao,
            concluido: concluido == true ? "S" : "N"
        } 

        fetch ("http://localhost:3001/tarefas/" + id_tarefa,{
        method:"PUT",
        body: JSON.stringify(json),
        headers:{
            "Content-Type":"Application/json"
        }
        })

        .then(function(response) {
           ListarTarefas();
        })
        .catch(error =>{
            console.log (error);
        });

    }

    useEffect(function(){
        ListarTarefas();
    },[]);    



    return <>
     <div className="container-tasks">
        <span> Minhas Tarefas </span>
        <button onClick={ListarTarefas} className= "btn-refresh icon-green">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/></svg>
        </button>

        <div className="form-task">
            <input className="input-task"
                    type = "text"
                    placeholder="Descreva a Tarefa"
                    value={descricao}
                    onChange={function(e){
                        setDescricao(e.target.value);
                    }}
                    />
            <button onClick={AddTarefa} className="btn-task">Inserir Tarefa</button>
        </div>
        
        <div>
            {
                tarefas.map(function(tarefa){
                    return  <Tarefa key ={tarefa.id_tarefa}
                                    id_tarefa={tarefa.id_tarefa}
                                    descricao={tarefa.descricao}
                                    concluido={tarefa.concluido}
                                    onClickDelete ={DeleteTarefa}
                                    onClickConcluido = {TarefaConcluida}
                                    />
                })
            }
           
        </div>
    </div>

    <div className="footer">
        Feito com 💙 por Dev Miranda.
    </div>

    </>
}

export default Home;

