// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask } from './tareas.js';
// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  getTasks().forEach((task, idx),completadas => {
    const li = document.createElement('li');
    li.textContent = task;
    // TODO: Agrega aquí el botón y la lógica para editar la tarea
    const editar =document.createElement('button');
    editar.textContent = 'Editar';
    editar.onclick = () => {
      const nuevaTarea = prompt('Editar tarea:', task);
      if (nuevaTarea) {
        const tasks = getTasks();
        tasks[idx] = nuevaTarea; 
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
        renderTasks(); 
      }
    };
    // TODO: Agrega aquí la lógica para filtrar tareas completadas/pendientes
    const completed = document.createElement('input');
    completed.type = 'checkbox';
    completed.checked = task.completed || false; 
    completed.onchange = () => {
      const tasks = getTasks();
      tasks[idx].completed = completed.checked; 
      localStorage.setItem('tasks', JSON.stringify(tasks)); 
      renderTasks(); 

    };
  // Maneja el evento submit del formulario para agregar una tarea
    form.onsubmit = e => {
      e.preventDefault();
        addTask(input.value);
        input.value = '';
        renderTasks();
      };

    // Botón para eliminar la tarea
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => {
      removeTask(idx);
      renderTasks();
    };
    li.appendChild(completed);
    li.appendChild(editar);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Maneja el evento de clic en el botón de "Marcar todas como completadas"
document.getElementById('mark-all-completed').onclick = () => {

  const tasks = getTasks();
  tasks.forEach(task => {
    task.completed = true; // Marca todas las tareas como completadas
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(); // Vuelve a renderizar la lista de tareas
}
// Maneja el evento de clic en el botón de "Limpiar tareas"
document.getElementById('clear-tasks').onclick = () => {
  localStorage.removeItem('tasks'); // Limpia todas las tareas almacenadas
  renderTasks(); // Vuelve a renderizar la lista de tareas
};     
// Render inicial de las tareas
renderTasks(); 