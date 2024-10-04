/*
todo: extract the base path of url in constant and rename the variable to postIds
*/
var urls = [
    {url: 'https://jsonplaceholder.typicode.com/posts/1'},
    {url: 'https://jsonplaceholder.typicode.com/posts/2'},
    {url: 'https://jsonplaceholder.typicode.com/posts/3'}
];

for (i = 0; i <= urls.length; i++) {
    // todo: won't work -> the fetch api need to be awaited and then to get the json result
    response = fetch(urls[i]);
    // todo: create a another variable to store the response
    urls[i] = response;
}

// should display a list of posts
// todo: wrap this line in a function named display
console.log(urls);
