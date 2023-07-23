export const usernameValidation=(text)=>{
    const pattern=/(?=[a-z1-3])[A-Z]*/
   return pattern.test(text); 
  }