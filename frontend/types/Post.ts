export type Post = {
    id: string;
    title: string;
    body: string;
    photo: string;
    createdAt: string;
    userId: string;
    _count: { Like: number };
    Like: {
        userId: string;
        postId: string;
    }[];
};
