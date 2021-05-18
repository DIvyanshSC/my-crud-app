const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/blog1', {
        method: 'put',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({
            name : 'Div',
            blog : 'My name is divyansh and I updated this blog. '
        })
    })
        .then(res => {
            if(res.ok) return res.json()
        })
        .then(response => {
            // console.log(response)
            window.location.reload(true)
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/blog1', {
        method : 'delete',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({
            name : 'Div'
        })
    })
        .then(res => {
            if(res.ok) return res.json()
        })
        .then(response => {
            if(response === 'No blog to delete') {
                messageDiv.textContent = 'No Div blog to delete'
            } else {
                window.location.reload(true)
            }
        })
        .catch(console.error)
})