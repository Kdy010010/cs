// public/index.js
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();

    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            form.reset();
            loadPosts();
        } else {
            console.error('게시물 작성 실패');
        }
    });
});

async function loadPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();

    const postsList = document.getElementById('posts');
    postsList.innerHTML = '';

    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${post.title}</strong>: ${post.content}`;
        postsList.appendChild(li);
    });
}
