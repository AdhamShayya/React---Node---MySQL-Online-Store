import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function Profile() {

    let { id } = useParams()
    const [username, setUsername] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    
    const navigate = useNavigate()
    
    useEffect(() => {
        axios
        .get(`http://localhost:4000/users/basicinfo/${id}`)
        .then((response) => { // response.data its an object that contains the name...
            setUsername(response.data.username)
        })

        axios
        .get(`http://localhost:4000/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data)
        })
    }, [])



  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username} </h1> 
        <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}>{value.description}</div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">

                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
      </div>
      <div></div>
    </div>
  )
}

export default Profile
