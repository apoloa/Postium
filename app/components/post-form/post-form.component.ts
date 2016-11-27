import {Component, EventEmitter, OnInit, Output, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {Post} from "../../models/post";
import {User} from "../../models/user";

@Component({
    selector: "post-form",
    templateUrl: "./app/components/post-form/post-form.component.html",
    styleUrls: ["./app/components/post-form/post-form.component.css"]
})
export class PostFormComponent implements OnInit {

    nowDatetimeLocal: string;
    body: String;
    title: String;
    intro: String;
    publicationDateScheduled: boolean = false;
    @Input() post: Post;
    @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();

    ngOnInit(): void {
        if (this.post) {
            this.title = this.post.title;
            this.body = this.post.body;
            this.intro = this.post.intro;
        }
        this.nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date());
    }

    private _formatDateToDatetimeLocal(date: Date) {
        return `
            ${this._fixPad(date.getFullYear(), 4)}-
            ${this._fixPad(date.getMonth() + 1, 2)}-
            ${this._fixPad(date.getDate(), 2)}T
            ${this._fixPad(date.getHours(), 2)}:
            ${this._fixPad(date.getMinutes(), 2)}`.replace(/\n/gi, "").replace(/ /gi, "");
    }

    private _fixPad(datePart: number, length: number): string {
        return `0000${datePart}`.slice(-length);
    }

    private _getPostPublicationDate(formPublicationDate: string): number {
        let publicationDate: Date;
        if (this.publicationDateScheduled) {
            publicationDate = new Date(formPublicationDate);
            if (isNaN(publicationDate.getTime())) {
                publicationDate = new Date();
            }
        }
        else {
            publicationDate = new Date();
        }
        return publicationDate.getTime();
    }

    setScheduling(schedule: true): void {
        this.publicationDateScheduled = schedule;
    }

    submitPost(form: FormGroup): void {
        debugger;
        if (this.post) {
            if (User.defaultUser().id == this.post.author.id) {
                let post: Post = Post.fromJson(form.value);
                this.post.title = post.title;
                this.post.intro = post.intro;
                this.post.body = post.body;
                this.postSubmitted.emit(this.post);
            }
        } else {
            let post: Post = Post.fromJson(form.value);
            post.likes = 0;
            post.author = User.defaultUser();
            post.publicationDate = this._getPostPublicationDate(form.value.publicationDate);
            post.categories = [];
            post.media = null;
            this.postSubmitted.emit(post);
        }

    }
}
