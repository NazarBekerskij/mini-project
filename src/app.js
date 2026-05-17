import {getPosts, createPost, updatePost, deletePost} from './api/studentApi'

const listRef = document.querySelector(".list");
const createPostForm = document.querySelector(".createPostForm");



function createItemsMarkup(array) {
  const items = array.map(({ id, title, content }) => {
    return `
      <div class="post" id="${id}">
        <h2>${title}</h2>
        <p>${content}</p>
        <button type="button" data-id="${id}" data-action="update">Оновити</button>
        <button type="button" data-id="${id}" data-action="delete" style="background-color: red;">Видалити</button>
      </div>
    `;
  }).join("");
  listRef.innerHTML = items;
}


createPostForm.addEventListener("submit", async (event) => {
event.preventDefault()



const title = event.target.titleInput.value;
const content = event.target.contentInput.value;


await createPost({title, content})
event.target.reset()

 const data = await getPosts();
  createItemsMarkup(data);
})

getPosts().then(data => createItemsMarkup(data));



