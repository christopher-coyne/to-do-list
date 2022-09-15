const newTask = document.querySelector("#newtask");
const clearBtn = document.querySelector("#btn-clear");
const uList = document.querySelector("ul");
const filter = document.querySelector("#filter");

const taskForm = document.querySelector("#taskForm");

// event listeners
clearBtn.addEventListener("click", clearHandler);
filter.addEventListener("keyup", filterHandler);
document.addEventListener("DOMContentLoaded", loadTasks);
taskForm.addEventListener("submit", handleNewTask);

// helper to create new task object
const createNewTask = (task) => {
  let newDiv = document.createElement("div");
  let newLi = document.createElement("li");

  newDiv.className = "task";
  newDiv.innerHTML = `${task}<button class="btn-delete">x</button>`;
  newDiv.querySelector(".btn-delete").addEventListener("click", closeTask);
  newLi.appendChild(newDiv);

  return newLi;
};

function loadTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const newLi = createNewTask(task);
    uList.appendChild(newLi);
  });
}

function filterHandler() {
  let filterWord = filter.value;
  let liList = uList.querySelectorAll("li");

  liList.forEach((li) => {
    let innerText = li
      .querySelector(".task")
      .innerHTML.replace('<button class="btn-delete">x</button>', "");

    if (!innerText.includes(filterWord)) {
      li.style.display = "none";
    } else {
      li.style.display = "block";
    }
  });
}

function closeTask(e) {
  console.log("closing task ...");
  //remove from local storage
  let taskList = JSON.parse(localStorage.getItem("tasks"));

  // empty tasklist for some reason
  if (taskList == []) {
    return;
  }

  let taskString = e.target.parentElement.innerHTML.replace(
    '<button class="btn-delete">x</button>',
    ""
  );

  console.log("tastk string of thing to be removed : ", taskString);

  for (let x = 0; x < taskList.length; x++) {
    if (taskList[x] === taskString) {
      taskList.splice(x, 1);
      //set localstorage
      console.log("new task list : ", taskList);
      localStorage.setItem("tasks", JSON.stringify(taskList));

      // delete from DOM
      e.target.parentElement.parentElement.remove();
      return;
    }
  }
}

function clearHandler() {
  let liList = document.querySelectorAll("li");
  liList.forEach((liItem) => {
    liItem.remove();
  });

  //local storage
  localStorage.clear();
}

function handleNewTask(e) {
  e.preventDefault();
  let taskString = e.target[0].value;

  // nothing is input into the task list
  if (taskString === "") {
    console.log("invalid entry");
    alert("enter something into the text box");
    return;
  }

  const newLi = createNewTask(taskString);

  const filterWord = filter.value;
  if (filterWord && !taskString.includes(filterWord)) {
    console.log("filter contains, so hiding when adding");
    newLi.style.display = "none";
  }

  uList.appendChild(newLi);
  newTask.value = "";

  //local storage
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskString);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
