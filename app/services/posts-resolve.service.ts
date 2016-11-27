import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Post } from "../models/post";
import { PostService } from "./post.service";

@Injectable()
export class PostsResolve implements Resolve<Post[]> {

    constructor(private _postService: PostService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {

        const userId = route.params['userId'];
        if(userId){
            return this._postService.getUserPosts(userId);
        }

        const categoryId = route.params['categoryId'];
        if(categoryId){
            return this._postService.getCategoryPosts(categoryId);
        }

        return this._postService.getPosts();
    }
}
