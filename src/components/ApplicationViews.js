import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from './animal/AnimalForm'
import Login from './authentication/Login'

import AnimalManager from "../modules/AnimalManager"


class ApplicationViews extends Component {

  state = {
    locations: [],
    animals: [],
    employees: [],
    owners: [],
    owners_animals: [],
  }

  componentDidMount() {
    const newState = {}

    AnimalManager.getAll().then(allAnimals => {
      this.setState({
        animals: allAnimals
      })
    })
    .then(() => fetch("http://localhost:5001/employees")
    .then(r => r.json()))
    .then(employees => newState.employees = employees)
    .then(() => fetch("http://localhost:5001/locations")
    .then(r => r.json()))
    .then(locations => newState.locations = locations)
    .then(() => fetch("http://localhost:5001/owners")
    .then(r => r.json()))
    .then(owners => newState.owners = owners)
    .then(() => fetch("http://localhost:5001/owners_animals")
    .then(r => r.json()))
    .then( owners_animals => newState.owners_animals = owners_animals)
    .then(() => this.setState(newState))
  }

  // Pre chapter 5 stretch goal delete
  // deleteAnimal = id => {
  //   return fetch(`http://localhost:5002/animals/${id}`, {
  //       method: "DELETE"
  //     })
  //     .then(e => e.json())
  //     .then(() => fetch(`http://localhost:5002/animals`))
  //     .then(e => e.json())
  //     .then(animals => this.setState({
  //       animals: animals
  //     }))
  // }

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  // Chapter 5 stretch goal delete
  deleteAnimal = id => AnimalManager.removeAndList(id)
  .then(animals => this.setState({
    animals: animals
  }))

  addAnimal = (animal) => AnimalManager.post(animal)
    .then(() => AnimalManager.getAll())
    .then(animals => this.setState({
      animals: animals
    }))

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          console.log("locations", this.props.locations)
          return <LocationList locations={this.state.locations} />
        }} />
        <Route path="/login" component={Login} />
        <Route exact path="/animals" render={(props) => {
          return (
            <AnimalList
              {...props}
              animals = {this.state.animals}
              owners = {this.state.owners}
              owners_animals = {this.state.owners_animals}
              deleteAnimal={this.deleteAnimal}
            />
          )
        }} />
        <Route path="/employees" render={(props) => {
          if (this.isAuthenticated()) {
            return <EmployeeList employees={this.state.employees} animals={this.state.animals}/>
          } else {
            return <Redirect to = "/login" / >
          }
        }} />
        <Route exact path="/owners" render={(props) => {
          return <OwnerList owners={this.state.owners} />
        }} />
        <Route path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
        }} />
        <Route path="/animals/new" render={(props) => {
          return <AnimalForm {...props}
                    addAnimal={this.addAnimal}
                    employees={this.state.employees} />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews
