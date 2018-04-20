// Storage Controller
const StorageCtrl = (function(){
    
    // Public methods
    return {    
        storeContact: function(contact) {
            let contacts;
            // Check if any items in local Storage
            if(localStorage.getItem('contacts') == null) {
                contacts = [];

                // Push the new Items
                contacts.push(contact);
                // Set ls
                localStorage.setItem('contacts', JSON.stringify(contacts));
            } else {
                // Get is what is already in local storage
                contacts = JSON.parse(localStorage.getItem('contacts'));


                // Push the new Item
                contacts.push(contact);

                // Re set ls
                localStorage.setItem('contacts', JSON.stringify(contacts));
            }
        },
        getContactsFromLocalStorage: function() {
            let contacts;

            if(localStorage.getItem('contacts') === null) {
                contacts = [];
            } else {
                contacts = JSON.parse(localStorage.getItem('contacts'));
            }

            return contacts;
        },
        setContactsToStorage: function(contacts) {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        },
        clearContactsFromStorage: function() {
            localStorage.removeItem('contacts');
        }
    }
})();  




// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        nameInput: '#name',
        phoneInput: '#phone',
        contactList: '.contact-list',
        clearBtn: '.clear-btn'
    };



    // Public Methods
    return {
        populateList: function() {
            const contactList = document.querySelector(UISelectors.contactList);
            const contacts = CntctCntrl.getContacts();
            contactList.innerHTML = '';
            contacts.forEach(contact => {
                const row = document.createElement('tr');

                row.id = contact.id;

                row.innerHTML = `
                    <td><i class="material-icons">person</i></td>
                    <td>${contact.name}</td>
                    <td>${contact.number}</td>
                    <td><i class="edit material-icons secondary-content">edit</i></td>
                `.trim();

                contactList.appendChild(row);
            });
        },
        getInputs: function() {
            const inputs = {
                name: document.querySelector(UISelectors.nameInput).value,
                number: parseInt(document.querySelector(UISelectors.phoneInput).value)
            };

            return inputs;
        },
        getUISelectors: function() {
            return UISelectors;
        },
        clearInputs: function() {
            document.querySelector(UISelectors.nameInput).value = '';
            document.querySelector(UISelectors.phoneInput)
            .value = '';
        },
        clearEditState: function() {
            UICtrl.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        loadInputs: function() {
            document.querySelector(UISelectors.nameInput).value = CntctCntrl.getCurrentContact().name;
            document.querySelector(UISelectors.phoneInput)
            .value = CntctCntrl.getCurrentContact().number;
            UICtrl.showEditState();
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        }
    }
}());


// Contact Controller

const CntctCntrl = (function() {

    const Contact = function(id, name, number) {
        this.id = id;
        this.name = name;
        this.number = number;
    }

    // Datastructure / state
    const state = {
        contacts: [],
        currentContact : null
    };


    // Public Methods
    return {
        addContact: function(name, number) {
            let ID;

            // Setting id for the new contact
            if(state.contacts.length > 0) {
                ID = state.contacts[state.contacts.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Initializing new contact
            const contact = new Contact(ID, name, number);

            // state.contacts.push(contact);
            return contact;
            
        },
        getContactById: function(id) {
            return state.contacts[id];
        },
        getContacts: function() {
            state.contacts = StorageCtrl.getContactsFromLocalStorage();
            return state.contacts;
        },
        setContacts: function(contacts) {
            StorageCtrl.setContactsToStorage(contacts);
        },
        logData: function() {
            return state;
        },
        setCurrentContact: function(contact) {
            state.currentContact = contact;
        },
        getCurrentContact: function() {
            return state.currentContact;
        }
    }
}());


// App Controller
const App = (function(CntctCntrl, UICtrl) {
    const uiSelectors = UICtrl.getUISelectors();

    // load Event Listeners
    const loadEventListener = function() {
        // Add Event
        document.querySelector(uiSelectors.addBtn).addEventListener('click', contactAdd);

        // Edit icon Event
        document.querySelector(uiSelectors.contactList).addEventListener('click', updateClicked);

        // Back event
        document.querySelector(uiSelectors.backBtn)
        .addEventListener('click', revert);

        // Edit event
        document.querySelector(uiSelectors.updateBtn)
        .addEventListener('click', contactUpdate);

        // Delete Event
        document.querySelector(uiSelectors.deleteBtn)
        .addEventListener('click', deleteContact);

        // Clear All Event
        document.querySelector(uiSelectors.clearBtn).addEventListener('click', clearAll);
    }

    function contactAdd(e) {
        const inputs = UICtrl.getInputs();

        const contact = CntctCntrl.addContact(inputs.name, inputs.number);

        StorageCtrl.storeContact(contact);

        // Refreshing the List
        UICtrl.populateList();

        // Clear the input Fields
        UICtrl.clearInputs();

        e.preventDefault();
    }

    function updateClicked(e) {
       

        if(e.target.classList.contains('edit')) {
            // Get the contactID
            const listId = e.target.parentNode.parentNode.id;

            // Get Contact by id
            const contact = CntctCntrl.getContactById(listId);

            // Set current contact
            CntctCntrl.setCurrentContact(contact);

            // Load Data to Form
            UICtrl.loadInputs()
        }


        e.preventDefault();
    }

    function revert(e) {
        // Clear inputs
        UICtrl.clearInputs();
        // Clear edit state
        UICtrl.clearEditState();
        // Setting current contact to null
        CntctCntrl.setCurrentContact(null);

        e.preventDefault();
    }

    function contactUpdate(e) {
        const contacts = CntctCntrl.getContacts();

        const currentContactID = CntctCntrl.getCurrentContact().id;

        const inputs = UICtrl.getInputs();

        contacts[currentContactID].name = inputs.name;
        contacts[currentContactID].number = inputs.number;

        CntctCntrl.setContacts(contacts);

        UICtrl.clearEditState();

        UICtrl.populateList();

        e.preventDefault();
    }

    function deleteContact(e) {
        const contacts = CntctCntrl.getContacts();

        const currentContact = CntctCntrl.getCurrentContact();

        contacts.splice(currentContact.id, 1);

        CntctCntrl.setContacts(contacts);

        UICtrl.clearEditState();

        UICtrl.populateList();

        e.preventDefault();
    }

    function clearAll(e) {
        StorageCtrl.clearContactsFromStorage();

        UICtrl.populateList();

        e.preventDefault();
    }

    return {
        // Initalises the state
        init: function() {


            UICtrl.clearEditState();

            UICtrl.populateList(CntctCntrl.getContacts());
            
            loadEventListener();
        }
    }

}(CntctCntrl, UICtrl));

App.init();