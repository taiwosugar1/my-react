
import './Posts.scss'
import Post from './Post';

const Posts = () => {

 //temporary
 const posts =[ 
  { 
     id: 1,
      name: "Oguntoyinbo Taiwo",
      userId: 1,
      profilePic:
       "hhttps://images.pexels.com/photos/6405664/pexels-photo-6405664.jpeg?auto=compress&cs=tinysrgb&w=600",
       desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, consequatur",
       img: "https://images.pexels.com/photos/6182422/pexels-photo-6182422.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  { 
    id: 2,
     name: "Michael Olawale",
     userId: 2,
     profilePic:
      "https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "r adipisicing elit. Nemo, Lorem ipsum dolor sit, amet consectetuLorem ipsum dolor sit, amet consectetuconsequatur",
     
 },
 ];

  return <div className="posts">
      {posts.map(post=>(
   <Post post={post} key={post.id}/>
 ))}
    </div>;
};


export default Posts
