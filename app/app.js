const newTask = document.querySelector("#newtask");
// const submitBtn = document.querySelector("#btn-submit");
const clearBtn = document.querySelector("#btn-clear");
const uList = document.querySelector("ul");
const filter = document.querySelector("#filter");

const taskForm = document.querySelector("#taskForm");

// submitBtn.addEventListener("click", submitHandler);
clearBtn.addEventListener("click", clearHandler);
filter.addEventListener("keyup", filterHandler);
document.addEventListener("DOMContentLoaded", loadTasks);
taskForm.addEventListener("submit", handleNewTask);

function loadTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    let newDiv = document.createElement("div");
    let newLi = document.createElement("li");

    newDiv.className = "task";

    console.log(`taskstring: ${task}`);
    newDiv.innerHTML = `${task}<button class="btn-delete">x</button>`;
    newDiv.querySelector(".btn-delete").addEventListener("click", closeTask);
    newLi.appendChild(newDiv);
    uList.appendChild(newLi);
  });
}

function filterHandler(e) {
  let filterWord = filter.value;
  let liList = uList.querySelectorAll("li");
  // console.log("local storage tasks : ", localStorage.getItem("tasks"));
  // let liList = localStorage.getItem("tasks")
  // console.log("li list : ", liList);

  liList.forEach((li) => {
    let innerText = li
      .querySelector(".task")
      .innerHTML.replace('<button class="btn-delete">x</button>', "");
    console.log("inner text : ", innerText);
    // console.log(filterWord);
    if (!innerText.includes(filterWord)) {
      console.log("word doesnt contains the filte : ", filterWord);
      li.style.display = "none";
    } else {
      console.log("setting ", innerText, " to block ");
      li.style.display = "block";
    }
  });
}

function closeTask(e) {
  console.log("close");

  //remove from local storage
  let taskList = JSON.parse(localStorage.getItem("tasks"));

  // empty tasklist for some reason
  if (taskList == []) {
    return;
  }

  let taskString = e.target.parentElement.innerHTML.replace(
    '<i class="fas fa-times"></i>',
    ""
  );

  console.log(`inner local tasklist ${taskString}`);

  let myBreak = 0;
  taskList.forEach((task, index) => {
    if (!myBreak) {
      if (task === taskString) {
        taskList.splice(index, 1);
        myBreak = 1;
        console.log("here!");
      }
    }
    console.log(`each task: ${task}`);
  });

  //set localstorage
  console.log(`final taskstring storage: ${taskString}`);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  // delete from DOM
  e.target.parentElement.parentElement.remove();
}

function clearHandler(e) {
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

  let newDiv = document.createElement("div");
  let newLi = document.createElement("li");
  let newButton = document.createElement("button");

  newButton.className = "btn-delete";
  newButton.innerHTML = "x";
  newButton.addEventListener("click", closeTask);

  newDiv.innerHTML = `${taskString}`;
  newDiv.appendChild(newButton);
  newDiv.className = "task";

  // newDiv.innerHTML = `${taskString}<button class="btn-delete">x</button>`;

  const filterWord = filter.value;
  if (filterWord && !taskString.includes(filterWord)) {
    console.log("filter contains, so hiding when adding");
    newLi.style.display = "none";
  }
  console.log(newDiv);
  newLi.appendChild(newDiv);

  uList.appendChild(newLi);

  /*
  document
    .querySelector("ul")
    .querySelector(".btn-delete")
    .addEventListener("click", closeTask);
    */
  newTask.value = "";

  //local storage
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskString);
  console.log(`tasks: ${tasks}`);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
