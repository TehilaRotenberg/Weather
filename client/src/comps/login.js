
import React, { useContext, useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { usernameValidation } from '../validation/userValidation'
import { apiMethod } from '../general/request'
import './style.css';
import ContexProvider from '../contex';
import UserContex from '../contex';
import Alert from './alert';


export default function Login() {

  const [validationuserName,setVlidatationUsername]=useState(true)
  const navigate=useNavigate();
  const [loding,setLoding]=useState(false)

  const [error,setError]=useState({
    titel:"",
    message:""
  })

  useEffect(()=>{
    onLoade()
 
  },[])

  const [formData,setFormData]=useState({
    user_name:"",user_mispar_ishi:"",
  })

  const onLoade=async()=>{
    if (localStorage["user"]) {
     await setFormData(JSON.parse(localStorage.getItem("user")));
    }   
    
    // login()
   
  }

  const loderCities=async()=>{
    console.log(localStorage.getItem("user"));
   try{
    let resp=await apiMethod("http://localhost:3001/getAllCities","get",{},JSON.parse(localStorage.getItem("user")))
    setCities(resp.data)
  }catch(error){
    console.log(error);
  }
   } 

  const {user,setUser,setCities}=useContext(UserContex)
  
  const handleChange=async(event)=>{
    setFormData(prevFormData => {
      return {
          ...prevFormData,
          [event.target.name]: event.target.value
      }  
  })
  }

  const onSubmit=(event)=>{
      event.preventDefault();
      login()
      
  }

  const login=async ()=>{
  setLoding(true)
    try {
        setVlidatationUsername(usernameValidation(formData.user_name)) 
        let resp= await apiMethod('http://localhost:3001/login','post',{ },formData)
        if ( resp.status==200) {
          localStorage.setItem("user",JSON.stringify(formData))
          setUser(resp.data);
          await loderCities()
        
          navigate("/home")
        } else {
        setLoding(false) 
        setError(prevAlert=>{
          return{
            ...prevAlert,["message"]:"אופס... שגיאה אנא נסה מאוחר יותר"
          }
        })
        }
       
    } catch (error) {
      await setLoding(false) 
      setError({titel:"שגיאת התחברות", message:"אחד מהנתונים שהוקשו שגוי"})
    }
    
  }

  return (
  <React.Fragment>
   <div className='container'>
    {(!loding &&error.message=="")&&
    <form className='container bg-light card ' onSubmit={onSubmit} >

      <div className='mb-3'>
        <label className='form-lable'>שם משתמש</label>
        <input className='form-control' name='user_name' onChange={handleChange}></input>
        {(!validationuserName)? <span className='text-danger'>שם משתמש  חייב להיות באנגילית עם אות  גדולה אחת לפחות ומקסימום 3 ספרות</span>:""}
      </div>

      <div className='mb-3'>
        <label className='form-lable'>סיסמא</label>
        <input className='form-control' name='user_mispar_ishi' onChange={handleChange}></input>
      </div>

        <button className='btn btn-warning'>התחברות</button>
        
    </form>}
    
    {(loding)&&<div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
             <span className="visually-hidden">Loading...</span>
        </div>
        <span>loding...</span>
    </div>}

    {(error.message.length>0 &&(!loding))&&<Alert titel={error.titel} message={error.message} setError={setError}></Alert>}</div>
  </React.Fragment>
  )
}
