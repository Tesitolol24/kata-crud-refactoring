import React, { useRef, useContext, useState } from "react";
const HOST_API = "http://localhost:8080/api";

const Form = (parameterStore) => {
    const Store = parameterStore.parameterStore;
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
            completed: false
        };

        if (request["name"] !== ""&&request["name"] !== undefined) {
            fetch(HOST_API + "/todo", {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((todo) => {
                    dispatch({ type: "add-item", item: todo });
                    setState({ name: "" });
                    formRef.current.reset();
                });
        }else{
            alert("No puedes agregar una tarea vacia");
        }
        
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            isCompleted: item.isCompleted
        };

        console.log(request);
        if (request["name"] !== ""&&request["name"] !== undefined) {
            fetch(HOST_API + "/todo", {
                method: "PUT",
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((todo) => {
                    dispatch({ type: "update-item", item: todo });
                    setState({ name: "" });
                    formRef.current.reset();
                });
        }else{
            alert("No puedes editar una tarea vacia o debes hacer un cambio");
        }
    }

    return <form ref={formRef}>
        <input
            type="text"
            name="name"
            placeholder="¿Qué piensas hacer hoy?"
            defaultValue={item.name}
            className="inputToDo"
            onChange={(event) => {
                setState({ ...state, name: event.target.value })
            }}  ></input>
        {item.id && <button className="button buttonEdit" onClick={onEdit}>Actualizar</button>}
        {!item.id && <button className="button buttonAdd" onClick={onAdd}>Crear</button>}
    </form>
}

export default Form;