import React, { Component } from 'react'
import dog from "./DogIcon.png"
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
      <article className="animals list">
        {
          this.props.animals.map( animal =>
            <div key={animal.id} className="card">
              <div className="card-body">
                <h3 className="card-title">
                  <img src={dog} className="icon--dog" alt="dog-icon"/>
                  Pet: {animal.name}
                  <a
                    href="#" onClick={() => this.props.deleteAnimal(animal.id)}
                    className="card-link">Delete
                  </a>
                </h3>
                Owned by: <h5>{this.animalOwner(animal.id).join(" and ")}</h5>
              </div>
            </div>
          )
        }
      </article>
    )
  }
}