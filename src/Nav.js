import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const Nav = () => {
  const {search,setSearch} = useContext(DataContext)
  return (
    <nav className='Nav'> 
      <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search">Search Post :</label>
        <input
         type="text"
         id="search"
         placeholder='Search Post'
         value={search}
         onChange={(e)=>setSearch(e.target.value)} />

         <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/post">Post</Link></li>
         </ul>
      </form>
    </nav>
  )
}

export default Nav