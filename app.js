const newTask = document.querySelector("#newtask");
const submitBtn = document.querySelector(".submit");
const filterBtn = document.querySelector("#filter-btn");
const uList = document.querySelector("ul");
const filter = document.querySelector("#filter");

submitBtn.addEventListener("click", submitHandler);
filterBtn.addEventListener("click", clearHandler);
filter.addEventListener("keyup", filterHandler);

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

  e.target.parentElement.parentElement.remove();
}

function clearHandler(e) {
  let liList = document.querySelectorAll('li');
  liList.forEach( liItem => {liItem.remove()});
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
}