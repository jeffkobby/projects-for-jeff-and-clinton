// Selectors
const toDoInput = document.querySelector('.todo-input')
const toDoButton = document.querySelector('.todo-button')
const toDoList = document.querySelector('.todo-list')

// Event Listeners
toDoButton.addEventListener('click', addToDo)
toDoList.addEventListener('click', deleteCheck)

// Functions
function addToDo(event){
    event.preventDefault()

    // create todo div
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo')

    // create list item
    const toDoItem = document.createElement('li')
    if(toDoInput.value === ""){
        alert('cannot be blank')
    } else{
        toDoItem.textContent = toDoInput.value
        toDoItem.classList.add('todo-item')

        // append list item into toDoDiv
        toDoDiv.appendChild(toDoItem)

        // Create todo-buttons
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('completed-btn')
        toDoDiv.appendChild(completedButton)

        const deletedButton = document.createElement('button')
        deletedButton.innerHTML = '<i class="fas fa-trash"></i>'
        deletedButton.classList.add('deleted-btn')
        toDoDiv.appendChild(deletedButton)

        // append div to main list
        toDoList.appendChild(toDoDiv)
        toDoInput.value = ""
    }



}

function deleteCheck(event){
    const item = event.target

    // Delete Item
    if(item.classList.contains('deleted-btn')){
        const itemParent = item.parentElement
        
        // delete animation
        itemParent.classList.add('deleteAnimation')
        itemParent.addEventListener('transitionend', ()=>{
            itemParent.remove()
        })

    }

    // Complete Item
    if(item.classList.contains('completed-btn')){
        const itemParent = item.parentElement
        itemParent.classList.toggle('completed')
    }
}