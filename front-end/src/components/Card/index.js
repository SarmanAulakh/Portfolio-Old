import React from 'react'
import './styles.css'

export default function Card({
  imgUrl,
  projectName,
  tags,
  description,
  alt,
  category,
  startDate,
  onClick,
}) {
  return (
    <div class="container">
      <img
        src={imgUrl}
        alt={alt}
      />
      <div class="container__text">
        <h1>{projectName}</h1>
        <p style={{padding: 0}}>
          {description}
        </p>
        <div class="container__text__timing">
          <div class="container__text__timing_time">
            <h3>Category</h3>
            <p>{category}</p>
          </div>
          <div class="container__text__timing_time">
            <h3>Date Started</h3>
            <p>{startDate}</p>
          </div>
          <div class="container__text__timing_time">
            <h3>Tags</h3>
            <p>{tags}</p>
          </div>
        </div>
        <button class="btn" onClick={onClick}>View Project</button>
      </div>
    </div>
  )
}
