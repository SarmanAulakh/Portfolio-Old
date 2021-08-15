import React, { Component } from "react";
import axios from "axios";
import Typist from "react-typist";
import TypistLoop from "react-typist-loop";
import { About, Contact, Portfolio } from '../../pages'
import { Navbar, Button, Spinner } from "../../components";
import "./Home.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      backspace: ["Computer Engineer", "Tech Enthusiast", "Robust Debugger"],
      sidePage: "home",
      sideNav: 'slideOut',
      mobile: 'no',
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  //add event listners
  componentDidMount() {
    this.setState({
      sidePage: this.props.path
    })
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }



  //remove event listners
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  //toggles mobile and desktop on resize
  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.checkMobile()
  }

  downloadResume = () => {
    axios.get('/resume', {
      responseType: 'blob', // important
    })
      .then(res => {
        // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
        const newBlob = new Blob([res.data], { type: res.data.type })
        // create a link pointing to the ObjectURL containing the blob.
        const objUrl = window.URL.createObjectURL(newBlob);
        let link = document.createElement('a');
        link.href = objUrl;
        link.download = "Sarman's Resume.pdf";
        link.click();

        // For Firefox it is necessary to delay revoking the ObjectURL.
        setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
      })
  }

  //opens a new tab
  redirect = (location) => {
    let link = document.createElement('a');
    link.href = location
    link.target = "_blank"
    link.click()
  }

  //toggles mobile and desktop on menu click
  checkMobile = async (obj) => {
    if (obj !== '') {
      await this.setState(obj)
    }
  }

  render() {
    const { sidePage, backspace } = this.state;
    const { loading, data, certificates } = this.props;

    let page = ''
    if (loading) {
      page = <Spinner />
    } else {
      switch (sidePage) {
        case 'about':
          page = (
            <About
              data={{
                education: data.education,
                experience: data.experience,
                certificates: certificates,
                years_of_experience: data.years_of_experience,
                narrative: data.narrative,
              }}
              certificates={certificates}
            />)
          break;
        case 'contact':
          page = <Contact />
          break;
        default:
          page = (
            <Portfolio
              data={data.projects}
              categories={data.categories}
              toContact={() => this.setState({ sidePage: 'contact' })}
            />)
      }
    }

    return (
      <React.Fragment>
        <div id="home">
          <div className="left-col">
            <div className="banner">
              <p>CUSTOM css, no libraries!</p>
            </div>
            <div>
              <div id="main-text">
                <p>Hi, I'm</p>
                <h2 style={{ margin: "0px 0px 10px 0px" }}>SARMAN</h2>
                <TypistLoop interval={100}>
                  {backspace.map((text) => (
                    <Typist key={text} avgTypingDelay={50}>
                      {text}
                      <Typist.Backspace count={text.length} delay={2000} />
                    </Typist>
                  ))}
                </TypistLoop>
              </div>
              <div id="main-links">
                <Button
                  text="RESUME"
                  type="ring"
                  onClick={() => this.downloadResume()}
                />
                <div className="align-center">
                  <Button
                    text="GITHUB"
                    type="button-inverted"
                    onClick={() => this.redirect('https://github.com/Sarman5432')}
                  />
                  <Button
                    text="LINKEDIN"
                    type="button-inverted"
                    onClick={() => this.redirect('https://www.linkedin.com/in/sarmanaulakh/')}
                  />
                </div>

              </div>
            </div>
          </div>
          <div className="right-col">
            <Navbar
              mobile={this.state.mobile}
              sideNav={this.state.sideNav}
              toggleSideNav={(position) => this.setState({ sideNav: position })}
              click={this.checkMobile}
            />
            {page}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
