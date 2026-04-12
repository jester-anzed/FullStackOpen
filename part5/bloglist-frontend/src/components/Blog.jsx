import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete, updatedLikes }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showDetails = { display: visible ? 'none' : 'block' }
    const hideDetails = { display: visible ? 'block' : 'none' }

    const visibilityToggle = () => {
        setVisible(!visible)

    }

    console.log('visible state:', visible)

    const deleteData = blog => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            blogService.deleteData(blog.id)
            handleDelete(blog.id)
        }
    }

    console.log(blog.user)
    console.log(user)

    return (
        <div  style={blogStyle}>
            <div className='showDetails' style={showDetails}>
                {blog.title} {blog.author} <button onClick={visibilityToggle}>View</button>
            </div>
            <div className='hiddenDetails' style={hideDetails}>
                <div>
                    {blog.title}
                    <button onClick={visibilityToggle}>Hide</button>
                </div>
                <div>
                    {blog.url}
                </div>
                <div>
                    {blog.likes}
                    <button onClick={() => updatedLikes(blog)}>like</button>
                </div>
                <div>
                    {blog.author}
                    {(blog.user.id === user.id || blog.user.username === user.username) && <button onClick={() => deleteData(blog)}>Delete</button>}
                </div>
            </div>

        </div>
    )
}

export default Blog