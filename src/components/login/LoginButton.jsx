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
      primary
    >
      Log In
    </Button>
  );
}

LoginButton.defaultProps = {
  loggedIn: false,
  loggingIn: false,
};

LoginButton.propTypes = {
  loggedIn: PropTypes.bool,
  loggingIn: PropTypes.bool,
  attemptLogin: PropTypes.func.isRequired,
};
