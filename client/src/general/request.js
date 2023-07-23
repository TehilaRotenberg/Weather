import axios from 'axios'

export const apiMethod = async (_url, _method,body,_headers) => {
  try {
   
    let resp = await axios({
      url: _url,
      method: _method,
      data: body,
      headers: _headers
    });
    console.log(resp.data);
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const apiGetMethod=async (_url)=>{
 
    try {
      let resp = await axios.get(_url, {
        headers: {
        },
      });
      return resp;
    } catch (err) {
      // throw-> בבקשות של פרומיס מזהים את זה בתור החזרת שגיאה
      throw err;
    }
  }