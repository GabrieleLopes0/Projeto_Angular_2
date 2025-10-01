import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Usuários mocados
  private mockUsers: User[] = [
    {
      email: 'admin@empresa.com',
      password: 'admin123',
      role: 'admin',
      name: 'Administrador'
    },
    {
      email: 'user@empresa.com',
      password: 'user123',
      role: 'user',
      name: 'Usuário Comum'
    }
  ];

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    const user = this.mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Não salvar a senha no localStorage
      const userToStore = { ...user };
      delete (userToStore as any).password;
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      this.currentUserSubject.next(userToStore as User);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }
}
