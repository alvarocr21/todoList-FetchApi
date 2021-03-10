import React, { useState, useEffect } from "react";

//create your first component
export function ToDoList() {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([]);

	useEffect(() => {
		// Actualiza el título del documento usando la API del navegador
		loadTodo();
	});

	let url = "https://assets.breatheco.de/apis/fake/todos/user/asolano";

	const loadTodo = () => {
		fetch(url, {
			method: "Get",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setTareas(data);
				console.log({ data });
			})
			.catch(error => console.error("Error:", error.message));
	};

	//loadTodo();

	const newUser = () => {
		let array = [];
		fetch(url, {
			method: "Post",
			body: JSON.stringify(array),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
			});
	};

	const updatetodo = tareas => {
		fetch(url, {
			method: "Put",
			body: JSON.stringify(tareas),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
				alert(data.result);
			});
	};
	const validateTask = () => {
		if (tarea === "")
			alert("Debe ingresar algún valor para agregar la tarea");
		else {
			setTareas([
				...tareas,
				{
					done: false,
					label: tarea
				}
			]);
			alert("Tarea agregada Satisfactoriamente");
			console.log(tareas);
			setTarea("");
		}
	};

	return (
		<div className=" container text-center mt-5 d-flex justify-content-center">
			<div className="card col-6">
				<h5 className="card-title">To Do List</h5>
				<div className="input-group mb-3 col-12">
					<input
						type="text"
						className="form-control"
						placeholder="Ingrese la tarea"
						aria-label="Recipient's username"
						aria-describedby="button-addon2"
						onChange={e => setTarea(e.target.value)}
						value={tarea}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-success"
							type="button"
							id="button-addon2"
							onClick="">
							Agregar
						</button>
					</div>
				</div>
				<div className="card-body text-left">
					{tareas.map((muestratarea, index) => (
						<li key={index} className="list-group-item ">
							{muestratarea.label}
							<input
								type="button"
								className="btn btn-danger btn-sm float-right"
								//onClick={() => removerTarea(index)}
								value="Concluir"
							/>
						</li>
					))}
				</div>
				<p className="card-text text-left ml-2">
					<small className="text-muted">
						{tareas.length} task left
					</small>
				</p>
			</div>
		</div>
	);
}
