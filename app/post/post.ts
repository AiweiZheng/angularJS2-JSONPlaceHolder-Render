export class Post {
    userid: number;
    id: number;
    title: string;
    body: string;
    comments: Comment[]
}

export class Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}