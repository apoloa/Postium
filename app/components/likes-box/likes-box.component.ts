import {Component, OnInit, Input} from "@angular/core";
import {Router} from "@angular/router";

import { Post } from "../../models/post";

import { LikesService } from "../../services/likes.service";
import { PostService } from "../../services/post.service";

@Component({
    selector: "likes-box",
    templateUrl: "./app/components/likes-box/likes-box.component.html",
    styleUrls: ["./app/components/likes-box/likes-box.component.css"]
})
export class LikesComponent implements OnInit {

    @Input() post: Post;
    activate = false;

    constructor(private _likesService: LikesService,
                private _postService: PostService,
                private _router: Router) { }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.activate = this._likesService.checkLikeId(this.post.id);
    }

    chechActivate(): boolean {
        return this._likesService.checkLikeId(this.post.id);
    }

    likePost(): void{
        this._likesService.saveLikeId(this.post.id);
        this.post.likes += 1;
        this._postService.updatePost(this.post)
            .subscribe((post: Post) => {
                this.activate = false;
            });

    }
}
