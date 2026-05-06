//parce tags (create/update)

export function parseTags(input: string): string[] {
   return Array.from(
      new Set(
         input
            .split(/[,\s]+/).map(t => t.trim()).filter(Boolean).map((t) => t.toLocaleLowerCase())
      )
   )
}