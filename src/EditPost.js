import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from './context/DataContext'

const EditPost = () => {
    const { posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody }= useContext(DataContext)
    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <h2>EditPost</h2>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)} />

                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)} />

                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post not found</h2>
                    <p>Well that's disappointing</p>
                    <p>Please Visit the Home page</p>
                </>
            }
        </main>
    )
}

export default EditPost