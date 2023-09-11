const commentFormHandler = async (event) => {
  event.preventDefault();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length-1
  ];
  console.log(post_id);
  const description = document.querySelector('#comment-body').value.trim();
  console.log(description);
  if (description) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/api/posts/${post_id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('click', commentFormHandler);
