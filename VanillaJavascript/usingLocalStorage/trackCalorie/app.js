// Storage controler
const StorageCtrl = (function(){
    
    // Public methods
    return {    
        storeItem: function(item) {
            let items;
            // Check if any items in local Storage
            if(localStorage.getItem('items') == null) {
                items = [];

                // Push the new Items
                items.push(item);
                // Set ls
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get is what is already in local storage
                items = JSON.parse(localStorage.getItem('items'));


                // Push the new Item
                items.push(item);

                // Re set ls
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromLocalStorage: function() {
            let items;

            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach((item, index) => {
                if(item.id === id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})();




// Item controller 
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        // items: [
        //     // {id: 0, name: 'Steak Dinner', calories: 1200},
        //     // {id: 1, name: 'Cookie', calories: 400},
        //     // {id: 2, name: 'Eggs', calories: 300}
        // ],
        items: StorageCtrl.getItemsFromLocalStorage(),
        currenItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            let ID;
            // Create id
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create a new Item
            newItem = new Item(ID, name, calories);

            // Add to items Array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id) {
            let found = null;

            // Loop through items
            data.items.forEach(item => {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories) {
            // Calories to number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(item => {
                if(item.id === data.currenItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },
        deletItem: function(id) {
            // Get ids
            const ids = data.items.map(item => {
                return item.id;
            });

            // Get Index
            const index = ids.indexOf(id);

            //Remove item
            data.items.splice(index, 1);

        },
        setCurrentItem: function(item) {
            data.currenItem = item;
        },
        getCurentItem: function() {
            return data.currenItem;
        },
        getTotalCalories: function() {
            let total = 0;

            // Loop through items and add Calories
            data.items.forEach(item => {
                total += item.calories;
            });

            // Set totalCalories 
            data.totalCalories = total;

            return data.totalCalories;
        },
        clearAllItems: function() {
            data.items = [];
        },
        logdata: function() {
            return data;
        }
    }
})();



// UI controller
const UICtrl = (function(){

    const UISelectors = {
        itemList : '#item-list',
        listItems: '#item-list li',
        addBtn : '.add-btn',
        updateBtn : '.update-btn',
        deleteBtn : '.delete-btn',
        backBtn : '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    };
    // Public Methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                        </a>
                        </li>`
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;

        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            };
        },
        addListItem: function(item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class Name
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}:</strong><em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                            </a>`;

            // Insert Item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn NodeList into Array
            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemId = listItem.getAttribute('id');

                if (itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML =  `<strong>${item.name}:</strong><em>${item.calories} Calories</em>
                                                                        <a href="#" class="secondary-content">
                                                                        <i class="edit-item fa fa-pencil"></i>
                                                                        </a>`;
                }
            });
        },
        deleteListItem: function(id) {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn it into an Array
            listItems = Array.from(listItems);

            listItems.forEach(item => {
                item.remove();
            });
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        getSelectors: function() {
            return UISelectors;
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }
    }
})();




// App controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){

    // Load event listeners
    const loadEventListeners = function() {
        // Get UI Selecotrs
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;   
            }
        });
        
        // Edit icon click event
        document.querySelector(UISelectors.itemList)
        .addEventListener('click', editClicked);

        // Update event
        document.querySelector(UISelectors.updateBtn)
        .addEventListener('click', itemUpdateSubmit);

        // Back Event
        document.querySelector(UISelectors.backBtn)
        .addEventListener('click', backBtnClicked);

        // Delete Event
        document.querySelector(UISelectors.deleteBtn)
        .addEventListener('click', itemDeleteSubmit);

         // Clear Event
         document.querySelector(UISelectors.clearBtn)
         .addEventListener('click', clearAllitemsClick);
       
    }

    // Add item Submit
    const itemAddSubmit = function(e) {
        // Get form input from the form
        const input = UICtrl.getItemInput()

        if (input.name !== '' && input.calories !== '') {
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total Calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Store in localStorage
            StorageCtrl.storeItem(newItem);

            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Edit icon clicked
    const editClicked = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // Get the list item id
            const listId = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArray = listId.split('-');

            // Get the Actual id
            const id = parseInt(listIdArray[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set Current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }


    const itemUpdateSubmit = function(e) {
        // Get iteminput
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total Calories to UI
        UICtrl.showTotalCalories(totalCalories);


        // Update LS
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const itemDeleteSubmit = function(e) {
        // Get current item
        const currenItem = ItemCtrl.getCurentItem();

        // Delete from Array
        ItemCtrl.deletItem(currenItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currenItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total Calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete from localStorage
        StorageCtrl.deleteItemFromStorage(currenItem.id);

        UICtrl.clearEditState();

        e.preventDefault(e);
    }
    
    // Clear items Event
    const clearAllitemsClick = function(e) {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total Calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Remove all from UI
        UICtrl.removeItems();

        // Clears all from Storage
        StorageCtrl.clearItemsFromStorage();

        // Hide UL
        UICtrl.hideList();

        e.preventDefault();
    }

    const backBtnClicked = function(e) {

        UICtrl.clearEditState();

        e.preventDefault();
    }
    

    // Public Methods 
    return {
        init: function(){
            // Set initial State
            UICtrl.clearEditState();

            // Fetch the items
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate items in list
                UICtrl.populateItemList(items);   
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total Calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Loads all event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();