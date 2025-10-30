const express = require('express')
const router = express.Router()
const chats = require('../models/chatschema')
const { genratetext,genrateanswer, genrateimage } = require('../config/gemini')
const asynchandler = require('../midleware/asynchandler')
const verifyuser = require('../midleware/authmiddleware')
const expresserr = require('../../utils/expresserr')
// create chat
router.post(
  '/chat',
  asynchandler(async (req, res) => {
    const { question } = req.body // data must be a string
    if (!question || typeof question !== 'string') {
      return res
        .status(400)
        .json({ error: "Request body must contain a string field 'data'" })
    }
    const answer = await genrateanswer(question)
    const newchat = await chats.create({ question, answer })
    res.json({ answer, massege: 'newchat created' }, newchat)
  })
)
// show all chats
router.get(
  '/chat',
  asynchandler(async (req, res) => {
    const chat = await chats.find()
    if (chat.length === 0) {
      throw new expresserr(402, 'chats is not initailized')
    }

   const updatedChats = await Promise.all(
      chat.map(async (ch) => {
        const questionhanding = await genratetext(ch.question);
        ch.question = questionhanding;
        return ch;
      })
    );

    console.log(updatedChats);
    res.json({ chat: updatedChats });
  })
)
// show perticuler chat
router.get(
  '/chat/:id',
  verifyuser,
  asynchandler(async (req, res) => {
    const { id } = req.params
    const chat = await chats.find({ _id: id })
    res.json({ chat })
  })
)
// delete particuler chat
router.delete(
  '/chat/:id',
  verifyuser,
  asynchandler(async (req, res) => {
    const { id } = req.params
    await chats.deleteOne({ _id: id })
    res.json({ massege: `${id} chat deleted` })
  })
)
module.exports = router
