import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"
import api from "../api/posts"
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({})

export  const DataProvider = ({children}) => {
    const [search, setSearch] = useState('')

  const [posts, setPosts] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  const navigate = useNavigate()
  const {width} = useWindowSize()
  const {data , fetchError , isLoading} = useAxiosFetch('http://localhost:3500/posts')


  useEffect(() => {
    setPosts(data)
  },[data])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts")
        setPosts(response.data)
      }
      catch (err) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else {
          console.log(`Error : ${err.message}`)
        }
      }
    }

    fetchPosts()
  },[])

  useEffect(() => {
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResult(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost)
      const allPost = [...posts, response.data]
      setPosts(allPost)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }
      else {
        console.log(`Error : ${err.message}`)
      }
    }

  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')

    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }
      else {
        console.log(`Error : ${err.message}`)
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      const postList = posts.filter(post => post.id !== id)
      setPosts(postList)
      navigate('/')
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }
      else {
        console.log(`Error : ${err.message}`)
      }
    }

  }

    return(
    <DataContext.Provider value={{
        width,search,setSearch,searchResult,isLoading,fetchError,
        handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
        posts,handleDelete, handleEdit, editTitle, setEditTitle,
        editBody, setEditBody

    }}>
        {children}
    </DataContext.Provider>
    )
}

export default DataContext