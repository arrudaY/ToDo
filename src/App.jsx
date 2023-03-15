import { useState } from "react";

import ImgAly from "./assets/aly.jpg"

function App() {

  const [id, setId]                     = useState("");
  const [titulo, setTitulo]             = useState("");
  const [categoria, setCategoria]       = useState("");
  const [data, setData]                 = useState("");
  const [descricao, setDescricao]       = useState("");
  const [listaTarefas, setListaTarefas] = useState([]);

  const today = new Date();
  const date  = `${today.getDate()}/${today.getMonth()+1}`;
  

  function novaTarefa(event) {
    event.preventDefault();

    if (titulo === "") {
      alert("Dê um título para a sua tarefa");
      return;
    }

    if (id) {
      const copiaTarefasString  = JSON.stringify(listaTarefas);
      const copiaTarefas        = JSON.parse(copiaTarefasString);
      const index               = copiaTarefas.findIndex((tarefa) => tarefa.id === id);
 
      copiaTarefas[index].titulo     = titulo;
      copiaTarefas[index].categoria  = categoria;
      copiaTarefas[index].data       = data;
      copiaTarefas[index].descricao  = descricao;

      setListaTarefas(copiaTarefas);
      
    } else {
      setListaTarefas([
        ...listaTarefas,
        {
          id:         Date.now(),
          titulo:     titulo,
          categoria:  categoria,
          data:       Date.now(),
          descricao:  descricao,
        },
      ]);
    }

    setId("");
    setTitulo("");
    setCategoria("");
    setData("");
    setDescricao("");
  }

  function deletarTarefa(id){
    if(confirm("Excluir tarefa?")) {
      const result = listaTarefas.filter((tarefa) => tarefa.id !== id);
      setListaTarefas(result);
    }
  }

  function editarTarefa(tarefa) {
    setId         (tarefa.id);
    setTitulo     (tarefa.titulo);
    setCategoria  (tarefa.categoria);
    setData       (tarefa.data);
    setDescricao  (tarefa.descricao);
  }

  return (
    <div className="row">
      <div className="column left">

        <h1>ToDo</h1>
          
        <form onSubmit = {novaTarefa}>

            <input
              required
              value       = {titulo}
              onChange    = {(event) => setTitulo (event.target.value)}
              placeholder = "Nova tarefa..."
            />

            <select
              value       = {categoria}
              onChange    = {(event) => setCategoria (event.target.value)}
            >
              <option value = ""           >Selecione uma opção </option>
              <option value = "trabalho"   >Trabalho</option>
              <option value = "lazer"      >Lazer</option>
              <option value = "prioridade" >Prioridade</option>
              <option value = "outros"     >Outros</option>
            </select>

            <input
              type        = "date"
              value       = {data}
              onChange    = {(event) => setData (event.target.value)}
              placeholder = "Data"
              //min         = Date.now()
            />
      
            <textarea
              cols        = "1"
              rows        = "4"
              value       = {descricao}
              onChange    = {(event) => setDescricao (event.target.value)}
              placeholder = "Descrição"
            ></textarea>

            <input
              className = "btnSave"
              type      = "submit"
              value     = {"Salvar"}
            />
          </form>
        </div>

        <div className="column right">
    
          <div className="today">
            <p>{date}</p>
          </div>
      
          {listaTarefas.length > 0 ? (
            <ul>
              {listaTarefas.map((tarefa) => (
                <li
                  className="card"
                  key = {tarefa.id}>
                    <p className="taskTitle">{tarefa.titulo}</p>
                    <p className="taskDescription">{tarefa.descricao}</p>
                    <div className="bar"></div>
                    
                    <p className="taskCategory">{tarefa.catergoria}</p>

                    <div className="inf">
                      <div><p>{tarefa.data}</p></div>
                      <div className="cardBtns">
                        <button onClick={() => editarTarefa(tarefa)}>
                          <span class="material-symbols-outlined">edit</span>
                        </button>

                        <button onClick={() => deletarTarefa(tarefa.id)}>
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empyt">
              <img src={ImgAly} alt=""/>
              <p>Não há tarefas ainda</p>
            </div>
            
          )}      
        </div>
    </div>
  );
}

export default App;