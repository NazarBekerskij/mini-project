import {getPosts, createPost, updatePost, deletePost} from './api/studentApi'


let currentId = null
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

if(currentId){
  await updatePost(currentId, {title, content})
  currentId = null
}else{
  await createPost({title, content}) 
}


event.target.reset();


// createPost({title, content})
// event.target.reset()

const res = await getPosts();
createItemsMarkup(res);


})



listRef.addEventListener("click", async (event) => {
const button = event.target
const id = button.dataset.id



if(button.dataset.action === "delete"){
  await deletePost(id)
  const res = await getPosts()
  createItemsMarkup(res)
}


if(button.dataset.action === "update"){
  const post = document.getElementById(id);


  createPostForm.titleInput.value = post.children[0].textContent;
  createPostForm.contentInput.value = post.children[1].textContent;
  currentId = id;
}

})





getPosts().then(data => createItemsMarkup(data));



