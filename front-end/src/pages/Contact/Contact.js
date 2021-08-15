import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "../../components";
import "./Contact.css";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      message: "",
      spinner: false,
      filter: "",
    };
  }

  submitForm = (e) => {
    this.setState({ spinner: true, filter: "grayscale(80%)" });
    axios.post("/contact", {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
      })
      .then(() => this.setState({ spinner: false, filter: "" }))
      .catch((err) => {
        alert(err);
        this.setState({ spinner: false, filter: "" });
      });

    this.setState({
      name: "",
      email: "",
      message: "",
    });
    e.preventDefault();
  };

  render() {
    let spinner = "";
    if (this.state.spinner) {
      spinner = (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner />
        </div>
      );
    }
    return (
      <div
        id="contact"
        className="page-wrap"
        style={{ filter: this.state.filter }}
      >
        {spinner}
        <section>
          <h1 className="title">CONTACT ME</h1>
          <p>
            Send me an email and i'll get back to you as soon as possible!
          </p>
          <br></br>
        </section>
        <section className="contact-container">
          <form onSubmit={this.submitForm}>
            <div className="contact-input">
              <h3>Name:</h3>
              <input
                type="text"
                placeholder="John Tucker"
                id="contact-name"
                name="contact-name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                required
              />
            </div>
            <div className="contact-input">
              <h3>Email:</h3>
              <input
                type="email"
                placeholder="John@gmail.com"
                id="contact-email"
                name="contact-email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
            </div>
            <div className="contact-input">
              <h3>Message:</h3>
              <textarea
                rows="10"
                placeholder="Enter message here..."
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
                required
              />
            </div>
            <div className="contact-input" style={{display: 'flex', justifyContent:'center'}}>
              <input
                type="submit"
                className="button button-inverted"
                value="SEND EMAIL"
              />
            </div>
          </form>
        </section>
      </div>
    );
  }
}
