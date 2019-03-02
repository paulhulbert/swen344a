import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function LoginButton({
  loggedIn,
  loggingIn,
  attemptLogin,
}) {
  return (
    <Button
      disabled={loggedIn || loggingIn}
      onClick={attemptLogin}
      primary={true}
    >
      Log In
    </Button>
  )
}

LoginButton.propTypes = {
  loggedIn: PropTypes.bool,
  loggingIn: PropTypes.bool,
  attemptLogin: PropTypes.func.isRequired,
}