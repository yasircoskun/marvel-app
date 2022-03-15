import React from 'react';

const Thumbnail = (props) => {
  if (props.data == null) {
    return (<></>)
  }
  return (
    <div className='Thumbnail'>
      <img src={props.data.path + "/portrait_incredible." + props.data.extension} alt="..."></img>
    </div>
  )
}

export default Thumbnail;
