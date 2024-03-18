//import { useContext } from 'react';

import './Stories.scss'



const Stories = () => {
   

    //temporary
    const stories =[ 
    
    { 
       id: 2,
        name: "Mitchel Mary",
        img: "https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
        id: 3,
         name: "Fuse maclin",
         img: "https://images.pexels.com/photos/804130/pexels-photo-804130.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 4,
         name: "Coal Mobe",
         img: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     { 
        id: 5,
         name: "Abiola Gabrel",
         img: "https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=600"
     },
     
    ];
  return (
    <div className='stories'>
         <div className="story">
            <img src="https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span><h3>Oguntoyinbo Taiwo</h3></span>
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
