import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import dotenv from "dotenv";
import Layout from "../Layout";
import { isAuth } from "../../auth/Helpers";
import './createpost.css';

dotenv.config()
// import { authenticate, isAuth } from "./Helpers";

const Createpost = (props) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    detailsLink: "",
    registrationLink: "",
    category: "",
    buttonText: "submit",
  });
  const history = useHistory();

  const [option, setOption] = useState();
  const userId = isAuth()._id;
  function handleCategoryChange(event) {
    setOption(event.target.value);
    setValues({ ...values, category: option });
  }

  const {
    name,
    description,
    detailsLink,
    registrationLink,
    category,
    buttonText,
  } = values;

  const handleChange = (field) => (event) => {
    //check the field whether it is name,email,password and change state accordingly
    setValues({ ...values, [field]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DEPLOYED_API}/post`,
      data: {userId, name, description, detailsLink, registrationLink, category },
    })
      .then((response) => {
        setValues({
          ...values,
          name: "",
          description: "",
          detailsLink: "",
          registrationLink: "",
          category: "",
          buttonText: "submit",
        });
        history.push('/')
      })
      .catch((error) => {
        console.log("post submittion error", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const createPostForm = () => (
    <section id="contact09">
  <div class="contact-box">
    <div class="contact-links">
      <h2 class="animate-charcter">SATHYABAMA EVENT TRACKER</h2>
      <div class="links">
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.  </p>
      </div>
    </div>
    <div class="contact-form-wrapper">
      <form>
        <h4>POST NEW EVENT</h4>
        <p>GOOD LUCK FOR THE EVENT</p>
        <div class="form-item">
          <input type="text" name="organiser" onChange={handleChange("name")} value={name} required/>
          <label>Organiser:</label>
        </div>
        <div class="form-item">
          <textarea type="text" name="description" onChange={handleChange("description")}
          value={description} rows={3} required/>
          <label>Description</label>
        </div>
        <div class="form-item">
          <input type="url" name="details" onChange={handleChange("detailsLink")}
          value={detailsLink} required/>
          <label> Details Link</label>
        </div>
        <div class="form-item">
          <input type="url" name="registe" onChange={handleChange("registrationLink")}
          value={registrationLink} required/>
          <label>Registration Link</label>
        </div>
        {/* <div className="form-item">
        <label>Category</label> */}

        <select className="form-item category-selector" name="category" placeholder="Category" onChange={handleCategoryChange}>
          <option value="Coding">Coding</option>
          <option value="interships">Interships</option>
          <option value="openSource">Open Source </option>
          <option value="Scholarships">Scholarships</option>
          <option value="studentPrograms">Student Programs</option>
          <option value="OtherCategories">Other Categories</option>
        </select>
      {/* </div> */}
        <a href="#" class="custom-btn btn-11 btn-12" onClick={clickSubmit}>{buttonText}</a>
      </form>
    </div>
  </div>
</section>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {createPostForm()}
      </div>
    </Layout>
  );
};

export default Createpost;
