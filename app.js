const path = require('path')
const db = require('./config/externalConnectionsConfig.js')
const express=require('express')
const ejs=require('ejs')
const expressEjsLayouts=require('express-ejs-layouts')
// db.connect((err)=>{

//     if(err){
//       console.log("ERROR in establishing Database connection:" , err);
//     }else{
//       console.log("Database Connection Successfull: Database is LIVE");
//     }
   
//   });

const app=express()
app.use(expressEjsLayouts)
app.set('views', path.join(__dirname, '/app/views'))
app.set('view engine', 'ejs')
app.locals.extname = 'ejs';
app.locals.layouts = 'app/views/layout/';
app.locals.partials = 'app/views/partials/';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',express.static(path.join(__dirname, 'public/css')))
app.use('/js',express.static(path.join(__dirname, 'public/js')))
app.use('/images',express.static(path.join(__dirname, 'public/images')))
app.use('/fonts',express.static(path.join(__dirname, 'public/fonts')))

app.set('layout','./layout/user-layout')
const userRouter = require('./routes/user');
app.use('/', userRouter);

app.listen(3000,()=>console.log("started listening"))


