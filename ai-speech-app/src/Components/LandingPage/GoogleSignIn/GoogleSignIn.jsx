import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleSignInButton = ({ onSuccess, onFailure }) => {
  const CLIENT_ID = '542417165126-tajqofllkjmbkpjm2uvvg6tskvio897g.apps.googleusercontent.com';

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleSignInButton;
