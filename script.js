let timeLeft = 0;
let timerInterval = null;

// Timer Functions
function startTimer() {
    if (timerInterval) return;
    
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    if (minutes === 0 && seconds === 0) {
        alert('Please enter a valid time!');
        return;
    }
    
    timeLeft = (minutes * 60) + seconds;
    timerInterval = setInterval(countdown, 1000);
}

function countdown() {
    if (timeLeft <= 0) {
        stopTimer();
        playAlarm();
        showCompletionAlert();
        return;
    }
    
    timeLeft--;
    updateDisplay();
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    timeLeft = 0;
    updateDisplay();
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playAlarm() {
    const alarm = document.getElementById('alarmSound');
    alarm.play();
}

function showCompletionAlert() {
    setTimeout(() => {
        alert('Time is up!');
    }, 50);
}

// Todo List Functions
function addToDo() {
    const input = document.getElementById('toDoInput');
    const text = input.value.trim();
    
    if (text === '') return;
    
    const li = document.createElement('li');
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed', this.checked);
    });
    
    // Task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = text;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = function() {
        li.remove();
    };
    
    // Append elements
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    
    document.getElementById('toDoList').appendChild(li);
    input.value = '';
}

// Add task with Enter key
document.getElementById('toDoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addToDo();
    }
});