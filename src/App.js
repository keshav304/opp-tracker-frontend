import React from "react";
import Posts from "./core/components/Posts";
import Sidebar from "./core/components/sidebar/Sidebar";
import Layout from "./core/Layout.js";

const App = () => {
  const [type,setType] = React.useState('all')
  return (
    <Layout>
      <div className="container  ">
        <div className="row">
          <div className="col-3" >
            <Sidebar setType={setType}/>
          </div>

          <div className="col-9">
            <Posts type={type}/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
