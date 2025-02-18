import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';  // Import correct
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  standalone: true,
  imports: [FormsModule, MatDialogModule, CommonModule],  // Ajoute FormsModule ici
  styleUrls: ['contact.component.scss']
})
export class ContactComponent {
  constructor(private dialog: MatDialog) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Logique d'envoi du formulaire
      this.openSuccessDialog();
      form.reset(); // Réinitialiser le formulaire
    }
  }


  openSuccessDialog() {
    this.dialog.open(SuccessModalComponent);
  }
}

import { MatDialogRef } from '@angular/material/dialog';  // Import correct

@Component({
  selector: 'app-success-modal',
  standalone: true,
  template: `
    <h2>Succès</h2>
    <p>Demande de contact envoyée avec succès.</p>
    <button mat-button (click)="close()">Fermer</button>
  `
})
export class SuccessModalComponent {
  constructor(private dialogRef: MatDialogRef<SuccessModalComponent>) {}  // Constructeur

  close() {
    this.dialogRef.close();  // Ferme la modale
  }
}
