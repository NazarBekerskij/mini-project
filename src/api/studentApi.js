const BASE_URL = 'http://localhost:3000/posts';


async function getPosts() {

try {

const res = await fetch(`${BASE_URL}`)
const data = await res.json()  
return data
} catch (error) {
// console.error(error);
console.log(error);

}
}




    async function createPost(studentData) {

    try {
    const options = {   
            method: "POST",
            body: JSON.stringify(studentData),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        const result = await fetch(BASE_URL, options)
        return result.json()
    } catch (error) {

    console.log(error);
    }
    }






async function updatePost(id, updatedData) {
  try {
    const options = {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const res = await fetch(`${BASE_URL}/${id}`, options);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}




async function deletePost(id) {

try {
 const options = {
        method: "DELETE",
    };

    const res = await fetch(`${BASE_URL}/${id}`, options)
    // return await res.json()
     return res.ok;
} catch (error) {
console.error(error);
}

}
export { getPosts, createPost, updatePost, deletePost };








