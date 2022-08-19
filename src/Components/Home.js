import React from 'react'
import { Notes } from './Notes'


function Home(props) {



  return (
    <>
      <Notes showAlert = {props.showAlert}/>
    </>

  )
}

export default Home
