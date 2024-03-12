import { useContext } from 'react';
import './Stories.scss'
import { AuthContext } from '../../context/authContext';


const Stories = () => {
    const {currentUser} =useContext(AuthContext)

    //temporary
    const stories =[ 
    { 
       id: 1,
        name: "Oguntoyinbo Taiwo",
        img: "hhttps://images.pexels.com/photos/6405664/pexels-photo-6405664.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    { 
       id: 2,
        name: "Oguntoyinbo Taiwo",
        img: "https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
        id: 3,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/804130/pexels-photo-804130.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 4,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 5,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/3764579/pexels-photo-3764579.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 6,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/264512/pexels-photo-264512.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 7,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 8,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 9,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/1181245/pexels-photo-1181245.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 10,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
    
     { 
        id: 11,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 12,
         name: "Oguntoyinbo Taiwo",
         img: "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=600"
     }
    ];
  return (
    <div className='stories'>
         <div className="story">
            <img src={currentUser.ProfilePic} alt="" />
            <span>{currentUser.name}</span>
            <button>+</button>

        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
            <img src={story.img} alt="" />
            <span>{story.name}</span>
        </div>
        
      ))}
    </div>
  )
}

export default Stories
