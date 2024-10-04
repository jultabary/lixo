const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const getPosts = async (ids) => {
    const posts = []
    for (const id of ids) {
        const response = await fetch(`${BASE_URL}/${id}`)
        const post = await response.json()
        posts.push(post)
    }
    return posts
}

const display = (post) => {
    console.log(`Title: ${post.title}`)
    console.log(`body: ${post.body}`)
}

const getPostsAndDisplayIt = async () => {
    const posts = await getPosts(['1', '2', '3'])
    
    for (const post of posts) {
        display(post)
    }
}

getPostsAndDisplayIt()