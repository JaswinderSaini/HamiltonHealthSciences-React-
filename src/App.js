import React, { useState } from "react";
import './App.css';
import data from "./data.json";
import hospital from "./images/hospital.png";
import footer2 from "./images/footer2.png";
//import {css} from "emotion";

/**
 * This function is creating webpage(form, table, etc.) and handles the data being entered and displayed
 * 
 * @returns The Main Content of the Page
 */
function App() {
  // to store the data from json file
  const [patientInfo, setPatientInfo] = useState(data);

  // to store data from form 
  const [addformData, setaddFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth:'',
    healthCard: '',
    gender: 'Male'
  })

  // to use as the warning message
  const [msg, setMsg] = useState({
    message:''
  })

  /** 
   * It updates the addformData according to FirstName, LastName, DateOfBirth and Gender field input
  */
  const handleForm = (event) =>{
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addformData};
    // if the entered data is coming from DateOfBirth
    if(fieldName === "dateOfBirth"){
      let date = new Date(fieldValue);
      let current = new Date();
      let currentTime = new Date(current.getFullYear(),current.getMonth(),current.getDate());
      
      // checking if the entered date is not a future date
      if(date < currentTime){
        newFormData[fieldName] = fieldValue;
        setaddFormData(newFormData);
        msg.message= "";
      }
      else{
        newFormData[fieldName] = "";
        setaddFormData(newFormData);
        setMsg({message: "-- Please fill the right Date --"});
        //msg.message= "-- Please fill the right Date --";
      }
    }
    // update all the other data except DateOfBirth
    else{
      newFormData[fieldName] = fieldValue;
      setaddFormData(newFormData);
      msg.message= "";
    }
  }

  /**
   * It updates the addformData according HealthCardNumber field input
   **/
  const handleCardNumber = (event) =>{
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addformData};
    let name = parseInt(fieldValue);

    // checking if the given value is number 
    if(!isNaN(name)){
      newFormData[fieldName] = name.toString();
      setaddFormData(newFormData);
    }
    else{
      newFormData[fieldName] = "";
      setaddFormData(newFormData);
    }

    // keep showing this message until the healthCardNumber's length is 10
    if(fieldValue.length < 10){
      msg.message= "-- Health Card Number should be 10 Digit long --";
    }
    else{
      msg.message= "";
    }
  }

  /**
   * It handles the form submit and updates the table with added values
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let healthCard = addformData.healthCard;
    let total = 0;

    // checking if the healthCardNumber is 10 digit long
    if(addformData.healthCard.length === 10){
      let checkDigit = parseInt(healthCard[healthCard.length-1]);   // check digit value

      // going through healthCardNumber and perfoeming mod 10
      for(let i = 0; i < healthCard.length - 1; i++){
        // the value that needs to be doubled
        if(i % 2 === 0){
          let addValue = parseInt(healthCard[i]) * 2;
          // if the number is greater than 9, split it and add it together then add it to the total
          if(addValue > 9){
            let string = addValue.toString();
            let a = parseInt(string[0]);
            let b = parseInt(string[1]);
            let add = a+b;
            total += add;
          }
          else{
            total += addValue;
          }
        }
        // adding even position digits
        else{
          total += parseInt(healthCard[i]);
        }
      }

      // checking the check digit is matching with the result and updating table and clearing form
      if(checkDigit === (10 - (total % 10))){
        // patient to add to the table
        const newPatient = {
          firstName: addformData.firstName,
          lastName: addformData.lastName,
          dateOfBirth: addformData.dateOfBirth,
          healthCard: addformData.healthCard,
          gender: addformData.gender
        }
        const newPatients = [...patientInfo, newPatient];
        setPatientInfo(newPatients);

        addformData.firstName = "";
        addformData.lastName = "";
        addformData.dateOfBirth = "";
        addformData.healthCard = "";

        msg.message= "";
      }
      // if check digit does not match, let the user know
      else{
        const newFormData = { ...addformData};
        newFormData["healthCard"] = "";
        setaddFormData(newFormData);
        msg.message = "-- Check Digit does not match. Invalid Health Card Number!!! --"
      }
    }
    // if healthCardNumber's length is less than 10 then let the user know
    else{
      const newFormData = { ...addformData};
      newFormData["healthCard"] = "";
      setaddFormData(newFormData);
      msg.message= "-- Health Card Number is not valid --";
    }
  }

  // returning the content of the webpage
  return (
    <div className="app-container">
      <header>
        <img src={hospital} id="mainImage"/>
        <h1>Hamilton Health Sciences</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">COVID-19</a>
            <a href="#">Services</a>
            <a href="#">News</a>
            <a href="#">About Us</a>
            <a href="#" id="signIn">SignIn</a>
        </nav>
        <p>-- The form below is for online registration for a new patient. Feel free take your time and fill the form -- </p>
    </header>
      <h2>Fill the Form</h2>
      <div id = "addForm">
        <span><p>{msg["message"]}</p></span>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor ="firstName">First Name:</label>
            <input type="text" id = "firstName" name = "firstName" maxLength = "20" value = {addformData["firstName"]}  onChange={handleForm} required ="required" />
          </div>
          
          <div>
            <label htmlFor = "lastName">Last Name:</label>
            <input type="text" id ="lastName" name = "lastName" maxLength = "20" value = {addformData["lastName"]}  onChange={handleForm} required ="required" />
          </div>
         
          <div>
          <label htmlFor = "dateOfBirth" >Date of birth:</label>
          <input type="date" name = "dateOfBirth" value = {addformData["dateOfBirth"]}   onChange={handleForm} required ="required" id ="dateOfBirth"/>
          </div>

          <div>
            <label htmlFor="healthCard">Health Card Number:</label>
            <input type="text" name = "healthCard" value = {addformData["healthCard"]} maxLength="10" onChange={handleCardNumber} required ="required" id ="healthCard" />
          </div>

          <div>
            <label htmlFor ="gender">Gender:</label> 
            <select name = "gender" value = {addformData["gender"]}  onChange={handleForm} id ="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div id = "submit">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
      <h3>Patients Information</h3>
      <div id ="table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of birth</th>
              <th>HealthCard Number</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {patientInfo.map((patient)=>
            <tr key = {patient.firstName}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.dateOfBirth}</td>
              <td>{patient.healthCard}</td>
              <td>{patient.gender}</td>
          </tr>
          )}   
          </tbody>
        </table>
      </div>
      <footer>
      <div id ="footContainer">
            <div>
                <img src = {footer2} />
            </div>
            <div>
                <p className="center">Home</p>
                <p className="center">New Updates</p>
                <p className="center hidden">New Covid-19 guidelines</p>
            </div>
            <div>
                <p className="center">Our Goal</p>
                <p className="center">Our Work</p>
                <p className="center hidden">Our Network</p>
            </div>
        </div>
      </footer>
    </div>
    
  );
}
/** <img src="https://www.transparentpng.com/thumb/baby-png/the-boss-baby-png-transparent-image-35.png"/>*/
export default App;
