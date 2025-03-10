import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);
  private userSubject = new BehaviorSubject<{ email: string | null; role: string } | null>(null);

  constructor() {
    // 🔹 Escuchar cambios de autenticación
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const userData = await this.getUserData(user);
        localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage
        this.userSubject.next(userData);
      } else {
        localStorage.removeItem('user'); // Eliminar usuario si cierra sesión
        this.userSubject.next(null);
      }
    });
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const userData = await this.getUserData(userCredential.user);

    localStorage.setItem('user', JSON.stringify(userData)); // 🔹 Guardar en localStorage
    this.userSubject.next(userData);

    return userData;
  }

  async logout() {
    await signOut(this.auth);
    localStorage.removeItem('user'); // 🔹 Eliminar del localStorage
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  async getUserData(user: User) {
    const userDocRef = doc(this.firestore, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const role = userDocSnap.exists() ? userDocSnap.data()['role'] : 'user';

    return { email: user.email, role };
  }

  getCurrentUser() {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getUserObservable() {
    return this.userSubject.asObservable();
  }
}
