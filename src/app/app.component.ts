import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HttpRequestsHelloWorld';
  baseUrl = environment.baseURL + '/api/posts';
  constructor(private httpClient: HttpClient) {}
  isFetching = false;
  loadedPosts: { id: number; title: string; content: string }[] = [];
  AddPostForm: FormGroup;

  ngOnInit(): void {
    this.fetchPosts();
    this.AddPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.AddPostForm.value);
    // this.httpClient.post('https://localhost:7254/api/posts', {});
    this.httpClient
      .post(this.baseUrl, this.AddPostForm.value)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.httpClient
      .get<{ id: number; title: string; content: string }[]>(this.baseUrl)
      .subscribe({
        next: (data) => {
          this.loadedPosts = data;
          this.isFetching = false;
        },
        error: (error) => {
          this.isFetching = false;
        },
      });
  }
  onFetchPosts() {
    this.fetchPosts();
  }

  onDeletePost(postId: number) {
    this.httpClient
      .delete(`${this.baseUrl}/${postId}`)
      .subscribe((response) => {
        console.log(response);
        this.fetchPosts();
      });
  }
}
