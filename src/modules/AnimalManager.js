import APIManager from "./APIManager"

class AnimalManager extends APIManager {
  getAnimal(id) {
    return this.get(id)
  }

  getAll() {
    console.log(this.all)
    return this.all()
  }

  removeAndList(id) {
    return this.delete(id).then(() => this.all())
  }

  post(newAnimal) {
    return fetch(`http://localhost:5001/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAnimal)
    }).then(data => data.json())
  }
}

// export default AnimalManager
export default new AnimalManager("animals")
