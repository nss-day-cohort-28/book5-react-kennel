import React, { Component } from 'react'
import AnimalCard from "./AnimalCard"
import "./Animal.css"

export default class AnimalList extends Component {

  animalOwner(animalId) {
    console.log("owners", animalId)
    let animalOwners = this.props.owners_animals
    .filter( join => join.animal_id === animalId)
    .map( join => this.props.owners.find( owner => owner.id === join.owner_id ).name)

    console.log('owners', animalOwners );

    return animalOwners
  }

  render() {
    return (
      <React.Fragment>
        <div className="animalButton list">
          <button type="button"
                  className="btn btn-success"
                  onClick={() => {
                      this.props.history.push("/animals/new")}
                  }>
              Admit Animal
          </button>
        </div>
        <article className="animals list">
          {
            this.props.animals.map( animal =>
              <AnimalCard key={animal.id} animal={animal} {...this.props} />
            )
          }
        </article>
      </React.Fragment>
    )
  }
}
