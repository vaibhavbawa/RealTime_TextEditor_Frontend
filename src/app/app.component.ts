import { HttpClientModule } from '@angular/common/http';
import { Component, SimpleChange , OnChanges} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularEditorConfig, AngularEditorModule, AngularEditorService } from '@kolkov/angular-editor';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ClintEditorComponent } from './clint-editor/clint-editor.component';
import { EmailServiceService } from '../service/email-service.service';
import { io, Socket } from 'socket.io-client';
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
  ],
  providers:[AngularEditorService, EmailServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'realTime_textEditor';

    displayContent:any
    socket:any;
  constructor(private editorService: AngularEditorService,private dialog: MatDialog) {
    this.socket = io('http://localhost:3000');
    console.log("sockets",this.socket);

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
      console.log('The dialog was closed');
    });
  }
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
  // this.displayContent = '';
this.data;
this.socket.on("connect",() =>{
  console.log("connected", this.socket.id);
})
// this.socket.on("welcome",(s)=>{
//   console.log(s);
  
// })
}


getData(){
//  var data = document.getElementsByClassName('angular-editor-textarea');
// //  var data2 = data.innerHtml;
//  console.log("data",data);

const elements = document.getElementsByClassName('angular-editor-textarea');
console.log("elements",elements)
// const displayContainer1 = document.getElementsByClassName("sourceText");
// console.log("data",displayContainer1);

const displayContainer = document.getElementById('display-container');
// console.log("data",displayContainer);

// Iterate through each element and display its innerHTML
for (let i = 0; i < elements.length; i++) {
  {

  }
  const element = elements[i];
  
  console.log(element.innerHTML);

  const paragraph = document.createElement('p');

  paragraph.innerHTML = element.innerHTML;
  element.setAttribute('ngModel','displayContent')

  if (displayContainer) {
    displayContainer.appendChild(paragraph);

  }

}

}

// ngOnChanges(Changes:SimpleChange):void{
    
// }


}



// git remote add origin https://github.com/vaibhavbawa/RealTime_TextEditor_Project.git



// git remote add origin https://github.com/vaibhavbawa/RealTime_TextEditor_Backend.git