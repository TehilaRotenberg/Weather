import React, { createContext, useState } from 'react'

const UserContex= createContext()


export  function ContexProvider({children}) {
    const [user,setUser]=useState({})
    const [cities,setCities]=useState([])
  return (
    <UserContex.Provider value={{user,setUser,cities,setCities}}>
        {children}
    </UserContex.Provider>
  )

}

  export default UserContex;