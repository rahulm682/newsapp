import React, { Component } from 'react'

export class ClassComponent extends Component {
    name = "Rahul Maurya";
  render() {
    return (
      <div>
        This is the First Class Based Component from: {this.name}
      </div>
    )
  }
}

export default ClassComponent
