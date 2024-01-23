//! ======= CTRL + S ======= Bosilmasin ===========

const token = localStorage.getItem("token");
const base_url = "https://todo-for-n92.cyclic.app";
const UserPlanInput = document.getElementById("UserPlan");

const submitBtn = document.getElementById("submitBtn");
RenderTask();

//? ------------------------------------Todo add------------------
submitBtn.addEventListener("click", async (e) => {
  try {
    const todo = await fetch(base_url + "/todos/add", {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: UserPlanInput.value,
      }),
    });
    const res = await todo.json();
    console.log(res);
    RenderTask();
  } catch (e) {
    console.log(e.message);
  }
});

//? -----------------------------Render Task--------------------
async function RenderTask() {
  const tableTodo = document.getElementById("tableTodo");

  try {
    const todo = await fetch(base_url + "/todos/all", {
      headers: {
        "x-access-token": token,
      },
    });
    const res = await todo.json();
    tableTodo.innerHTML = "";
    res.allTodos.forEach((task) => {
      const template = `
      <tr>
      <td class="w-100" scope="row">
        <span>${task.task}</span>
      </td>
      <td><button class="btn btn-danger" onclick="deleteTask('${task._id}')">Delete</button></td>
      <td><button class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="renderUpdateTask('${task._id}')" >Update</button></td>
    </tr>
      `;
      tableTodo.innerHTML += template;
    });
  } catch (e) {
    console.log(e.message);
  }
}

//? -----------------------------Delete Task --------------------------
async function deleteTask(id) {
  try {
    const task = await fetch(base_url + `/todos/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    });
    const res = await task.json();
    console.log(res);
    RenderTask();
  } catch (e) {
    console.log(e.message);
  }
}

//? -----------------------------Update Task --------------------------

async function renderUpdateTask(id) {
  const modalBody = document.querySelector("#modal_body");
  try {
    const task = await fetch(base_url + `/todos/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    const res = await task.json();
    const taskUser = res.todo;
    modalBody.innerHTML = `
     <div class="d-flex">
      <input type="text" class="form-control" id="editInput" value="${taskUser.task}">
      <input type="hidden" id="hiddenInput" value="'${taskUser._id}'">
      <button type="button" class="btn btn-primary" id="saveTask" onclick="saveTask('${taskUser._id}')" data-bs-dismiss="modal">Save</button>
     </div>         
    `;
  } catch (e) {
    console.log(e.message);
  }
}

async function saveTask(id) {
  const editInput = document.querySelector('#editInput')
  try {
    const task = await fetch(base_url + `/todos/${id}`, {
      method: "PUT",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: editInput.value,
      }),
    });
    const res = await task.json();
    console.log(res);
    RenderTask()
  } catch (e) {
    console.log(e.message);
  }
}
