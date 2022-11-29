import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HttpRequestsHelloWorld';
  baseUrl = environment.baseURL + '/api/posts';
  constructor(
    private httpClient: HttpClient,
    private postService: PostService
  ) {}
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
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('CustomHeaderKey1', 'Test 1');
    httpHeaders = httpHeaders.append('CustomHeaderKey2', 'Test 2');

    let searchParams = new HttpParams();
    searchParams = searchParams.append('title', 'ahmad');
    searchParams = searchParams.append('content', 'البحث عن المحتوى');

    this.isFetching = true;
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.loadedPosts = data;
        this.isFetching = false;
      },
      error: (error) => {
        this.isFetching = false;
      },
    });
    // this.httpClient
    //   .get<{ id: number; title: string; content: string }[]>(this.baseUrl, {
    //     headers: httpHeaders,
    //     params: searchParams,
    //   })
    //   .subscribe({
    //     next: (data) => {
    //       this.loadedPosts = data;
    //       this.isFetching = false;
    //     },
    //     error: (error) => {
    //       this.isFetching = false;
    //     },
    //   });
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

  onUpdatePost() {
    this.httpClient
      .put(`${this.baseUrl}/102`, {
        title: 'Updated Title Test',
        content: 'Updated Content Abdallah',
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }
}
