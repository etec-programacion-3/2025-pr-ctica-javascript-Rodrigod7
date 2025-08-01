// Módulo de tareas usando ES6+
// Provee funciones para obtener, agregar y eliminar tareas usando localStorage

const STORAGE_KEY = 'tasks';

// Devuelve la lista de tareas almacenadas
export const getTasks = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

// Agrega una tarea nueva y la guarda en localStorage
export const addTask = (taskText) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  const updatedTasks = [...tasks, newTask]; // Usando spread operator
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
};

// Elimina una tarea por ID y actualiza localStorage
export const removeTask = (taskId) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId); // Usando filter en lugar de splice
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
};

// Edita una tarea por ID
export const editTask = (taskId, newText) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, text: newText } : task // Usando spread para crear nuevo objeto
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
};

// Marca/desmarca una tarea como completada
export const toggleTaskComplete = (taskId) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
};

// Marca todas las tareas como completadas
export const markAllCompleted = () => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => ({ ...task, completed: true }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
};

// Limpia todas las tareas
export const clearAllTasks = () => {
  localStorage.removeItem(STORAGE_KEY);
};