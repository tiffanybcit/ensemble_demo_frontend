import { useState } from 'react';


// =======================================
// Store token in local storage 
// =======================================
export default function UseToken() {
  // Getter
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  // Update state
  const [token, setToken] = useState(getToken());

  // In addition to saving the token to sessionStorage, save the token to state by calling setToken
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    // return an object that contains the token and 
    // saveToken set to the setToken property name. 
    // This will give the component the same interface. 
    setToken: saveToken,
    token
  }
}