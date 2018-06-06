export default {
  data: {
    id: null,
    name: null,
    lastName: null,
    fullName: null,
    birthday: null,
    email: null,
    cpf: null,
    role: null
  },

  load(user) {
    for (let key in user) {
      if (this.data.hasOwnProperty(key) && key != 'load' && key != 'clear')
        this.data[key] = user[key];
    }
  },

  clear() {
    this.data.id = null;
    this.data.name = null;
    this.data.lastName = null;
    this.data.fullName = null;
    this.data.birthday = null;
    this.data.email = null;
    this.data.cpf = null;
    this.data.role = null;
  }
}
