const model = {
    cargarTareas() {
        const tareasGuardadas = localStorage.getItem('tareas');
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    },

    guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    },

    tareas: [],

    inicializar() {
        this.tareas = this.cargarTareas();
    },

    agregarTarea(nombre, descripcion) {
        this.tareas.push({ id: Date.now(), nombre, descripcion });
        this.guardarTareas();
    },

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
        this.guardarTareas();
    },

    editarTarea(id, nuevoNombre, nuevaDescripcion) {
        const tarea = this.tareas.find(tarea => tarea.id === id);
        if (tarea) {
            tarea.nombre = nuevoNombre;
            tarea.descripcion = nuevaDescripcion;
            this.guardarTareas();
        }
    },

    obtenerTareas() {
        return this.tareas;
    }
};

const view = {
    mostrarTareas(tareas) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="fullTextContainer">
                    <div class="textArea01">
                        <span><strong>${tarea.nombre}</strong><br>${tarea.descripcion}</span>
                    </div>
                    <div class="buttonContainer">
                        <button class="edit" data-id="${tarea.id}">Editar</button>
                        <button class="delete" data-id="${tarea.id}">Eliminar</button>
                    </div>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
};

const controller = {
    inicializar() {
        model.inicializar();
        view.mostrarTareas(model.obtenerTareas());

        document.getElementById('addTaskBtn').addEventListener('click', () => {
            const nombre = document.getElementById('taskNameInput').value;
            const descripcion = document.getElementById('taskDescriptionInput').value;
            if (nombre && descripcion) {
                model.agregarTarea(nombre, descripcion);
                view.mostrarTareas(model.obtenerTareas());
                document.getElementById('taskNameInput').value = '';
                document.getElementById('taskDescriptionInput').value = '';
            }
        });

        document.getElementById('taskList').addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                const id = Number(e.target.dataset.id);
                model.eliminarTarea(id);
                view.mostrarTareas(model.obtenerTareas());
            }

            if (e.target.classList.contains('edit')) {
                const id = Number(e.target.dataset.id);
                const nuevoNombre = prompt('Edita el nombre de la tarea:');
                const nuevaDescripcion = prompt('Edita la descripción de la tarea:');
                if (nuevoNombre && nuevaDescripcion) {
                    model.editarTarea(id, nuevoNombre, nuevaDescripcion);
                    view.mostrarTareas(model.obtenerTareas());
                }
            }
        });
    }
};

controller.inicializar();
