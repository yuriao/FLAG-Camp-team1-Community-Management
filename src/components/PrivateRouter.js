import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {hasToken} from './UserToken';

const PrivateRouter = ({ component: Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={
            routeProps => (
           hasToken()? <Component {...routeProps} /> : <Redirect to ='/'/>        
        )}
      />
    );
  }
  export default PrivateRouter;