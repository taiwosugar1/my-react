import Stories from '../../Components/stories/Stories'
import './Home.css'
import Posts from "../../Components/posts/Posts"
import AddPost from "../../Components/posts/AddPost"
const Home = () => {
  return (
    <div className='home'>
      <Stories/>
      <AddPost /> 
      <Posts/>
    </div>
  )
}

export default Home
