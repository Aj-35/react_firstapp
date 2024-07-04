import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResult,isLoading,fetchError} = useContext(DataContext)
  return (
    <main className='Home'>
       {isLoading && <p>Loading Posts</p>}
       {!isLoading && fetchError && <p>{fetchError}</p>}
       {!isLoading && !fetchError && (searchResult.length ? (<Feed posts={searchResult}/>)
       : (<p style={{marginTop:"2rem"}}> No Post to display</p>)) 
       }
    </main>
  )
}

export default Home