import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseURL + '/api/posts';

  getPosts() : Observable<{ id: number; title: string; content: string }[]> {
    return this.httpClient.get<{ id: number; title: string; content: string }[]>(
      this.baseUrl
    );
  }
}
