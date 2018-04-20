class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts) {
        let outPut = '';

        posts.forEach(post => {
            outPut += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div> 
            `;
        });

        this.posts.innerHTML = outPut;
        
    }

    showAlert(message, className) {
        this.clearAlert();
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.postContainer');
        // Get Posts
        const posts = document.querySelector('#posts');
        // insert alert
        container.insertBefore(div, posts);
        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    // Clear the alert
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    // Clear the fields
    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Fill form for edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;   
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Clear the id of hidden
    clearIdInput() {
        this.idInput.value = '';
    }

    changeFormState(type) {
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update Post'
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            // Create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // Get the Parent
            const cardForm = document.querySelector('.card-form');
            // Get the element to insert before
            const formEnd = document.querySelector('.form-end');
            // Insert the cancel button
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = 'Post It'
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            // Remove cancel button
            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // Clear ID from hidden Field
            this.clearIdInput();

            // Clear the text fields
            this.clearFields();

        }
    }
    
}

export const ui = new UI();