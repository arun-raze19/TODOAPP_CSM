document.getElementById('todo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value;
  const response = await fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const newTodo = await response.json();
  addTodoToDOM(newTodo);
  input.value = '';
});

async function fetchTodos() {
  const res = await fetch('/todos');
  const todos = await res.json();
  todos.forEach(addTodoToDOM);
}

function addTodoToDOM(todo) {
  const list = document.getElementById('todo-list');
  const li = document.createElement('li');
  li.textContent = todo.text;
  li.onclick = async () => {
    await fetch(`/todos/${todo.id}`, { method: 'DELETE' });
    li.remove();
  };
  list.appendChild(li);
}

fetchTodos();
