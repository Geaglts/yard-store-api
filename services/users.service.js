class UsersService {
  constructor() {
    this.users = [];
  }
  async register({ user }) {
    return { message: 'usuario creado correctamente', body: user };
  }
  async login() {
    return true;
  }
}

module.exports = UsersService;
