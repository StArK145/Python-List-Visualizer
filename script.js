function appendToList() {
    let inputValue = document.getElementById("inputValue").value.trim();
    if (inputValue === "") {
        showError("Please enter a value to add");
        return;
    }
    
    let listContainer = document.getElementById("listContainer");
    let newItem = document.createElement("div");
    newItem.classList.add("list-item");
    newItem.innerHTML = `<span class="index-label"></span><span class="item-value">${inputValue}</span>`;
    listContainer.appendChild(newItem);
    
    updateIndices();
    
    gsap.from(newItem, { opacity: 0, scale: 0.5, duration: 0.5, ease: "back.out(1.7)" });
    
    document.getElementById("inputValue").value = "";
    clearError();
}

function popFromList() {
    let listContainer = document.getElementById("listContainer");
    let index = parseInt(document.getElementById("popIndex").value);
    let items = Array.from(listContainer.querySelectorAll('.list-item'));
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (isNaN(index) || index < 0 || index >= items.length) {
        showError("Invalid index! Must be between 0 and " + (items.length - 1));
        return;
    }
    
    let itemToRemove = items[index];
    gsap.to(itemToRemove, { 
        opacity: 0, 
        scale: 0, 
        duration: 0.5, 
        onComplete: () => {
            itemToRemove.remove();
            updateIndices();
        }
    });
    
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
    
    let items = Array.from(listContainer.querySelectorAll('.list-item'));
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    let itemsToRemove = items.filter(item => 
        item.querySelector('.item-value').textContent === valueToRemove
    );
    
    if (itemsToRemove.length === 0) {
        showError("Item '" + valueToRemove + "' not found in the list");
        return;
    }
    
    // Remove all instances of the value (in case there are duplicates)
    let removed = 0;
    itemsToRemove.forEach(item => {
        gsap.to(item, { 
            opacity: 0, 
            scale: 0, 
            duration: 0.5, 
            onComplete: () => {
                item.remove();
                removed++;
                if (removed === itemsToRemove.length) {
                    updateIndices();
                }
            }
        });
    });
    
    document.getElementById("removeValue").value = "";
    clearError();
}

function sortList() {
    let listContainer = document.getElementById("listContainer");
    let items = Array.from(listContainer.querySelectorAll('.list-item'));
   
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (items.length === 1) {
        showError("List has only one item, already sorted");
        return;
    }
    
    // Get the sorted values and their elements
    let valueElementPairs = items.map(item => {
        return {
            value: item.querySelector('.item-value').textContent,
            element: item
        };
    });
    
    // Sort based on values
    valueElementPairs.sort((a, b) => a.value.localeCompare(b.value));
    
    // Clear and rebuild the list in sorted order
    listContainer.innerHTML = "";
    valueElementPairs.forEach(pair => {
        listContainer.appendChild(pair.element);
    });
    
    updateIndices();
    clearError();
}

function reverseSortList() {
    let listContainer = document.getElementById("listContainer");
    let items = Array.from(listContainer.querySelectorAll('.list-item'));
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (items.length === 1) {
        showError("List has only one item, already sorted");
        return;
    }
    
    // Get the values and their elements for reverse sorting
    let valueElementPairs = items.map(item => {
        return {
            value: item.querySelector('.item-value').textContent,
            element: item
        };
    });
    
    // Sort in reverse order
    valueElementPairs.sort((a, b) => b.value.localeCompare(a.value));
    
    // Clear and rebuild the list in reverse sorted order
    listContainer.innerHTML = "";
    valueElementPairs.forEach(pair => {
        listContainer.appendChild(pair.element);
    });
    
    updateIndices();
    clearError();
}

function shuffleList() {
    let listContainer = document.getElementById("listContainer");
    let items = Array.from(listContainer.querySelectorAll('.list-item'));
    
    if (items.length === 0) {
        showError("The list is empty");
        return;
    }
    
    if (items.length === 1) {
        showError("Need at least two items to shuffle");
        return;
    }
    
    // Create an array of elements for shuffling
    let elementsToShuffle = [...items];
    
    // Shuffle using Fisher-Yates algorithm
    for (let i = elementsToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elementsToShuffle[i], elementsToShuffle[j]] = [elementsToShuffle[j], elementsToShuffle[i]];
    }
    
    // Clear and rebuild the list in shuffled order
    listContainer.innerHTML = "";
    elementsToShuffle.forEach(element => {
        listContainer.appendChild(element);
    });
    
    updateIndices();
    clearError();
}

function updateIndices() {
    let listContainer = document.getElementById("listContainer");
    let items = Array.from(listContainer.querySelectorAll('.list-item'));
    
    items.forEach((item, index) => {
        const indexLabel = item.querySelector('.index-label');
        if (indexLabel) {
            indexLabel.textContent = index;
        }
    });
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

// Initialize on page load - handle any existing items
window.addEventListener('DOMContentLoaded', function() {
    let listContainer = document.getElementById("listContainer");
    
    // Check if there are any "old style" items without index labels
    let oldItems = Array.from(listContainer.querySelectorAll('.list-item')).filter(
        item => !item.querySelector('.index-label')
    );
    
    if (oldItems.length > 0) {
        // Store values of old items
        let values = oldItems.map(item => item.textContent);
        
        // Remove old items
        oldItems.forEach(item => item.remove());
        
        // Add items with new structure
        values.forEach(value => {
            let newItem = document.createElement("div");
            newItem.classList.add("list-item");
            newItem.innerHTML = `<span class="index-label"></span><span class="item-value">${value}</span>`;
            listContainer.appendChild(newItem);
        });
    }
    
    // Update all indices
    updateIndices();
});