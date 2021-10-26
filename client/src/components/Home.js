import { Link } from "react-router-dom";
import "./Home.css";
import Login from "./LogIn";
import "bootstrap";
import "./SignUp.css";

function Home(props) {
  return (
    <div className="Home">
      <div className="backgroundBox">
        <div className="icon">
          <img src="../icon.png" alt="" style={{ width: 200 }}></img>
          <img src="../name.png" alt=""></img>
        </div>
        <div className="card">
          <div className="card-body">
            <div>
              <Login logInTheUser={props.logInTheUser}></Login>
            </div>
            <br />
            <hr />
            <br />
            <div className="signupBtn">
              <Link to="/">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Create New Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
