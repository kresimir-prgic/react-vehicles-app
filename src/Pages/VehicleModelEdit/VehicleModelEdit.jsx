import React, { Component } from "react";

class VehicleModelEdit extends Component {
  id = null;

  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    console.log(this.id);
  }

	render() {
		return <div>
      Edit Model Page
      <p>Vehicle Model Id: {this.id}</p>
      </div>;
	}
}

export default VehicleModelEdit;
