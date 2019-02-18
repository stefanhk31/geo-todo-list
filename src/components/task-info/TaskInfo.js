import React from 'react'

export default function TaskInfo({ location }) {
  return (    
    <div>
      <h3>{ location.toUpperCase() }</h3>
    </div>
  )
}
