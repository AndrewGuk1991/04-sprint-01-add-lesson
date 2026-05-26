import { DeckType } from './DecksList/DeckItem/DeckItem.tsx'
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { decksApi } from './decks-api.ts'

// const initialState = {
//   decks: [] as DeckType[],
//   searchParams: {
//     name: '',
//   },
// }

const createDecksSlice = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator}
})

export const decksSlice = createDecksSlice({
  name: 'decks',
  initialState: {
    decks: [] as DeckType[],
    searchParams: {
      name: '',
    },
  },
  reducers: (create) => ({
    fetchDecksTC: create.asyncThunk(async (_arg, {rejectWithValue}) => {
      try {
        const res = await decksApi.fetchDecks()
        return res.data.items
      } catch (e) {
        return rejectWithValue(e)
      }
    },
      {
      fulfilled: (state, action) => {
        state.decks = action.payload
      }
    })
  })
})

export const decksReducer = decksSlice.reducer
export const {fetchDecksTC} = decksSlice.actions

// type DecksState = typeof initialState
//
// export const decksReducer = (state: DecksState = initialState, action: DecksActions): DecksState => {
//   switch (action.type) {
//     default:
//       return state
//   }
// }
//
// type DecksActions = any



