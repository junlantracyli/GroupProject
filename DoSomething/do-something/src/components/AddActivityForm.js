import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const AddActivityForm = () => {
    const [location, setLocation] = useState(""); 
    const [activity, setActivity] = useState(""); 
    const [dateAndTime, setDateAndTime] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    const addActivity= (e) => {
        e.preventDefault();

        api.post('http://localhost:8000/api/activities', {
            location,
            activity,
            dateAndTime,
            address,
            description
        })
            .then(res => {
                console.log(res);
                navigate("/myAccount"); // this will take us back to the myAccount
            })
            .catch(err=>{
                try {
                    let errorResponse = err.response.data.errors.message; // Get the errors from err.response.data
                    if (!errorResponse) {
                        errorResponse = err.response.data.message;
                    }
                    setErrors([errorResponse]);
                } catch (e) {
                    console.log(e);
                    setErrors(["There was an error, please try again"]);
                }   
            })
    }
    
    return (
        <div className="container">
            <div className="top1">
                <div className="top-left">
                    <h2>DoSomething Together</h2>
                    <p>Let's meet, make friends and enjoy life!</p>
                </div>
                <div className="top-right">
                <div>
                <span className="menu-item">
                <Link to={"/dashboard"}>
                    Dashboard
                </Link>
                </span>
                <span className="menu-item">
                <Link to={"/myAccount"}>
                    My Account
                </Link>
                </span>
                </div>
                <div>
                <span className="menu-item">
                <Link to={"/createActivity"}>
                    Create Activity
                </Link>
                </span>
                <span className="menu-item">
                <Link to={"/logout"}>
                    Log Out
                </Link>
                </span>
                </div>
                </div>
            </div>
            <fieldset>
            {errors.map((err, index) => <p className="error" key={index}>{err}</p>)}
            <form onSubmit={addActivity}>
            <table>
            <tbody>
            <tr>
                <td>
                <label>Location:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="location" 
                    value={location}
                    onChange = {(e)=>setLocation(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td>
                <label>Activity:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="activity" 
                    value={activity}
                    onChange = {(e)=>setActivity(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td>
                <label>Date/Time:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="dateAndTime" 
                    value={dateAndTime}
                    onChange = {(e)=>setDateAndTime(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td>
                <label>Address:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="address" 
                    value={address}
                    onChange = {(e)=>setAddress(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                <label>Description:</label>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                <textarea className="large-textarea" type="text" 
                    name="description" 
                    value={description}
                    onChange = {(e)=>setDescription(e.target.value)} />
                </td>
            </tr>
            <tr>
            <td className="submit-button" colspan="2">
                <div className="center">
            <input className="b1" type="submit" value="Create"/>
            </div>
            </td>
            </tr>
                </tbody>
        </table>
            </form>
            </fieldset>
        </div>
    )
}
export default AddActivityForm;
