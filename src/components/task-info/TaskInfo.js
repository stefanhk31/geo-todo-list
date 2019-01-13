import React from 'react'

export default function TaskInfo({ location, text }) {
  return (
    <div>
      <h3>{ location }</h3>
      <p><strong>Task:</strong> { text }</p>
    </div>
  )
}
