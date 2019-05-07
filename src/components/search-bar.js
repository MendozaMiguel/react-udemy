import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      placeHolder: "Tappez votre Film..."
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <input
            className="form-control input-lg"
            onChange={this.handleChange.bind(this)}
            placeholder={this.state.placeHolder}
          />
        </div>

        <p>{this.state.searchText}</p>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ searchText: e.target.value });
  }
}

export default SearchBar;
