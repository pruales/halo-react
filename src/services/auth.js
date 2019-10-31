import axios from 'axios';

export const isBrowser = () => typeof window !== "undefined";

export const getAccessToken = () =>
  isBrowser() && window.localStorage.getItem("access_token")
    ? window.localStorage.getItem("access_token")
    : null;


export const handleLogin = async (credentials) => {
    return axios.post(`http://8daed917.ngrok.io/login`, credentials);
}

export const handleRegister = async (credentials) => {
    return axios.post(`http://8daed917.ngrok.io/register`, credentials)
}

export const isLoggedIn = () => {
  const accessToken = getAccessToken()
  console.log(accessToken ?  true: false)
  return accessToken ? true : false
}

export const logout = async () => {
    const token = window.localStorage.getItem('access_token')
    return axios.post(`http://8daed917.ngrok.io/logout/access`, {}, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
}