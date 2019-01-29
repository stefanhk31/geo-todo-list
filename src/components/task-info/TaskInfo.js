import React from 'react'

export default function TaskInfo({ location, text }) {
  return (    
    <div>
      <h3>{ location.toUpperCase() }</h3>
      <p><strong>Task:</strong> { text }</p>
    </div>
  )
}
