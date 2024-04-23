const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const packageForm = document.querySelector("#packing-form");
const packageInput = document.querySelector("#packing-input");
const packageList = document.querySelector("#packing-list");

const handleFromTodo = (form, input, listForm) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      const div = document.createElement("div");
      div.classList.add("todo-item");
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerHTML = "Delete";
      button.addEventListener("click", () => {
        div.remove();
      });
      li.innerHTML = input.value;
      button.type = "button";
      div.appendChild(li);
      div.appendChild(button);
      listForm.appendChild(div);
      input.value = "";
    }
  });
};

module.exports = handleFromTodo(todoForm, todoInput, todoList);
module.exports = handleFromTodo(packageForm, packageInput, packageList);
