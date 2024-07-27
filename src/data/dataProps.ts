export interface User{
    image: {png: string, webp: string}
    username: string
}

export interface Reply{
    content: string
    createdAt: string
    id: number
    parentId:number,
    isReply:boolean,
    replyingTo: string
    score: number
    user:User
}

export interface Comment{
    content: string
    createdAt: string
    id: number
    isReply:boolean
    replies: Reply[]
    score:number
    user: User
    
}