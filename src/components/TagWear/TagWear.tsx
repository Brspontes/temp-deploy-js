import './style.less'
import React from 'react'

interface TagWearProps {
  readonly color: string
  readonly icon: React.ReactNode
  readonly text: string | undefined
}

function TagWear(props: TagWearProps) {
  return (
    <div className="tag-rounded">
      <div 
        className="tag-icon-container" 
        style={{ backgroundColor: props.color }}
      >
        {props.icon}
      </div>
      <span className="tag-text">{props.text}</span>
    </div>
  )
}

export default TagWear
