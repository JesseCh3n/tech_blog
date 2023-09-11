const editBtn = document.querySelectorAll('.edit-post-form');
const deleteBtn = document.querySelectorAll('.del-post-form');

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#new-post-name').value.trim();
  const description = document.querySelector('#new-post-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const editFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const description = document.querySelector(`[data-text="${id}"]`).value.trim();

    if (description) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    } 
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('click', newFormHandler);

editBtn.forEach(function(button) {
  button.addEventListener('click', editFormHandler);
});

deleteBtn.forEach(function(button) {
  button.addEventListener('click', delButtonHandler);
});