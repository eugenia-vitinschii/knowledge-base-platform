/* COMMENT TYPE */

export interface Comment {
   id: string,
   article: string,
   author: {
      id: string
      name: string
   }
   content: string,
   likes: number,
   createdAt: string,
}