import React, { Component } from "react";
import { FilterBar, Card } from "../../components";
import "./Portfolio.css";

export default class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      portfolioData: [],
      filteredData: [],
    };
  }
  componentDidMount() {
    this.setState({ 
      portfolioData: this.props.data, 
      filteredData: this.props.data
    })
  }

  updateData = (filters) => {
    // build array of objects to show amount of filters that apply to each data
    let highestCount = 0;
    const filterCount = this.state.portfolioData.map((data) => {
      let count = 0;

      //matching searchbar
      const searchbarValue = filters[0].value.toLowerCase();
      if (
        data.title.toLowerCase().includes(searchbarValue) ||
        data.tags.toLowerCase().includes(searchbarValue) ||
        data.description.toLowerCase().includes(searchbarValue)
      )
        count++;

      //matching category
      if (data.category.toLowerCase() === filters[1].value.toLowerCase())
        count++;

      //update highestCount (most matched filters)
      if (count > highestCount) highestCount = count;

      return {
        id: data.id,
        count: count,
      };
    });

    //filter out only the items with the highest count as they will meet all filter conditions
    let filteredData = "";
    if (highestCount !== 0) {
      filteredData = [
        ...this.state.portfolioData.filter((item) => {
          let returnItem = false;
          filterCount.forEach((element) => {
            if (element.id === item.id && element.count === highestCount) {
              returnItem = true;
            }
          });
          return returnItem;
        }),
      ];
    }

    //sort data
    if (filters[2].value !== "") {
      const data = filteredData ? filteredData : this.state.portfolioData;
      filteredData = this.sortData(data, filters[2].value);
    }
    
    //update state data
    this.setState({ filteredData: filteredData });
  };

  //Sorts data by sort type (4 options)
  sortData = (data, sortBy) => {
    if (sortBy === "Ascending A-Z") {
      return data.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
    } else if (sortBy === "Descending Z-A") {
      return data.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "New") {
      return data.sort((a, b) => {
        const date_a = Date.parse(a.startDate);
        const date_b = Date.parse(b.startDate);
        if (date_a > date_b) {
          return -1;
        } else if (date_a < date_b) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "Old") {
      return data.sort((a, b) => {
        const date_a = Date.parse(a.startDate);
        const date_b = Date.parse(b.startDate);
        if (date_a > date_b) {
          return 1;
        } else if (date_a < date_b) {
          return -1;
        }
        return 0;
      });
    }
  };

  //opens a new tab
  redirect = (location) => {
    let link = document.createElement("a");
    link.href = location;
    link.target = "_blank";
    link.click();
  };

  render() {
    return (
      <div id="portfolio" className="page-wrap">
        <section>
          <h1 className="title" style={{ fontFamily: 'var(--main-txt)' }}>My Portfolio</h1>
        </section>
        <section>
          <FilterBar
            categories={this.props.categories}
            updateData={this.updateData}
          />
        </section>
        <section className="cards">
          {this.state.filteredData.length < 1 ? ''
            : this.state.filteredData.map((item) => (
              <Card
                imgUrl={item.url}
                alt={`${item.title} portfolio item`}
                onClick={() => this.redirect(item.link)}
                tags={item.tags}
                description={item.description}
                projectName={item.title}
                startDate={item.startDate}
                category={item.category}
              />
            ))}
        </section>
      </div>
    );
  }
}
