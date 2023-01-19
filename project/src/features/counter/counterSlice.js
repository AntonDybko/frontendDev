import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { fetchCount } from './counterAPI';
//import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

/*if(response.status === 200){
      const action ={
        id: gameId,
        selected_game: updatedGame
      } 
      dispatch(updateGame(action))
    }*/
    /*console.log(response.status, response.data, "????")
    const action ={
      id: gameId,
      selected_game: updatedGame
    } */

/*const asyncUpdateGame = createAsyncThunk(
  'counter/updateGame',
  async (gameId, updatedGame, thunkAPI) => {
    const response = await axios.put(`http://localhost:8080/${gameId}`, updatedGame)
    return response.data
  }
)*/

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
      console.log(game)
      state.games.push(game.payload)
    },
    deleteGame: (state, id) => {
      state.games = state.games.filter(item => item.id.toString() !== id.payload.toString())
    },
    /*updateGame: (state, action) => {
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
    },*/
    updateGame: (state, action) => {
      console.log(action)
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
    sortNotesByDate: (state, title) =>{
      let currentGameIndex = state.games.findIndex(game => game.title === title.payload)
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
    sortNotesByMark: (state, title) =>{
      let currentGameIndex = state.games.findIndex(game => game.title === title.payload)
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
      console.log(note)
      console.log(curr_game)
      state.games = state.games.map(game => {
        if(parseInt(game.id) === parseInt(curr_game.id)){
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
  /*extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(asyncUpdateGame.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action)
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
    })
  },*/

});

export const { addToState, updateGame, deleteGame, addNote, handleNote, sortByTitle, sortByDate, sortNotesByDate, sortNotesByMark /*fetchGames*/} = counterSlice.actions;


export const getGames = (state) => state.counter.games;
export const asyncUpdateGame = (gameId, updatedGame) => async dispatch => {
  axios.put(`http://localhost:8080/${gameId}`, updatedGame).then((res)=>{
    console.log(res.data)
    dispatch(updateGame({id: gameId, selected_game: updatedGame}))
  })
}

  /*console.log(game.status, game.data, "????")
  if(game.status === 200){
      dispatch(updateGame(updatedGame))
  }else{
      //allet?tost?
  } */


/*export const loadGames = () => async (dispatch, getState) => {
  const item = await axios.get(`https://jsonplaceholder.typicode.com/comments/${itemId}`)
  dispatch(fetchBody(item.data.body))
}*/

/*export const fetchGames = () => (dispatch, getState) =>{
  const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
      params: {tag: '3d.mmorpg.fantasy.pvp', platform: 'pc'},
      headers: {
          'X-RapidAPI-Key': '10f7ad6edamshb85b099a1a349d7p113413jsna8336fc9b1bd',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
  };
  console.log('hello there????')
  axios.request(options).then(function (response) {
      response.data.forEach(game => {
          game.notes = [];
          console.log('fetchtest')
          console.log(getState().games.filter(x => x.title === game.title)) //test
          if(getState().games.filter(x => x.title === game.title) === []){
            dispatch(addToState(game));
          }
      })
  })
}*/


export default counterSlice.reducer;
