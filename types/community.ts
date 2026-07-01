import { Comment, User, CommentVote, ShowcaseProject, ShowcaseUpvote, StudyBuddyConnection } from "@prisma/client"

export type CommentAuthor = {
  id: string
  name: string | null
  image: string | null
  username: string | null
}

export type CommentReply = Comment & {
  author: CommentAuthor
  votes: CommentVote[]
}

export type CommentWithAuthor = Comment & {
  author: CommentAuthor
  votes: CommentVote[]
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
