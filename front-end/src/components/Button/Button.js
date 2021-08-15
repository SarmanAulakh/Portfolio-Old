import React from 'react'
import './styles.css'

function Button(props) {
  const { onClick, text, type, style, wrapStyle } = props;

  return (
    <div class="wrap" style={wrapStyle}>
      <button class={`button ${type}`} style={style} onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button;