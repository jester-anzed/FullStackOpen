import {useState} from 'react'

const NewBlog = ({handleSubmit}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = event => {
        event.preventDefault()
        handleSubmit({
            id: Date.now(),
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                <label>
                    Title:
                    <input type="text" value={title} onChange={({target}) => setTitle(target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Author:
                    <input type="text" value={author} onChange={({target}) => setAuthor(target.value)} />
                </label>
            </div>
            <div>
                <label>
                    URL:
                    <input type="text" value={url} onChange={({target}) => setUrl(target.value)} />
                </label>
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default NewBlog