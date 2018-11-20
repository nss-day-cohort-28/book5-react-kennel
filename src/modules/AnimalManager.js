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
}

// export default AnimalManager
export default new AnimalManager("animals")
