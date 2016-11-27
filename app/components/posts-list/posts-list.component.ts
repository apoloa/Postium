import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";

import {Post} from "../../models/post";

@Component({
    selector: "posts-list",
    templateUrl: "./app/components/posts-list/posts-list.component.html"
})
export class PostsListComponent {

    @Input() posts: Post[];

    constructor(private _router: Router) {
    }

    /**
     * Show detail, will change the route to /post with the id of the post.
     * @param id
     */
    showDetail(id: number): void {
        this._router.navigate(['/posts', id]);
    }

    showAuthorPost(id: number): void {
        this._router.navigate(['/posts/users', id]);
    }
}
