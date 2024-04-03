import { CreateGameResponseDto } from 'types/webapi'

export const findLinkByRel = (
  apiResponse: CreateGameResponseDto[],
  relValue: string
): string => {
  const linksArray = Object.values(apiResponse._links)
  const foundLink = linksArray.find((link) => link.rel === relValue)
  if (foundLink) {
    return foundLink.href
  }
  return ''
}
