function generateBoard() {
  let board = document.querySelector(".board");
  board.innerHTML = boardHTML();
}

function boardHTML() {
  return `
    <div class="boardHeadline">
        <h1>Board</h1>
        <div class="searchTaskAndAddTask"> 
            <div class="searchTask">  
            <input class="searchTaskInput" placeholder="Find Task" type="text" name="" id="">
            </div>
            <button class="addTaskButton">Add Task <img src="../img/add-icon.svg" alt="add-icon"></button>
        </div>
    </div>
    
    <div class="taskBoard">



        <div>
            <div class="boardCategory">
                <span>To do</span>
                <div class="taskBoardAddTaskDiv">
                    <img src="../img/board-add-task-icon.svg">
                </div>
            </div>
            <div class="taskCardDiv">
                
            </div>
        </div>


        <div>
            <div class="boardCategory">
                <span>In Progress</span>
                <div class="taskBoardAddTaskDiv">
                    <img src="../img/board-add-task-icon.svg">
                </div>
            </div>
            <div class="taskCardDiv">
                
            </div>
       </div>

        <div>
            <div class="boardCategory"> 
                <span>Await Feedback</span>
                <div class="taskBoardAddTaskDiv">
                    <img src="../img/board-add-task-icon.svg">
                </div>
            </div>
            <div class="taskCardDiv">
                
            </div>
        </div>

        <div>
            <div class="boardCategory">
                <span>Done</span>
            </div>
            <div class="taskCardDiv">
                
            </div> 
        </div>
    

    
    </div>
    
    `;
}

function generateEmptyTask() {
  let taskCards = document.querySelectorAll(".taskCardDiv");

  taskCards.forEach((taskCard, index) => {
    let categoryName = document.querySelectorAll(".boardCategory span")[index]
      .textContent;

    taskCard.innerHTML = emptyTaskHTML(categoryName);
  });
}

function emptyTaskHTML(categoryName) {
  return `
      <div class="noTasksDiv">
        <span>No Tasks ${categoryName}</span>
      </div>
    `;
}


function generateTask() {
    let taskCards = document.querySelectorAll(".taskCard");
}


function taskHTML() {
   return `
   <div class="taskCard"></div>
   
   `; 
}