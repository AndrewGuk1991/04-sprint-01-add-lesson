import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://api.flashcards.andrii.es',
  headers: {
    'x-auth-skip': true,
  },
})

export const decksApi = {
  fetchDecks () {
    return instance.get('/v2/decks')
  },
  addDeck (name: string) {
    return instance.post('/v1/decks', {name})
  }
}
