const tasks = [
  {
    id: 1,
    board: "Personal",
    title: "Reply to family reunion RSVP",
    status: "In progress",
    dueDate: "2024-05-20",
    priority: "High",
    source: "Gmail",
  },
  {
    id: 2,
    board: "Personal",
    title: "Schedule annual medical checkup",
    status: "Not started",
    dueDate: "2024-05-28",
    priority: "Medium",
    source: "Manual",
  },
  {
    id: 3,
    board: "Finance",
    title: "Approve invoice #4182",
    status: "Waiting",
    dueDate: "2024-05-18",
    priority: "High",
    source: "Outlook 365",
  },
  {
    id: 4,
    board: "Finance",
    title: "Review April spending report",
    status: "Not started",
    dueDate: "2024-05-25",
    priority: "Medium",
    source: "Gmail",
  },
  {
    id: 5,
    board: "Work",
    title: "Prep Q2 roadmap deck",
    status: "In progress",
    dueDate: "2024-05-21",
    priority: "High",
    source: "Outlook 365",
  },
  {
    id: 6,
    board: "Work",
    title: "Convert onboarding meeting notes into tasks",
    status: "Not started",
    dueDate: "2024-05-22",
    priority: "Low",
    source: "Gmail",
  },
];

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const tabs = Array.from(document.querySelectorAll(".tab"));
let activeBoard = "Personal";

const renderTasks = () => {
  taskList.innerHTML = "";
  const boardTasks = tasks.filter((task) => task.board === activeBoard);

  if (boardTasks.length === 0) {
    taskList.innerHTML = `<div class="task-card">
      <strong>No tasks yet</strong>
      <p class="subtitle">Run a scan or add a manual task to get started.</p>
    </div>`;
    return;
  }

  boardTasks
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .forEach((task) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <strong>${task.title}</strong>
        <div class="task-meta">
          <span>Status: ${task.status}</span>
          <span>Due: ${task.dueDate}</span>
          <span>Priority: ${task.priority}</span>
          <span>Source: ${task.source}</span>
        </div>
      `;
      taskList.appendChild(card);
    });
};

const setActiveBoard = (board) => {
  activeBoard = board;
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.board === board);
  });
  renderTasks();
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveBoard(tab.dataset.board));
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const newTask = {
    id: tasks.length + 1,
    board: activeBoard,
    title: formData.get("title"),
    status: formData.get("status"),
    dueDate: formData.get("dueDate"),
    priority: formData.get("priority"),
    source: formData.get("source"),
  };
  tasks.push(newTask);
  taskForm.reset();
  renderTasks();
});

renderTasks();
