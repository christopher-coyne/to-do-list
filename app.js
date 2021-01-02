const newTask = document.querySelector("#newtask");
const submitBtn = document.querySelector(".submit");
const filterBtn = document.querySelector("#filter-btn");
const uList = document.querySelector("ul");
const filter = document.querySelector("#filter");

submitBtn.addEventListener("click", submitHandler);
filterBtn.addEventListener("click", clearHandler);
filter.addEventListener("keyup", filterHandler);
document.addEventListener("DOMContentLoaded", loadTasks)

function loadTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    let newDiv = document.createElement("div");
    let newLi = document.createElement("li");
  
    newDiv.className = "task";

    console.log(`taskstring: ${task}`);
    newDiv.innerHTML = `${task}<i class="fas fa-times"></i>`;
    newDiv.querySelector(".fas").addEventListener("click", closeTask)
    newLi.appendChild(newDiv);
    uList.appendChild(newLi);

  })
}

function filterHandler(e) {
  let filterWord = filter.value;
  let liList = uList.querySelectorAll('li');

  liList.forEach(li => {
    let innerText = li.querySelector(".task").innerHTML.replace('<i class="fas fa-times"></i>', '');
    console.log(innerText);
    console.log(filterWord)
    if (!innerText.includes(filterWord)) {
        li.style.display = "none";
    }
    else {
      li.style.display = "block";
    }
  })
}

function closeTask(e) {
  console.log("close");

  //remove from local storage
  let taskList = JSON.parse(localStorage.getItem("tasks"));

  // empty tasklist for some reason
  if (taskList == []) {
    return;
  }

  let taskString = e.target.parentElement.innerHTML.replace('<i class="fas fa-times"></i>', '');

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
  let liList = document.querySelectorAll('li');
  liList.forEach( liItem => {liItem.remove()});

  //local storage
  localStorage.clear();
}

function submitHandler(e) {
  let newDiv = document.createElement("div");
  let newLi = document.createElement("li");

  newDiv.className = "task";
  let taskString = newTask.value;

  // nothing is input into the task list
  if (taskString === '') {
    console.log('invalid entry');
    alert('enter something into the text box');
    return;
  }

  console.log(`taskstring: ${taskString}`);
  newDiv.innerHTML = `${taskString}<i class="fas fa-times"></i>`;
  console.log(newDiv);
  newLi.appendChild(newDiv);
  uList.appendChild(newLi);

  document.querySelector("ul").lastElementChild.querySelector(".fas").addEventListener("click", closeTask);
  newTask.value = '';

  //local storage
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskString);
  console.log(`tasks: ${tasks}`);
  localStorage.setItem("tasks", JSON.stringify(tasks));

}