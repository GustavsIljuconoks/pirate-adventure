import axios, { AxiosResponse } from 'axios'
import { GameDto } from 'types/webapi'
import { SERVER_URL } from '../constants'

export const getGameStatus = async (
  gameStatusLink: string
): Promise<GameDto> => {
  try {
    const response: AxiosResponse = await axios.get(SERVER_URL + gameStatusLink)
    return response.data
  } catch (error) {
    console.error('Error fetching game status:', error)
    throw error
  }
}
