import { DecksList } from './DecksList/DecksList.tsx'
import { AddNewDeckForm } from './AddNewDeckForm/AddNewDeckForm.tsx'
import { useAppSelector } from '../../app/store.ts'
import { selectStatus } from './decks-slice.ts'
import { LinearProgress } from '@mui/material'

export const Decks = () => {
  const status = useAppSelector(selectStatus)

  return (
    <div>
      {status === 'loading' && <LinearProgress/>}
      <h1>Decks 🦝</h1>
      <AddNewDeckForm />
      <DecksList />
    </div>
  )
}
