import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Post } from "../../models/post";

@Component({
    selector: "post-preview",
    templateUrl: "./app/components/post-preview/post-preview.component.html",
    styleUrls: ["./app/components/post-preview/post-preview.component.css"]
})
export class PostPreviewComponent {

    @Input() post: Post;
    @Output() showDetailPost: EventEmitter<number> = new EventEmitter();
    @Output() showUserPost: EventEmitter<number> = new EventEmitter();

    showDetail(): void {
        this.showDetailPost.emit(this.post.id);
    }

    showAuthorPost(): void {
        console.log('Called');
        this.showUserPost.emit(this.post.author.id);
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }
}
