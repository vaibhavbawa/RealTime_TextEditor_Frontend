import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, SimpleChange , OnChanges, OnInit, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AngularEditorConfig, AngularEditorModule, AngularEditorService } from '@kolkov/angular-editor';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ClintEditorComponent } from './clint-editor/clint-editor.component';
import { EmailServiceService } from '../service/email-service.service';
import { io, Socket } from 'socket.io-client';
import { SocketService } from '../service/socket.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularEditorModule,
    HttpClientModule ,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    ClintEditorComponent,
    RouterLink
  ],
  providers:[AngularEditorService, EmailServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'realTime_textEditor';
  // roomId: string | undefined;
    paramsData: any;
    displayContent:any
    socket:any;
  constructor(
    private editorService: AngularEditorService,
    private dialog: MatDialog,
    private route: ActivatedRoute, 

    ) {
    this.socket = io('http://192.168.1.9:3000');

  }

  // Example method to get HTML content
  getContent() {
    console.log(this.editorService.insertHtml);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClintEditorComponent, {
      width: '250px',
      data: { name: 'John', animal: 'Dog' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
  paramsId:any;
  data:any;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '0',
      minHeight: '500px',
      maxHeight: '500px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

ngOnInit(){
this.socket.on("connect",() =>{
  console.log("connected", this.socket.id);
});

// this.socket.on("msg",(s: any)=>{
//   console.log(s);
// });

this.paramsData = this.route.snapshot.paramMap.get('id');

if(this.paramsData){
  this.joinRoom(this.paramsData)
  console.log('ParamsData',this.paramsData);
}

}

joinRoom(roomName :any){

  this.socket.emit('join-room',roomName);
  
}


getData(){
const elements = document.getElementsByClassName('angular-editor-textarea');
console.log("elements",elements)
//scoket.emit
//socket.on(roomName,(data)=>{
//if (data){
//const elements = document.getElementsByClassName('angular-editor-textarea');
//console.log(elements=data)
//}
//})
const displayContainer = document.getElementById('display-container');

// Iterate through each element and display its innerHTML
for (let i = 0; i < elements.length; i++) {

  const element = elements[i];
  
  console.log(element.innerHTML);

  const paragraph = document.createElement('p');

  paragraph.innerHTML = element.innerHTML;
  // element.setAttribute('ngModel','displayContent')

  if (displayContainer) {
    displayContainer.appendChild(paragraph);
  }

}

}

}
