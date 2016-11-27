import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

import {Post} from "../../models/post";

@Component({
    templateUrl: "./app/components/post-details/post-details.component.html",
    styleUrls: ["./app/components/post-details/post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        window.scrollTo(0, 0);
    }

    goBack(): void {
        this._router.navigate(['/posts']);
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    showAuthorPost(): void {
        this._router.navigate(['/posts/users', this.post.author.id]);
    }

    postsByCategory(category: number): void {
        this._router.navigate(['/posts/categories', category]);
    }
}
