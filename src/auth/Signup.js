import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import dotenv from "dotenv";
import Google from "./Google";
import Layout from "../core/Layout";
import { authenticate, isAuth } from "./Helpers";

dotenv.config();

const Signup = ({history}) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "submit",
  });
  const { name, email, password } = values;

  const handleChange = (field) => (event) => {
    //check the field whether it is name,email,password and change state accordingly
    setValues({ ...values, [field]: event.target.value });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/");
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DEPLOYED_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("signup success", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("signup error", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form>
    <section>
		<div class="login_box">
			<div class="left">
				<div class="top_link"><Link to="/">
        <img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt=""/>Return home</Link></div>
				<div class="contact">
					<form action="">
						<h3>SIGN UP</h3>
						<input type="text" placeholder="DISPLAY NAME" onChange={handleChange("name")}
          value={name}/>
						<input type="text" placeholder="EMAIL" onChange={handleChange("email")}
          value={email}/>
						<input type="text" placeholder="PASSWORD" onChange={handleChange("password")}
          value={password}/>
						<button class="submit" onClick={clickSubmit}>LET'S GO</button>
            

        <Google text="Signup With Google" informParent={informParent}/>
        <Link to="/signin" className="text-center text-decoration-none d-flex justify-content-center">
  
          <h4 className="mt-5 btn btn-outline-info ">Have an account? Log in</h4>
        </Link>
					</form>
				</div>
			</div>
			<div class="right">
				<div class="right-text">
					<h2>Sathyabama Event Tracker</h2>
					<h5>Oraganise Events With Ease</h5>
				</div>
				<div class="right-inductor"><img src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft" alt=""/></div>
			</div>
		</div>

	</section>
   
    </form>
    // <form>
    //   <div className="form-group">
    //     <label className="text-muted">Name</label>
    //     <input
    //       onChange={handleChange("name")}
    //       value={name}
    //       type="text"
    //       className="form-control"
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label className="text-muted">Email</label>
    //     <input
    //       onChange={handleChange("email")}
    //       value={email}
    //       type="email"
    //       className="form-control"
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label className="text-muted">Password</label>
    //     <input
    //       onChange={handleChange("password")}
    //       value={password}
    //       type="password"
    //       className="form-control"
    //     />
    //   </div>
    //   <div className="d-flex justify-content-center mt-3">
    //     <button className="btn btn-primary mt-2 w-50" onClick={clickSubmit}>
    //       {buttonText}
    //     </button>
    //   </div>
    // </form>
  );


  
  return (
    <Layout>
      <div className="col-md-6 offset-md-3 vh-100 ">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="p-5 text-center ">Opportunity Tracker</h1>
        {signupForm()}

      </div>
    </Layout>
  );
};

export default Signup;
