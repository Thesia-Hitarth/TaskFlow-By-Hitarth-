import { Comment, ShowcaseProject } from "@prisma/client"

export type CommentAuthor = {
  id: string
  name: string | null
  image: string | null
  username: string | null
}

export type CommentReply = Comment & {
  author: CommentAuthor
  _count: { votes: number }
}

export type CommentWithAuthor = Comment & {
  author: CommentAuthor
  _count: { votes: number }
  replies: CommentReply[]
}

export type ShowcaseProjectWithMeta = ShowcaseProject & {
  author: {
    name: string | null
    username: string | null
    image: string | null
  }
  _count: {
    upvotes: number
  }
}

export type StudyBuddyWithProgress = {
  id: string
  name: string | null
  username: string | null
  image: string | null
  streakDays: number
  _count: {
    progress: number
  }
}
