import React,{useContext,useEffect} from 'react'
import ContactContext from './../../../context/contacts/contactContext';
import RestComponentStudentDataDisplay from './RestComponentStudentDataDisplay';
import {Link} from 'react-router-dom'

const RestComponent = () => {
    const contactContext =useContext(ContactContext);
    const {getRestData,resData} = contactContext;
    useEffect(() => {
        getRestData();
        //eslint-disable-next-line
    },[]);

    if(resData.length === 0) {
        return <div>No Student Information Availabe</div>;
    }

    console.log("Rest Component" , resData);

    return (
        <div>
            {resData.map(data => (
               <RestComponentStudentDataDisplay key = {data.id} info = {data}/>
               
            ))}
             <div>
          <Link to  = '/'>Go Back</Link>
      </div>
        </div>
    )
}

export default RestComponent
