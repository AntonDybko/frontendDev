const express = require("express")
const cors = require("cors")
const fs = require("fs")
const bodyParser = require("body-parser")
//import cors from "cors"
//import fs from "fs"
//import express from "express"
//import bodyParser from 'body-parser';//???
//import axios from "axios"
//import cors from "cors"
//import fs from "fs"
//import { v4 as uuidv4 } from 'uuid';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/*const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
    params: {tag: '3d.mmorpg.fantasy.pvp', platform: 'pc'},
    headers: {
        'X-RapidAPI-Key': '10f7ad6edamshb85b099a1a349d7p113413jsna8336fc9b1bd',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};
const games = []
axios.request(options).then(function (response) {
    response.data.forEach(game => {
        game.notes = [];
        games.push(game)
    })
})*/
let games = JSON.parse(fs.readFileSync('./data/games.json'))

app.get("/", function(req, res){
    /*const newgames = games.map(game => {
        return{
            id: uuidv4(),
            freetogame_profile_url: game.freetogame_profile_url, 
            title: game.title, 
            game_url: game.game_url, 
            genre: game.genre, 
            platform: game.platform, 
            publisher: game.publisher, 
            release_date: game.release_date, 
            short_description: game.short_description,
            thumbnail: game.thumbnail,
            notes: []
        }
    })*/
    res.status(200).json(games)
})

app.post("/", function(req, res){
    const newGame = Object.assign(req.body)
    games.push(newGame)

    fs.writeFile('./data/games.json', JSON.stringify(games), (err) =>{
        res.status(201).json(newGame)
    })
})
app.post("/:id", function(req, res){
    const newNote = Object.assign(req.body)
    
    let id = req.params.id
    let gameToUpdate = games.find(game => game.id ===id)
    let index = games.indexOf(gameToUpdate)
    games[index].notes.push(newNote)

    fs.writeFile('./data/games.json', JSON.stringify(games), (err) =>{
        res.status(201).json(newNote)
    })
})

app.put("/:id", function(req, res){
    let id = req.params.id
    let gameToUpdate = games.find(game => game.id === id)
    console.log(gameToUpdate)
    let index = games.indexOf(gameToUpdate)

    Object.assign(gameToUpdate, req.body)

    games[index] = gameToUpdate

    fs.writeFile('./data/games.json', JSON.stringify(games), (err) =>{
        res.status(200).json(gameToUpdate)
    })
    //res.status(200).json(gameToUpdate)
})
app.put("/:gameId/:noteId", function(req, res){
    console.log("note update")
    let gameId = req.params.gameId
    let noteId = req.params.noteId

    let gameWithNote = games.find(game => game.id ===gameId)
    let gameIndex = games.indexOf(gameWithNote)
    console.log(gameWithNote)

    let noteToUpdate = gameWithNote.notes.find(note => note.id===noteId)
    let noteIndex = gameWithNote.notes.indexOf(noteToUpdate)
    console.log(noteToUpdate)
    console.log(req.body)

    Object.assign(noteToUpdate, req.body)
    games[gameIndex].notes[noteIndex] = noteToUpdate

    fs.writeFile('./data/games.json', JSON.stringify(games), (err) =>{
        res.status(200).json(noteToUpdate)
    })

})

app.delete("/:id", function(req, res){
    console.log("note deletion")
    let id = req.params.id
    let gameToDelete = games.find(game => game.id ===id)
    console.log(gameToDelete)
    if(!gameToDelete){
        res.status(404).json("fail")
    }

    let index = games.indexOf(gameToDelete)
    games.splice(index, 1)
    fs.writeFile('./data/games.json', JSON.stringify(games), (err) =>{
        res.status(204).json(null)
    })

})
app.delete("/:gameId/:noteId", function(req, res){
    let gameId = req.params.gameId
    let noteId = req.params.noteId

    let gameWithNote = games.find(game => game.id ===gameId)
    if(!gameWithNote){
        res.status(404).json("fail to search game")
    }
    let gameIndex = games.indexOf(gameWithNote)

    let noteToDelete = gameWithNote.notes.find(note => note.id ===noteId)
    if(!noteToDelete){
        res.status(404).json("fail to search note")
    }
    let noteIndex = gameWithNote.notes.indexOf(noteToDelete)
    games[gameIndex].notes.splice(noteIndex, 1)
    console.log("?????")
    fs.writeFile('./data/games.json', JSON.stringify(games), (err) =>{
        res.status(204).json(null)
    })

})


app.listen(8080, function () {
    console.log('Example app listening on port 8080.');
});