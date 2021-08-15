import React, { Component } from "react";
import "./Dropdown.css";

export default class Dropdown extends Component {
  constructor(props) {
    super();
    this.state = {
      arrow: "rotate(90deg)",
      display: "none",
      value: "",
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.placeholder });
  }

  toggleDropdown = () =>
    this.setState({
      arrow:
        this.state.arrow === "rotate(90deg)"
          ? "rotate(-90deg)"
          : "rotate(90deg)",
      display: this.state.display === "none" ? "block" : "none",
    });

  resetValue = () => this.setState({ value: this.props.placeholder})

  render() {
    return (
      <div className={`dropdown ${this.props.className}`}>
        <div id="drop-default" onClick={() => this.toggleDropdown()}>
          {this.state.value}
          <div
            className="drop-arrow"
            style={{ transform: `translate(-10px, -50%) ${this.state.arrow}` }}
          >
            {">"}
          </div>
        </div>
        <ul className="dropdown-items" style={{ display: this.state.display }}>
          {this.props.items.map((item) => (
            <li
              key={item}
              className="drop-item"
              onClick={() => {
                this.setState({ value: item });
                this.props.updateFilters(item)
                this.toggleDropdown();
              }}
            >
              {item}
            </li>
          ))}
          <li
            className="drop-item"
            onClick={() => {
              this.props.updateFilters("")
              this.resetValue();
              this.toggleDropdown();
            }}
          >
            Clear
          </li>
        </ul>
      </div>
    );
  }
}
