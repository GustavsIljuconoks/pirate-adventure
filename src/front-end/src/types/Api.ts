export interface IApiResponse {
  id: number
  size: {
    columns: number
    rows: number
  }
  state: number
  _links: {
    href: string
    method: string
    rel: string
  }
}
