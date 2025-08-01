// Importa las funciones del módulo de tareas usando destructuring
import { 
  getTasks, 
  addTask, 
  removeTask, 
  editTask, 
  toggleTaskComplete, 
  markAllCompleted, 
  clearAllTasks 
} from './tareas.js';

// Referencias a los elementos del DOM usando destructuring
const { taskForm, taskInput, taskList, filterAll, filterPending, filterCompleted, markAllBtn, clearBtn } = {
  taskForm: document.getElementById('task-form'),
  taskInput: document.getElementById('task-input'),
  taskList: document.getElementById('task-list'),
  filterAll: document.getElementById('filter-all'),
  filterPending: document.getElementById('filter-pending'),
  filterCompleted: document.getElementById('filter-completed'),
  markAllBtn: document.getElementById('mark-all-completed'),
  clearBtn: document.getElementById('clear-tasks')
};

// Estado del filtro actual
let currentFilter = 'all';

// Filtra las tareas según el filtro actual
const filterTasks = (tasks) => {
  switch (currentFilter) {
    case 'pending':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

// Renderiza la lista de tareas en el DOM
const renderTasks = () => {
  const tasks = getTasks();
  const filteredTasks = filterTasks(tasks);
  
  taskList.innerHTML = '';
  
  filteredTasks.forEach(task => {
    const { id, text, completed } = task; // Destructuring del objeto task
    
    const li = document.createElement('li');
    if (completed) {
      li.style.textDecoration = 'line-through';
      li.style.opacity = '0.6';
    }
    
    // Checkbox para marcar como completada
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
      toggleTaskComplete(id);
      renderTasks();
    });
    
    // Texto de la tarea
    const taskText = document.createElement('span');
    taskText.textContent = text;
    
    // Botón para editar
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Editar tarea:', text);
      if (newText && newText.trim()) {
        editTask(id, newText.trim());
        renderTasks();
      }
    });
    
    // Botón para eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        removeTask(id);
        renderTasks();
      }
    });
    
    // Agregar elementos al li usando spread
    const elements = [checkbox, taskText, editBtn, deleteBtn];
    elements.forEach(element => li.appendChild(element));
    
    taskList.appendChild(li);
  });
};

// Actualiza el estado visual de los botones de filtro
const updateFilterButtons = () => {
  // Remover clase active de todos los botones
  [filterAll, filterPending, filterCompleted].forEach(btn => {
    btn.style.backgroundColor = '';
    btn.style.color = '';
  });
  
  // Agregar estilo al botón activo
  const activeBtn = currentFilter === 'all' ? filterAll : 
                   currentFilter === 'pending' ? filterPending : filterCompleted;
  activeBtn.style.backgroundColor = '#007bff';
  activeBtn.style.color = 'white';
};

// Event Listeners usando arrow functions y destructuring

// Maneja el envío del formulario
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = taskInput; // Destructuring del input
  const taskText = value.trim();
  
  if (taskText) {
    addTask(taskText);
    taskInput.value = '';
    renderTasks();
  }
});

// Filtros
filterAll.addEventListener('click', () => {
  currentFilter = 'all';
  updateFilterButtons();
  renderTasks();
});

filterPending.addEventListener('click', () => {
  currentFilter = 'pending';
  updateFilterButtons();
  renderTasks();
});

filterCompleted.addEventListener('click', () => {
  currentFilter = 'completed';
  updateFilterButtons();
  renderTasks();
});

// Marcar todas como completadas
markAllBtn.addEventListener('click', () => {
  markAllCompleted();
  renderTasks();
});

// Limpiar todas las tareas
clearBtn.addEventListener('click', () => {
  if (confirm('¿Estás seguro de que quieres eliminar todas las tareas?')) {
    clearAllTasks();
    renderTasks();
  }
});

// Inicialización
const init = () => {
  updateFilterButtons();
  renderTasks();
};

// Render inicial de las tareas
init();