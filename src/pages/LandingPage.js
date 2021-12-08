import React from 'react';
import { isLogged } from '../routes/token';

function LandingPage(props) {
  return (
    <>
      <div className='landing'>
        {isLogged() ? props.history.push('/home') : props.history.push('/entrar')}
      </div>
    </>
  );
}
export default LandingPage;
