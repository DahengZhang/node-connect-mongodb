const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:000000@192.168.0.8/test')
mongoose.connection.on('connected', () => console.log('MongoDB connected success!'))
mongoose.connection.on('error', () => console.log('MongoDB connected fail!'))
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected!'))

const User = mongoose.model('user', new mongoose.Schema({
  account: String,
  password: String
}))

app.use('/register', (req, res) => {
  console.log(req.params) // /register/:id/name/:name /register/0/name/daheng {id: 0, name: 'daheng'}
  console.log(req.query)
  new User({
    account: req.query.account,
    password: req.query.password
  }).save(error => {
    if (error) {
      res.json({
        status: 1,
        message: '注册失败'
      })
    } else {
      res.json({
        status: 0,
        message: '注册成功'
      })
    }
  })
})

app.listen(3000, () => console.log('Server is runing...'))
