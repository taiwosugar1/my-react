
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { useState } from 'react';
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()


  let navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    let Userdata ={ username, name, email, password }
  axios.post('http://localhost:3001/register', Userdata )
  .then((res)=>{
    alert("Data is successfully added")
  navigate('/login')

}).catch((err) => {
  console.log(err.message);
})
};




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
      <hr/>
      <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder=' Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)} required />
              <input type="name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
              <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
              <button>Submit</button>
              
          
          </form>
      </div>
    </div>
  </div>

)
}

export default Register
