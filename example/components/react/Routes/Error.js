import React from 'react'

export default ({error}) => {
  console.log('in error page !');
  return <h1>403 Forbidden. error = {error}</h1>
};
