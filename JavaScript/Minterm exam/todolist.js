//DOM
let row = document.querySelector('.row')
const addTextInput = document.querySelector('#add-text')
const add_Btn = document.querySelector('.add_Btn')


//window.onload
window.onload = function(){
    init()
    add_Btn.addEventListener('click', setAdd)
}

function init(){
    //清空所有todoList
    row.innerHTML = ""
    addTextInput.value = ""
    let todoList = JSON.parse(localStorage.getItem('Todo'));
    
    //更新的同時，將todoList全部創造出來
    if(todoList != null){
        todoList.forEach((todo, index) => {
            getTodo(todo.Value, todo.isDone, index)
        })
    }
}

function setAdd (){
    //宣告todoList為一個陣列
    let todoList = JSON.parse(localStorage.getItem('Todo')) || [];
    let todoItem = addTextInput.value;
    
    let todoObj = {
        Value: todoItem,
        isDone: false
    }
    //將todoObj推進todoList陣列中
    todoList.push(todoObj)
    localStorage.setItem('Todo', JSON.stringify(todoList));
    init()
}

function getTodo(todovalue, isDone, index){
    //最前面checkbox的地方
    const inputGroup = document.createElement('div')
    inputGroup.classList.add('input-group', 'mb-3')

    const checkbox = document.createElement('span')
    checkbox.classList.add('input-group-text')
    checkbox.setAttribute('type', 'checkbox')


    const formCheck = document.createElement('div')
    formCheck.classList.add('form-check')

    const formCheckInput = document.createElement('input')
    formCheckInput.classList.add('form-check-input')
    formCheckInput.setAttribute('type', 'checkbox')
    formCheckInput.setAttribute('value', '')
    isDone ? formCheckInput.setAttribute('checked', '') : ('','')
    //checkbox
    formCheckInput.onclick = function(){
        //尋找到我點到的那個checkbox
        inputGroup.querySelectorAll('.form-check-input').forEach(x=> {
            let todoList = JSON.parse(localStorage.getItem('Todo'))
            if(x.checked){
                //會找到我所點擊的chexbox，在'todoList'中的索引值，並改變其isDone的Value
                todoList[index].isDone = true
                localStorage.setItem('Todo', JSON.stringify(todoList))
            }else{
                todoList[index].isDone = false
                localStorage.setItem('Todo', JSON.stringify(todoList))
            }
        })
        init()
    }

    formCheck.appendChild(formCheckInput)
    checkbox.appendChild(formCheck)
    inputGroup.appendChild(checkbox)

    //input動態新增
    const todoText = document.createElement('input')
    todoText.classList.add('todo_text', 'form-control')
    todoText.setAttribute('type', 'text')
    todoText.setAttribute('aria-label', "Recipient's username with two button addons")
    todoText.setAttribute('disabled', '')
    todoText.value = todovalue

    inputGroup.appendChild(todoText)

    //保存及編輯按鈕動態新增
    const changeBtn = document.createElement('div')

    const saveBtn = document.createElement('button')
    saveBtn.classList.add('save_Btn', 'btn', 'btn-success')
    saveBtn.setAttribute('type', 'button')
    saveBtn.style.zIndex = 1
    saveBtn.style.position = "absolute"
    saveBtn.innerText = "保存"
    //保存按鈕
    saveBtn.onclick = function(){
        inputGroup.querySelectorAll('.todo_text').forEach(x => {
            //尋找到我save_Btn點到的那條待辦事項的input(todo_text)
            let todoList = JSON.parse(localStorage.getItem('Todo'))

            let todoItem = x.value;
            todoList[index] = { Value: todoItem, isDone: false}
            localStorage.setItem('Todo', JSON.stringify(todoList));
        })
        init()
    }

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit_Btn', 'btn', 'btn-warning')
    editBtn.setAttribute('id', 'edit_Btn')
    editBtn.setAttribute('type', 'button')
    editBtn.setAttribute('onclick', 'setEdit()')
    editBtn.style.position = "relative"
    editBtn.innerText = "編輯"

    editBtn.onclick = function(){
        inputGroup.querySelectorAll('.todo_text').forEach(x => {
            x.removeAttribute('disabled', '')
        })
        inputGroup.querySelectorAll('.edit_Btn').forEach(y => {
            y.style.zIndex = -1
        })
    }

    changeBtn.appendChild(saveBtn)
    changeBtn.appendChild(editBtn)
    inputGroup.appendChild(changeBtn)

    //刪除按鈕動態
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete_Btn', 'btn', 'btn-danger')
    deleteBtn.setAttribute('id', 'delete_Btn')
    deleteBtn.setAttribute('type', 'button')
    deleteBtn.innerText = "刪除"
    //刪除按鈕
    deleteBtn.onclick = function(){
        inputGroup.querySelectorAll('.delete_Btn').forEach(z => {
            if(z.onclick){
                let todoList = JSON.parse(localStorage.getItem('Todo'))
                todoList.splice(todoList[index], 1);
                localStorage.setItem('Todo', JSON.stringify(todoList))
            }
        })
        init()
    }

    inputGroup.appendChild(deleteBtn)
    row.appendChild(inputGroup);
}
