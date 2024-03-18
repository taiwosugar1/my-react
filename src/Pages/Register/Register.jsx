
import { Link } from 'react-router-dom'
import './Register.scss'


const Register = () => {




  return (
    
    <div className='register'>
    <div className="card">
      <div className="left">
          <h1>Multi <br/>brand </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut quos maiores? Voluptate hic ut minima. Id vel alias laudantium!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
      </div>
      <div className="right">
          <h1>Register</h1>
          <form>
              <input type="text" placeholder='Username' />
              <input type="email" placeholder='Email' />
              <input type="text" placeholder='Name' />
              <input type="password" placeholder='Password' />
              <button>Register</button>
          </form>
      </div>
    </div>
  </div>

)
}

export default Register
