import React from 'react'
import './About.css'

function About({ data }) {
  const {
    experience,
    narrative,
    certificates,
    years_of_experience,
    education: {
      university,
      highschool,
    }
  } = data;

  return (
    <div id="about" className='page-wrap'>
      <section className="mobile-padding">
        <h2>I'm a Computer Engineering student at the University of Waterloo,&nbsp;Canada.&nbsp;<span role="img" aria-label="smiley face">&#128515;</span>&nbsp;🍁</h2>
        <p style={{ maxWidth: "900px", paddingTop: '20px' }}>{narrative}</p>
      </section>
      <section>
        <div className="align-row">
          <h1 className='title'>EXPERIENCE</h1>
          <p style={{ paddingLeft: '10px', fontSize: '1em', fontWeight: 'bold' }}>({years_of_experience})</p>
        </div>
        <div className='experience-section'>
          {experience.map(exp => {
            return (
              <div className="experience-card">
                <div className="experience-head">
                  <img src={exp.imgUrl} alt=""></img>
                  <div>
                    <h2>{exp.role}</h2>
                    <p><b>{exp.company}</b> | {exp.duration}</p>
                  </div>
                </div>
                <ul>
                  {exp.points ? exp.points.map(point => <li>{point}</li>) : ""}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
      <section>
        <h1 className='title'>EDUCATION</h1>
        <div className='experience-section'>
          <div className="experience-card">
            <div className="experience-head">
              <img src={university.imgUrl} alt=""></img>
              <div>
                <p><span className='bold'>{university.degree}</span></p>
                <p>{university.name} | {university.duration}</p>
              </div>
            </div>
            <ul><li>{university.description}</li></ul>
          </div>
          <div className="experience-card">
            <div className="experience-head">
              <div class="img"><p>MSS</p></div>
              <div>
                <p><span className='bold'>{highschool.degree}</span></p>
                <p>{highschool.name} | {highschool.duration}</p>
              </div>
            </div>
            <ul><li>{highschool.description}</li></ul>
          </div>
        </div>
      </section>
      <section>
        <h1 className='title'>CERTIFICATES</h1>
        <div className='certificates-content'>
          {certificates.map(certificate => {
            return (
              <div className="certificate">
                <img src={certificate.url} alt=""/>
                <a href={certificate.url} target="_blank" alt="" rel="noopener noreferrer">{certificate.name.split(".")[0]}</a>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default About;
