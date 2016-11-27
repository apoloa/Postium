import {Inject, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import {BackendUri} from "./settings.service";
import {Post} from "../models/post";
import {Category} from "../models/category";

@Injectable()
export class PostService {

    private now = new Date().getTime();

    constructor(private _http: Http,
                @Inject(BackendUri) private _backendUri) {
    }

    getPosts(): Observable<Post[]> {
        return this._http
            .get(`${this._backendUri}/posts?publicationDate_lte=${this.now}&_sort=publicationDate&_order=DESC`)
            .map((response: Response) => Post.fromJsonToList(response.json()));
    }

    getUserPosts(id: number): Observable<Post[]> {
        console.log(`${this._backendUri}/posts?author.id=${id}&publicationDate_lte=${this.now}&_sort=publicationDate&_order=DESC`);
        return this._http
            .get(`${this._backendUri}/posts?author.id=${id}&publicationDate_lte=${this.now}&_sort=publicationDate&_order=DESC`)
            .map((response: Response) => Post.fromJsonToList(response.json()));
    }

    getCategoryPosts(id: number): Observable<Post[]> {

        return this._http
            .get(`${this._backendUri}/posts?publicationDate_lte=${this.now}&_sort=publicationDate&_order=DESC`)
            .map((response: Response) => Post.fromJsonToList(response.json()))
            .map((posts: Post[]) => posts
                .filter((post: Post) => post.categories
                    .find((category: Category) => category.id == id)));
    }

    getPostDetails(id: number): Observable<Post> {
        return this._http
            .get(`${this._backendUri}/posts/${id}`)
            .map((response: Response) => Post.fromJson(response.json()));
    }

    createPost(post: Post): Observable<Post> {
        return this._http
            .post(`${this._backendUri}/posts`, post)
            .map((response: Response) => {
                let json = response.json();
                return Post.fromJson(json);
            });
    }

    updatePost(post: Post): Observable<Post> {
        return this._http
            .post(`${this._backendUri}/posts`, post)
            .map((response: Response) => {
                let json = response.json();
                return Post.fromJson(json);
            })
    }

    getPostSearch(text: string): Observable<Post[]> {
        const url = `${this._backendUri}/posts?q=${text}`;
        return this._http
            .get(url)
            .map((response: Response) => {
                return Post.fromJsonToList(response.json()
                )
            });
    }
}
