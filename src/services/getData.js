export default function getData() {
    return  fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => {
            const users = [...json]
            return users
        })
}