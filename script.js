"use strict";

const bug = document.querySelector(".bug");
const project = document.querySelector(".project");
const issue = document.querySelector(".issue");
const fixes = document.querySelector(".fixes");
const submit = document.querySelector(".submit");

const bugUpdate = document.querySelector(".bug-update");
const projectUpdate = document.querySelector(".project-update");
const issueUpdate = document.querySelector(".issue-update");
const fixesUpdate = document.querySelector(".fixes-update");
const submitUpdate = document.querySelector(".submit-update");

const list = document.querySelector("#list");
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

submit.addEventListener("click", function (e) {
  e.preventDefault();
  saveBug();
});

submitUpdate.addEventListener("click", function (e) {
  e.preventDefault();
  removeFromStorage(e.target.nextElementSibling.innerHTML);
  saveBugUpdate();
  modal.classList.toggle("hidden");
});

const pushToList = function (bug) {
  list.insertAdjacentHTML(
    "afterbegin",
    `<div class="bug-box">
        <p>Date:    ${bug.date}</p>
        <p>Project: ${bug.project}</p>
        <p>Fixes:   ${bug.fixes}</p>
        <p class= "id hidden">${bug.id}</p>
        <button class="delete">Delete</button>
        <button class="update">Update</button>
    </div>`
  );
};

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("update")) {
    e.preventDefault();
    e.target.parentElement.remove();
    updateBugLog(e.target.previousElementSibling.previousElementSibling);
    removeFromStorage(e.target.previousElementSibling.previousElementSibling);
  }
  if (e.target.classList.contains("delete")) {
    e.preventDefault();
    removeFromStorage(e.target.previousElementSibling);
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("close")) {
    e.preventDefault();
    saveBugUpdate();
    modal.classList.toggle("hidden");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    e.preventDefault();
    saveBugUpdate();
    modal.classList.add("hidden");
  }
});

const modalID = document.querySelector("#id-modal");

const populateModal = function (log) {
  bugUpdate.value = log.bug;
  projectUpdate.value = log.project;
  fixesUpdate.value = log.fixes;
  modalID.innerHTML = log.id;
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
  let log = {
    bug: bug.value,
    project: project.value,
    fixes: fixes.value,
    id: Math.floor(Math.random() * 1000),
    date: now.toLocaleDateString("en-US", options),
  };
  bugLog.unshift(log);
  localStorage.setItem(localStorage.length, JSON.stringify(log));
  pushToList(log);
};

const saveBugUpdate = function () {
  let log = {
    bug: bugUpdate.value,
    project: projectUpdate.value,
    fixes: fixesUpdate.value,
    id: Math.floor(Math.random() * 1000),
    date: now.toLocaleDateString("en-US", options),
  };
  bugLog.unshift(log);
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
    else localStorage.setItem(localStorage.length, JSON.stringify(bug));
  });
};

const updateBugLog = function (id) {
  const value = id.innerHTML;
  let log;
  bugLog.forEach((bug, i) => {
    if (bug === null) return;
    else {
      if (value == bug.id) {
        log = bugLog[i];
      }
    }
  });
  modal.classList.toggle("hidden");
  populateModal(log);
};

const init = function () {
  generateLog();
  generateList(bugLog);
};
init();
