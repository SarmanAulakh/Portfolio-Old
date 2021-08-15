import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import { Helmet } from "react-helmet";
import { Home } from "./pages";

import "./App.css";

axios.defaults.baseURL = 'https://us-central1-portfolio-c0519.cloudfunctions.net/api'

export default function App() {
  let [loading, setLoading] = useState(true)
  let [json, setJson] = useState("")
  let [certificates, setCertificates] = useState()

  useEffect(() => {
    async function fetchData() {
      let success = true
      await axios.get("/")
        .then((res) => {
          setJson(res.data)
        })
        .catch((err) => {
          success = false
          console.log(err)
        });

      await axios.get("/certificates")
        .then(res => setCertificates(res.data))
        .catch((err) => {
          success = false
          console.log(err)
        });

        if (success) {
          setLoading(false)
        }
    }
    fetchData()
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Helmet>
              <meta
                name="Sarmandeep Aulakh - Home Page"
                content={`Learn about Sarmandeep Aulakh. Computer Engineering student at the University of Waterloo who enjoys Software/Web development. ${keywords}`}
              />
              <title>Sarman Aulakh - Home Page</title>
              <link rel="canonical" href="http://www.sarmanaulakh.com" />
              <link rel="canonical" href="https://github.com/Sarman5432" />
              <link rel="canonical" href="https://www.linkedin.com/in/sarmanaulakh/" />
            </Helmet>
            <Home path="portfolio" data={json} loading={loading} />
          </Route>
          <Route path="/about">
            <Helmet>
              <meta
                name="Sarmandeep Aulakh - Home Page"
                content={`Learn about Sarmandeep Aulakh. Computer Engineering student at the University of Waterloo who enjoys Software/Web development. ${keywords}`}
              />
              <title>Sarman Aulakh - About Page</title>
              <link rel="canonical" href="http://www.sarmanaulakh.com" />
              <link rel="canonical" href="https://github.com/Sarman5432" />
              <link rel="canonical" href="https://www.linkedin.com/in/sarmanaulakh/" />
            </Helmet>
            <Home path="about" data={json} certificates={certificates} loading={loading} />
          </Route>
          <Route path="/contact">
            <Helmet>
              <meta
                name="Sarmandeep Aulakh - Contact Page"
                content={`Contact Sarmandeep Aulakh. Computer Engineering student at the University of Waterloo who enjoys Software/Web development. ${keywords}`}
              />
              <title>Sarman Aulakh - Contact Page</title>
              <link rel="canonical" href="http://www.sarmanaulakh.com" />
              <link rel="canonical" href="https://github.com/Sarman5432" />
              <link rel="canonical" href="https://www.linkedin.com/in/sarmanaulakh/" />
            </Helmet>
            <Home path="contact" data={json} loading={loading} />
          </Route>
          <Route path="/*">
            <Helmet>
              <meta
                name="Sarmandeep Aulakh - Error Page"
                content={`This page does not exists. ${keywords}`}
              />
              <title>Sarman Aulakh - Error Page</title>
              <link rel="canonical" href="http://www.sarmanaulakh.com" />
              <link rel="canonical" href="https://github.com/Sarman5432" />
              <link rel="canonical" href="https://www.linkedin.com/in/sarmanaulakh/" />
            </Helmet>
            <div style={{ textAlign: 'center', paddingTop: '100px' }}>This page does not exist!</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const keywords = 'Github, Linkden, Java, Web Development, app developement, python, javascript, html, css, jenkins, devops, robotics, Waterloo, Engineering Student, Youtube'