import { useContext } from "react";
import "./Comments.scss";
import {AuthContext} from '../../context/authContext'

const Comments = () => {

//temporary

const {currentUser} = useContext(AuthContext)

const comments = [ 
    { 
       id: 1,
       desc: "Nemo, consequatuLorem ipsum dolor sit, amet consectetur adipisicing elir",
        name: "Oguntoyinbo Taiwo",
        userId: 1,
        profilePicture:
         "hhttps://images.pexels.com/photos/6405664/pexels-photo-6405664.jpeg?auto=compress&cs=tinysrgb&w=600",
        
        
    },
    { 
      id: 2,
      desc: "tetuLorem ipsur adipisicing elit. Nemo, Lorem ipsum dolor sit, amet co sit, amet consectetuconsequatur",
       name: "Michael Olawale",
       userId: 2,
       profilePicture:
       <img src= "https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />,
       
       
   },
   ];

  return (
    <div className="comments">
      <div className="write">
      <img src={currentUser.profilePic} alt="" />
 <input type="text" placeholder="write a comment" />  
 <button></button>   
      </div>
      {comments.map(comment=>(
        <div className="comment">
            <img src={comment.profilePicture} alt="" />
            <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
            </div>
           
            <span className="date">1 hour AGO</span>
        </div>
      ))}
    </div>
  )
}

export default Comments
