import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { EmailServiceService } from '../../service/email-service.service';

@Component({
  selector: 'app-clint-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  providers:[EmailServiceService],
  templateUrl: './clint-editor.component.html',
  styleUrl: './clint-editor.component.scss'
})
export class ClintEditorComponent {
  email:any;
  URL="http://192.168.1.8:4200/";
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    private emailService:EmailServiceService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // shereEmail(){
  //   console.log("Email Shere SuccessFully");
  // }

  sendEmail(): void {
    this.emailService.sendEmail(this.email, this.URL).subscribe(
      response => {
        console.log('Email sent successfully',response);
        // Handle success
      },
      error => {
        console.error('Error sending email:', error);
        // Handle error
      }
    );
  }

}
