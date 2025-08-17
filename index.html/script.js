// 获取所有需要操作的 DOM 元素
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

const encouragementMessage = document.getElementById('encouragement-message');

// 定义一些常量和变量
const initialMinutes = 25;
let totalSeconds = initialMinutes * 60;
let timer;
let isPaused = true;
let isWorkTime = true;

const workEncouragements = [
    "保持专注，你正在取得进步！",
    "一步一个脚印，你离目标越来越近了！",
    "加油！现在是你的高效时间！"
];

const breakEncouragements = [
    "放松一下，你值得拥有！",
    "休息是为了走更远的路！",
    "喝杯水，活动一下，给自己充充电！"
];

// --- 任务管理功能 ---

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('任务内容不能为空！');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">删除</button>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';

    // 为新创建的删除按钮添加事件监听器
    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// --- 番茄计时器功能 ---

function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function displayEncouragement() {
    const encouragements = isWorkTime ? workEncouragements : breakEncouragements;
    const randomMessage = encouragements[Math.floor(Math.random() * encouragements.length)];
    encouragementMessage.textContent = randomMessage;
}

function startTimer() {
    if (!isPaused) return;
    isPaused = false;
    displayEncouragement();

    timer = setInterval(() => {
        totalSeconds--;
        updateTimerDisplay();

        if (totalSeconds <= 0) {
            clearInterval(timer);
            isPaused = true;
            
            if (isWorkTime) {
                alert("工作时间结束！休息一下吧！");
                totalSeconds = 5 * 60;
            } else {
                alert("休息时间结束！准备开始新的工作吧！");
                totalSeconds = initialMinutes * 60;
            }
            
            isWorkTime = !isWorkTime;
            updateTimerDisplay();
            encouragementMessage.textContent = '';
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isPaused = true;
    encouragementMessage.textContent = '已暂停。';
}

function resetTimer() {
    clearInterval(timer);
    isPaused = true;
    totalSeconds = initialMinutes * 60;
    isWorkTime = true;
    updateTimerDisplay();
    encouragementMessage.textContent = '';
}

// 绑定按钮点击事件
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// 初始显示
updateTimerDisplay();