import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import DataContext from "./context/DataContext"

const PostPage = () => {
  const {posts,handleDelete} = useContext(DataContext)
  const {id} = useParams()
  const post = posts.find((post) => (post.id).toString()===id)
  return (
    <main className="PostPage">
        <article className="post">
          {post &&
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <Link to={`/edit/${post.id}`}><button style={{backgroundColor: "red"}}>Edit Post</button></Link>
              <button onClick={()=> handleDelete(post.id)} style={{backgroundColor: "red"}}>Delete Post</button>
            </>
          }

          {!post &&
            <>
              <h2>Post not found</h2>
              <p>Well that's disappointing</p>
              <p>Please Visit the Home page</p>
            </>

          }
        </article>  
    </main>
  )
}

export default PostPage