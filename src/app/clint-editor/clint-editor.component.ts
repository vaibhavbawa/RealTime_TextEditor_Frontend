import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { EmailServiceService } from '../../service/email-service.service';
import { AppComponent } from '../app.component';
import { SocketService } from '../../service/socket.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-clint-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    RouterOutlet,
  ],
  providers: [EmailServiceService],
  templateUrl: './clint-editor.component.html',
  styleUrl: './clint-editor.component.scss'
})
export class ClintEditorComponent implements OnInit {
  params: any = undefined
  email: any;
  URL = `http://192.168.1.9:4200/${this.params}`;
  socket: any;

  constructor(
    private dialogRef: MatDialogRef<AppComponent>,
    private emailService: EmailServiceService,
    private SocketService: SocketService,
    private route:ActivatedRoute
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
 
  }

  joinRoom(roomName: any) {
    this.SocketService.RoomAdminUser(roomName)
  }

  sendEmail(): void {

  //   const roomId = this.route.snapshot.params['roomId'];
  // console.log("roomId",roomId);

    this.params = localStorage.getItem('roomName')

    this.emailService.sendEmail(this.email, this.URL, this.params).subscribe(
      response => {
        console.log('Email sent successfully', response.roomId);
        localStorage.setItem('roomName', response.roomId)

        console.log(this.params);

      // this is a joinRoomId 
        this.joinRoom(response.roomId)
        // Handle success
      },
      error => {
        console.error('Error sending email:', error);
        // Handle error
      }
    );
  }

}
