import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HttpRequestsHelloWorld';

  AddPostForm: FormGroup;

  ngOnInit(): void {
    this.AddPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.AddPostForm.value);
  }
}
