import React from 'react'


export default function Alert(props) {
  
  return (
    <div className='card p-3 d-flex align-items-center justify-content-center m-0'>
      <h2>{props.titel}</h2>
      <p>{props.message}</p>
      <button className='btn btn-danger' onClick={()=>{
        props.setError({
          titel:"",
          message:""
        })
      }}>אישור</button>
    </div>
  )
}
