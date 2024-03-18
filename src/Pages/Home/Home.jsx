import "./Home.scss"

import Stories from '../../Components/stories/Stories'
import './Home.scss'
import Posts from "../../Components/posts/Posts"
const Home = () => {
  return (
    <div className='home'>
      <Stories/>
      <Posts/>
    </div>
  )
}

export default Home
