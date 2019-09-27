import React, { Fragment } from "react";
import {Link} from 'react-router-dom'
const RestComponentStudentDataDisplay = ({ info }) => {
  const { name, age, joiningDate, addressData } = info;
  const { coursesRegistered } = info;
  return (
    <Fragment>
      <div className="row">
        <div className="column">
          <div className="card">
            <h2>Name :{name}</h2>
            Age :{age}
            <br/>
            DOJ :{joiningDate}
          </div>
        </div>
      

        {coursesRegistered.length>0 && (coursesRegistered.map(course =>(
            <div className="column" key= {course.id}>
            <div className="card">
              <h2>{course.coursename}</h2>
            </div>
          </div>
        ))) 
          
        }
      <div className="column">
        {addressData !== null && addressData !== undefined && (
          <div className="card">
            <h2>{"Address"}</h2>
            <h3>{addressData.locality}</h3>
            <h3>{addressData.pincode}</h3>
          </div>
        )}
      </div>
      </div>
     
    </Fragment>
  );
};

export default RestComponentStudentDataDisplay;
