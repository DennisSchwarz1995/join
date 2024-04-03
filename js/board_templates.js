
  function generateSubtasks(subtasks) {
    let subtaskList = document.querySelector(".editTaskSubtaskList");
    let subtaskListHTML = "";
    subtasks.forEach((subtask, index) => {
      subtaskListHTML += `
        <li class="subtaskLI" data-index="${index}"> <!-- Verwendung des Index hier -->
          <span class="subtaskText">${subtask.description}</span>
          <div class="subtaskEditDiv">
            <input maxlength="30" class="subtaskEditInput invisible"/>
            <img src="../img/check-icon-darkblue.svg" alt="check-icon" class="subtaskSaveIcon invisible" onclick="saveEditedSubtask(${index})">
          </div> 
          <div class="subtaskIconDiv">
            <img class="editSubtask" src="../img/edit-pencil.svg" alt="edit-pencil" onclick="editSubtask(${index})">
            <img class="deleteSubtask" src="../img/delete-trash.svg" alt="delete-trash" onclick="deleteSubtask(${index})">
          </div>
        </li>
      `;
    });
    subtaskList.innerHTML = subtaskListHTML;
  }

  function taskCardDetailedViewTemplate(task) {
    let formattedDueDate = formatDate(task.dueDate);
    let priorityName = getPriorityNameFromURL(task.priority);
    let assignedContactsHTML = generateAssignedContactsHTML(task);
    let subtasksHTML = generateDetailedViewSubtasks(task);
    return `
      <div class="taskCardDetailedHeader">
        <div
          class="taskCardDetailedCategory"
          style="background: ${task.categoryColor}"
        >
          ${task.category}
        </div>
        <div class="closeButtonDiv" onclick="closeAddTaskOverlay(true)">
          <img src="../img/x-icon.svg" />
        </div>
      </div>
      <div class="taskCardDetailedContent">
        <h1 class="taskCardDetailedTitle">${task.title}</h1>
        <div class="taskCardDetailedDescription">${task.description}</div>
        <div class="taskCardDetailedDueDate">
          <span>Due Date:</span>${formattedDueDate}
        </div>
        <div class="taskCardDetailedPriority">
          <span>Priority:</span>
          <div class="taskCardDetailedPriorityWrapper">
            ${priorityName}<img src="${task.priority}" />
          </div>
        </div>
        <div class="taskCardDetailedAssignedContacts">
          <span>Assigned to:</span>${assignedContactsHTML}
        </div>
        <div class="taskCardDetailedSubtasks">
          <span>Subtasks:</span>${subtasksHTML}
        </div>
          </div>
        </div>
        <div class="taskCardDetailedDeleteAndEdit">
          <div class="taskCardDetailedEdit" onclick="openEditTaskOverlay(${task.id})">
            <div class="taskCardDetailedEditImage"></div>
            <span>Edit</span>
          </div>
          <div class="taskCardDetailedDivider"></div>
          <div class="taskCardDetailedDelete" onclick="deleteTask(${task.id})">
            <div class="taskCardDetailedDeleteImage"></div>
            <span>Delete</span>
      </div>
    `;
  }

  function generateAssignedContactsHTML(task) {
    if (task.assignedContacts && task.assignedContacts.length > 0) {
      return task.assignedContacts
        .map(
          (contact) => `
        <div class="taskCardDetailedUserWrapper">
          <div class="taskCardDetailedUser" style="background-color:${
            contact.color
          }">${getInitials(contact.name)}</div>
          <div>${contact.name}</div> 
        </div>
      `
        )
        .join("");
    } else {
      return "<div>No contacts assigned</div>";
    }
  }

  function generateDetailedViewSubtasks(task) {
    if (task.subtasks && task.subtasks.length > 0) {
      let subtaskHTML = "";
      task.subtasks.forEach((subtask, index) => {
        let subtaskId = `task-${task.id}-subtask-${index}`;
        let isChecked = subtask.completed
          ? "../img/checkbox-icon-selected.svg"
          : "../img/checkbox-icon.svg";
        let width = subtask.completed ? "19px" : "24px";
        let height = subtask.completed ? "19px" : "24px";
        subtaskHTML += `
          <div class="taskCardDetailedSubtasksList"> 
            <div class="checkBoxIconDiv">
              <img class="checkBoxIcon" id="${subtaskId}" src="${isChecked}" alt="checkbox-icon" style="width: ${width}; height: ${height};" onclick="toggleSubtaskCompletion(event)"/>
            </div> 
            ${subtask.description}
          </div>`;
      });
      return subtaskHTML;
    } else {
      return "<div>No subtasks</div>";
    }
  }

  function taskHTML(taskData) {
    let assignedContactsHTML = "";
    if (taskData.assignedContacts) {
      assignedContactsHTML = checkAssignedContactLength(taskData);
    }
    let progressBarClass = taskData.subtasks.length === 0 ? "invisible" : "";
    let completedSubtasks = taskData.subtasks.filter(
      (subtask) => subtask.completed
    ).length;
    return `
      <div class="taskCard" id="task-${
        taskData.id
      }" draggable="true" onclick="openTaskCardDetailedView(${taskData.id})">
        <div class="taskCategory" style="background: ${taskData.categoryColor}">${
      taskData.category
    }</div>
        <div class="taskTitle">${taskData.title}</div>
        <div class="taskDescription">${taskData.description}</div>
        <div class="taskProgressContainer ${progressBarClass}">
          <div class="taskProgressBar">
            <div class="taskProgressBarFill" style="width: ${
              (completedSubtasks / taskData.subtasks.length) * 100
            }%"></div>
          </div>
          <div class="taskProgressCount">${completedSubtasks} / ${
      taskData.subtasks.length
    }</div>
        </div>
        <div class="taskContactAndPrio">
          <div class="taskContacts">${assignedContactsHTML}</div>
          <img class="taskPrio" src="..${taskData.priority}" />
        </div>
      </div>`;
  }

  function generateEmptyTask(categoryName) {
    return `
        <div class="noTasksDiv" id="emptyTask-${categoryName}">
          <div class="taskContentContainer">
            <span>No tasks ${categoryName}</span>
          </div>
        </div>
    `;
  }