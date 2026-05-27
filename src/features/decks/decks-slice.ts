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
    status: 'idle' as RequestType,
    searchParams: {
      name: '',
    },
  },
  selectors: {
    selectDecks: state => state.decks,
    selectStatus: state => state.status,
  },
  reducers: (create) => ({
    fetchDecksTC: create.asyncThunk(async (_arg, {rejectWithValue, dispatch}) => {
      try {
        dispatch(changeStatusAC({status: 'loading'}))
        await new Promise(resolve => setTimeout(resolve, 2000))
        const res = await decksApi.fetchDecks()
        dispatch(changeStatusAC({ status: 'succeeded' }))
        return res.data.items
      } catch (e) {
        dispatch(changeStatusAC({ status: 'failed' }))
        return rejectWithValue(e)
      }
    },
      {
      fulfilled: (state, action) => {
        state.decks = action.payload
      }
    }),
    addDeckTC: create.asyncThunk(async (title: string, {rejectWithValue, dispatch}) => {
      try {
        dispatch(changeStatusAC({ status: 'loading' }))
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const res = await decksApi.addDeck(title)
        dispatch(changeStatusAC({ status: 'succeeded' }))
        return res.data
      } catch (e) {
        dispatch(changeStatusAC({ status: 'failed' }))
        return rejectWithValue(e)
      }
    },
      {
      fulfilled: (state, action) => {
        state.decks.unshift(action.payload)
      }
    }),
    deleteDeckTC: create.asyncThunk(async (id: string, {dispatch, rejectWithValue}) => {
      try {
        dispatch(changeStatusAC({ status: 'loading' }))
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const res = await decksApi.deleteDeck(id)
        dispatch(changeStatusAC({ status: 'succeeded' }))
        return res.data.id
      } catch (e) {
        dispatch(changeStatusAC({ status: 'failed' }))
        return rejectWithValue(e)
      }
    },
      {
      fulfilled: (state, action) => {
        state.decks = state.decks.filter((d) => d.id !== action.payload)
      }
    }),
    changeStatusAC: create.reducer<{status: RequestType}>((state, action) => {
      state.status = action.payload.status
    })
  })
})

export const decksReducer = decksSlice.reducer
export const {fetchDecksTC, addDeckTC, changeStatusAC, deleteDeckTC} = decksSlice.actions
export const {selectDecks, selectStatus} = decksSlice.selectors

export type RequestType = 'idle' | 'loading' | 'succeeded' | 'failed'

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


// 'cmpo2ldfh00oanu01fk8dbglz'
