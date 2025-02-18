import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface User {
  username: string;
  firstname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup; // Déclarer le FormGroup
  user: User = { // Initialiser un objet User
    username: '',
    firstname: '',
    email: '',
    password: ''
  };

  constructor(
    private fb: FormBuilder, // Injecter FormBuilder pour créer le formulaire
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Créer un FormGroup avec les validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Méthode pour envoyer le formulaire
  login() {
    if (this.loginForm.valid) {
      this.user.email = this.loginForm.value.email;
      this.user.password = this.loginForm.value.password;

      // Appeler le service de connexion en passant l'objet user
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/products']); // Rediriger après connexion
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
