import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";

@Component({
    templateUrl: "./app/components/update-story/update-story.component.html",
    styleUrls: ["./app/components/update-story/update-story.component.css"]
})
export class UpdateStoryComponent implements OnInit, OnDestroy {

    private _postSubscription: Subscription;
    private post: Post;

    constructor(
        private _postService: PostService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post }) => this.post = data.post);
    }

    ngOnDestroy(): void {
        this._unsubscribePostCreation();
    }

    createPost(post: Post): void {
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.createPost(post)
            .subscribe((post: Post) => this._router.navigate(["/posts", post.id]));
    }

    private _unsubscribePostCreation(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }
}
