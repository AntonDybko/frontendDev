import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios'

const initialState = {
  status: 'idle',
  games: []
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToState: (state, game) => {
      state.games.push(game.payload)
    },
    deleteGame: (state, id) => {
      state.games = state.games.filter(item => item.id.toString() !== id.payload.toString())
    },
    updateGame: (state, action) => {
      let id = action.payload.id
      let selected_game = action.payload.selected_game
      state.games = state.games.map(game => {
        if(game.id === id){
            return {
                id: game.id,
                freetogame_profile_url: selected_game.freetogame_profile_url, 
                title: selected_game.title, 
                game_url: selected_game.game_url, 
                genre: selected_game.genre, 
                platform: selected_game.platform, 
                publisher: selected_game.publisher, 
                release_date: selected_game.release_date, 
                short_description: selected_game.short_description,
                thumbnail: selected_game.thumbnail,
                notes: game.notes
            }
        }else{
            return game
        }
      })
    },
    sortByTitle: (state) => {
      state.games = state.games.sort((a, b) =>{
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0
      })
    },
    sortByDate: (state) =>{
      state.games  = state.games.sort((a, b) =>{
          if (a.release_date < b.release_date) {
              return -1;
          }
          if (a.release_date > b.release_date) {
              return 1;
          }
          return 0
      })
    },
    sortNotesByDate: (state, gameId) =>{
      let currentGameIndex = state.games.findIndex(game => game.id === gameId.payload)
      state.games[currentGameIndex].notes.sort((a, b) =>{
        if (a.data < b.data) {
            return -1;
        }
        if (a.data > b.data) {
            return 1;
        }
        return 0
      })
    },
    sortNotesByMark: (state, gameId) =>{
      let currentGameIndex = state.games.findIndex(game => game.id === gameId.payload)
      state.games[currentGameIndex].notes.sort((a, b) =>{
        if (a.mark < b.mark) {
            return 1;
        }
        if (a.mark > b.mark) {
            return -1;
        }
        return 0
      })
    },
    addNote: (state, action) => {
      let curr_game = action.payload.game;
      let note = action.payload.note;
      state.games = state.games.map(game => {
        if(game.id === curr_game.id){
            return {
                id: curr_game.id,
                freetogame_profile_url: curr_game.freetogame_profile_url,
                title: curr_game.title,
                game_url: curr_game.game_url,
                genre: curr_game.genre,
                platform: curr_game.platform,
                publisher: curr_game.publisher,
                short_description: curr_game.short_description,
                release_date: curr_game.release_date,
                thumbnail: curr_game.thumbnail,
                notes: [...curr_game.notes, note]
            }
        }else{
            return game
        }
      })
    },
    handleNote: (state, action) => {
      const id = action.payload.id;
      const newNotes = action.payload.newNotes;
      state.games = state.games.map(game =>{
        if(game.id !== id){
            return game;
        }else{
          return {
            id: game.id,
            freetogame_profile_url: game.freetogame_profile_url,
            title: game.title,
            game_url: game.game_url,
            genre: game.genre,
            platform: game.platform,
            publisher: game.publisher,
            short_description: game.short_description,
            release_date: game.release_date,
            thumbnail: game.thumbnail,
            notes: newNotes
          }
        }
      })
    },
  },



});

export const { addToState, updateGame, deleteGame, addNote, handleNote, sortByTitle, sortByDate, sortNotesByDate, sortNotesByMark /*fetchGames*/} = counterSlice.actions;


export const getGames = (state) => {
  return state.counter.games
}


export const asyncAddGame = (game) => async dispatch => {
  axios.post(`http://localhost:8080/`, game).then((res)=>{
    dispatch(addToState(game))
  })
}
export const asyncUpdateGame = (gameId, updatedGame) => async dispatch => {
  axios.put(`http://localhost:8080/${gameId}`, updatedGame).then((res)=>{
    dispatch(updateGame({id: gameId, selected_game: updatedGame}))
  })
}
export const asyncDeleteGame= (gameId) => async dispatch => {
  axios.delete(`http://localhost:8080/${gameId}`).then((res)=>{
    dispatch(deleteGame(gameId))
  })
}
//notes
export const asyncAddNote = (game, note) => async dispatch => {
  axios.post(`http://localhost:8080/${game.id}`, note).then((res)=>{
    const action = {
      game: game,
      note: note
    }
    dispatch(addNote(action))
  })
}
export const asyncUpdateNote = (gameId, updatedNote, newNotes) => async dispatch => {
  axios.put(`http://localhost:8080/${gameId}/${updatedNote.id}`, updatedNote).then((res)=>{
    const action = {
      id: gameId,
      newNotes: newNotes
    }
    dispatch(handleNote(action))
  })
}
export const asyncDeleteNote= (gameId, noteId, newNotes) => async dispatch => {
  axios.delete(`http://localhost:8080/${gameId}/${noteId}`).then((res)=>{
    const action = {
      id: gameId,
      newNotes: newNotes
    }
    dispatch(handleNote(action))
  })
}

export default counterSlice.reducer;
