import React from 'react';

const Thumbnail = (props) => {
  if (props.imageURL == null) {
    return (<></>)
  }
  return (
    <div className='Thumbnail'>
      <img src={props.imageURL} alt="..."></img>
    </div>
  )
}

export default Thumbnail;
