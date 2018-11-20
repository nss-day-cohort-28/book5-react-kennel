import React, { Component } from "react"

export default class OwnerList  extends Component {

  render() {
    return (
      <article className="owners list">
        <h1>Owner List</h1>
        {
          this.props.owners.map( owner =>
            <div key={owner.id}>
              <h3>{owner.name}</h3>
              {owner.phone}
            </div>
          )
        }
      </article>
    )
  }
}
