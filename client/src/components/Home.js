// import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <div className="backgroundBox">
        <div className="text">
          <h1>IronProfile</h1>
          <p>Today we will create an App with Authorization and some cool styling</p>
        </div>
        {/* <div className="buttons">
          <Link to='/signup'><button>Sign Up</button></Link>
          <Link to='/login'><button>Log In</button></Link>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
