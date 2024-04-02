export const replaceGameId = (link: string, gameId: string): string => {
  return link.replace('00000000-0000-0000-0000-000000000000', gameId)
}
