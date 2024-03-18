
import "./Comments.scss";


const Comments = () => {

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
       "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=600" ,
       
       
   },
   ];

  return (
    <div className="comments">{
      comments.map(comment=>(
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))
    }
  </div>
  );
;}

export default Comments
