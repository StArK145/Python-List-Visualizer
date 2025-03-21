function appendToList() {
    let inputValue = document.getElementById("inputValue").value.trim();
    if (inputValue === "") {
        showError("Please enter a value to add");
        return;
    }
    
    let listContainer = document.getElementById("listContainer");
    let newItem = document.createElement("div");
    newItem.classList.add("list-item");
    newItem.textContent = inputValue;
    listContainer.appendChild(newItem);
    
    gsap.from(newItem, { opacity: 0, scale: 0.5, duration: 0.5, ease: "back.out(1.7)" });
    
    document.getElementById("inputValue").value = "";
    clearError();
}

function popFromList() {
    let listContainer = document.getElementById("listContainer");
    let index = parseInt(document.getElementById("popIndex").value);
    let items = Array.from(listContainer.children);
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (isNaN(index) || index < 0 || index >= items.length) {
        showError("Invalid index! Must be between 0 and " + (items.length - 1));
        return;
    }
    
    let itemToRemove = items[index];
    gsap.to(itemToRemove, { opacity: 0, scale: 0, duration: 0.5, onComplete: () => itemToRemove.remove() });
    document.getElementById("popIndex").value = "";
    clearError();
}

function removeFromList() {
    let listContainer = document.getElementById("listContainer");
    let valueToRemove = document.getElementById("removeValue").value.trim();
    
    if (valueToRemove === "") {
        showError("Please enter a value to remove");
        return;
    }
    
    let items = Array.from(listContainer.children);
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    let itemsToRemove = items.filter(item => item.textContent === valueToRemove);
    
    if (itemsToRemove.length === 0) {
        showError("Item '" + valueToRemove + "' not found in the list");
        return;
    }
    
    // Remove all instances of the value (in case there are duplicates)
    itemsToRemove.forEach(item => {
        gsap.to(item, { opacity: 0, scale: 0, duration: 0.5, onComplete: () => item.remove() });
    });
    
    document.getElementById("removeValue").value = "";
    clearError();
}

function sortList() {
    let listContainer = document.getElementById("listContainer");
    let items = Array.from(listContainer.children);
   
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (items.length === 1) {
        showError("List has only one item, already sorted");
        return;
    }
    
    // Get the sorted values
    let sortedItems = items.map(item => item.textContent).sort((a, b) => a.localeCompare(b));
    
    // Update DOM directly without animations
    listContainer.innerHTML = "";
    sortedItems.forEach(value => {
        let newItem = document.createElement("div");
        newItem.classList.add("list-item");
        newItem.textContent = value;
        listContainer.appendChild(newItem);
    });
    
    clearError();
}

function reverseSortList() {
    let listContainer = document.getElementById("listContainer");
    let items = Array.from(listContainer.children);
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (items.length === 1) {
        showError("List has only one item, already sorted");
        return;
    }
    
    // Get reverse sorted values
    let sortedItems = items.map(item => item.textContent).sort((a, b) => b.localeCompare(a));
    
    // Update DOM directly without animations
    listContainer.innerHTML = "";
    sortedItems.forEach(value => {
        let newItem = document.createElement("div");
        newItem.classList.add("list-item");
        newItem.textContent = value;
        listContainer.appendChild(newItem);
    });
    
    clearError();
}

function shuffleList() {
    let listContainer = document.getElementById("listContainer");
    let items = Array.from(listContainer.children);
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (items.length === 1) {
        showError("Need at least two items to shuffle");
        return;
    }
    
    // Get values and shuffle using Fisher-Yates algorithm
    let values = items.map(item => item.textContent);
    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }
    
    // Update DOM directly without animations
    listContainer.innerHTML = "";
    values.forEach(value => {
        let newItem = document.createElement("div");
        newItem.classList.add("list-item");
        newItem.textContent = value;
        listContainer.appendChild(newItem);
    });
    
    clearError();
}

function showError(message) {
    const errorElement = document.getElementById("error-message");
    errorElement.textContent = message;
    
    // Auto-clear error after 3 seconds
    setTimeout(() => {
        if (errorElement.textContent === message) {
            errorElement.textContent = "";
        }
    }, 3000);
}

function clearError() {
    document.getElementById("error-message").textContent = "";
}