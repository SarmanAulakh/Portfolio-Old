import React, { Component } from "react";
import { Dropdown } from "../../components";
import Button from "../Button/Button";
import "./FilterBar.css";

export default class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
    };

    this.dropdownAccordion = []; //array to hold dropdown refs
    this.textAccordian = []; //array to hold text input refs
  }

  componentDidMount() {
    this.setState({ filters: this.props.filters });
  }

  updateFilters = async (id, value, e) => {
    const val = value === "text" ? e.target.value : value;
    await this.setState({
      filters: this.state.filters.map((filter) =>
        filter.id === id ? { ...filter, value: val } : filter
      ),
    });
    this.props.updateData(this.state.filters);
  };

  clearFilters = async () => {
    //clear values
    this.textAccordian.map(text => text.value = "")
    this.dropdownAccordion.map(dropdown => dropdown.resetValue())

    //clear all filters and update data
    await this.setState({ filters: this.props.filters });
    this.props.updateData(this.state.filters);
  };

  render() {
    return (
      <div className="filter-bar">
        {this.props.filters.map((filter, index) => {
          if (filter.type === "text") {
            return (
              <input
                key={filter.id}
                type="text"
                className="filter-bar-item"
                placeholder=" Search (ex. Python)"
                onChange={(e) => this.updateFilters(filter.id, "text", e)}
                ref={ref => this.textAccordian[index] = ref}
              />
            );
          }
          if (filter.type === "dropdown") {
            return (
              <Dropdown
                key={filter.id}
                placeholder={filter.placeholder}
                items={filter.dropdown}
                className="filter-bar-item"
                updateFilters={(val, e) => this.updateFilters(filter.id, val, e)}
                ref={(ref) => (this.dropdownAccordion[index] = ref)}
              />
            );
          }
          return 'Filterbar Error: please notify me through contact tab'
        })}
        <Button
          text="CLEAR ALL"
          onClick={() => this.clearFilters()}
          wrapStyle={{width: 'max-content'}}
          style={{borderRadius: 5}}
        />
      </div>
    );
  }
}
