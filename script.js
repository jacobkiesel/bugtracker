"use strict";

const bug = document.querySelector(".bug");
const project = document.querySelector(".project");
const issue = document.querySelector(".issue");
const fixes = document.querySelector(".fixes");
const submit = document.querySelector(".submit");
const list = document.querySelector("#list");

const bugUpdate = document.querySelector(".bug-update");
const projectUpdate = document.querySelector(".project-update");
const issueUpdate = document.querySelector(".issue-update");
const fixesUpdate = document.querySelector(".fixes-update");
const submitUpdate = document.querySelector(".submit-update");

const modal = document.querySelector(".modal");

const options = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const now = new Date();

let ID = Math.floor(Math.random() * 1000);
const bugLog = [];

window.addEventListener("submit", function (e) {
  e.preventDefault();
  saveBug();
});

const pushToList = function (bug) {
  list.insertAdjacentHTML(
    "afterbegin",
    `<div>
    <p>🛣: ${bug.project} Miles</p>
        <p>📆: ${bug.bug}</p>
        <p>🕰: ${bug.issue} Minutes</p>
        <p>🌡: ${bug.fixes}°F</p>
        <p> when: ${bug.date}</p>
        <div class= "id hidden">${bug.id}</div>
      <button class="delete">Delete</button>
      <button class="update">Update</button>
    </div>`
  );
  const deleteBtn = document.querySelector(".delete");
  const updateBtn = document.querySelector(".update");
  deleteBtn.addEventListener("click", function (e) {
    removeFromStorage(e.target.previousElementSibling);
    deleteBtn.parentElement.remove();
  });
  updateBtn.addEventListener("click", function (e) {
    updateBugLog(
      e.target.previousElementSibling.previousElementSibling.innerHTML
    );
  });
};

const updateBugLog = function (id) {
  let log;
  bugLog.forEach((bug, i) => {
    if (bug === null) return;
    else {
      if (bug.id == id) {
        return (log = bug);
      }
    }
  });
  modal.classList.toggle("hidden");
  populateModal(log);
  removeFromStorage(log);
};

const populateModal = function (log) {
  bugUpdate.value = log.bug;
  projectUpdate.value = log.project;
  issueUpdate.value = log.issue;
  fixesUpdate.value = log.issue;
  submitUpdate.addEventListener("submit", function (e) {
    modal.classList.toggle("hidden");
    e.preventDefault;
    saveBugUpdate();
  });
};

const generateLog = function () {
  for (const log in localStorage) {
    if (log === null) return;
    bugLog.unshift(JSON.parse(localStorage.getItem(log)));
  }
};

const generateList = function (log) {
  log.forEach((log) => {
    if (log !== null) {
      pushToList(log);
    }
  });
};

const saveBug = function () {
  const log = {
    bug: bug.value,
    project: project.value,
    issue: issue.value,
    fixes: fixes.value,
    id: ID,
    date: now.toLocaleDateString("en-US", options),
  };
  localStorage.setItem(localStorage.length, JSON.stringify(log));
  pushToList(log);
};

const saveBugUpdate = function () {
  const log = {
    bug: bugUpdate.value,
    project: projectUpdate.value,
    issue: issueUpdate.value,
    fixes: fixesUpdate.value,
    id: ID,
    date: now.toLocaleDateString("en-US", options),
  };
  localStorage.setItem(localStorage.length, JSON.stringify(log));
  pushToList(log);
};

const removeFromStorage = function (id) {
  const value = id.innerHTML;
  localStorage.clear();
  bugLog.forEach((bug, i) => {
    if (bug === null) return;
    else {
      if (value == bug.id) {
        bugLog.splice(i, 1);
      } else {
        return;
      }
    }
  });
  bugLog.forEach((bug) => {
    if (bug === null) return;
    else localStorage.setItem(localStorage.lenght, JSON.stringify(bug));
  });
};

const init = function () {
  generateLog();
  generateList(bugLog);
};
init();
