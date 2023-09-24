const UseVerifyAuth = () => {
    const userHistory = JSON.parse(localStorage.getItem("On-Campus"));
    if (userHistory !== null && (  window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password') ) {
        return userHistory;
        
    } else if (userHistory === null&& ( window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password')) {
        // window.location.href = "/";
        return true
    }
    else return true
};



export default UseVerifyAuth;
