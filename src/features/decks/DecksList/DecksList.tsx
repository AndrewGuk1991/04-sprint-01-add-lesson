import s from './DecksList.module.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { fetchDecksTC, selectDecks } from '../decks-slice.ts'
import { DeckItem } from './DeckItem/DeckItem.tsx'

export const DecksList = () => {
  const dispatch = useAppDispatch()
  const decks = useAppSelector(selectDecks)

  useEffect(() => {
    dispatch(fetchDecksTC())
  }, [])
  return <ul className={s.list}>
    {
      decks.map((deck) => {
        return <DeckItem deck={deck} key={deck.id} />
      })
    }
  </ul>
}
