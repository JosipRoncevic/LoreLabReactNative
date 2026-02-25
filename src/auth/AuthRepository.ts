import { AuthService } from "./AuthService";

export class AuthRepository {
  constructor(private service: AuthService) {}

  login(email: string, password: string) {
    return this.service.login(email, password);
  }

  logout() {
    return this.service.logout();
  }

  getCurrentUser() {
    return this.service.getCurrentUser();
  }
}