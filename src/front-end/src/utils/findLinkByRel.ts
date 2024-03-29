import { IApiResponse } from 'types/Api'

export const findLinkByRel = (
  apiResponse: IApiResponse[],
  relValue: string
): string | undefined => {
  const linksArray = Object.values(apiResponse._links)
  const foundLink = linksArray.find((link) => link.rel === relValue)
  if (foundLink) {
    return foundLink.href
  }
  return undefined
}
