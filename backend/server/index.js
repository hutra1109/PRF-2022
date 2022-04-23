const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express()

const port = process.env.PORT || 3000;

const cors = require('cors');

const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const dbUrl = 'mongodb+srv://'+process.env.USERNAME+':'+process.env.DB_PASS+'@prf-cluster.2csco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => { console.log('db connected') })
mongoose.connection.on('error', (err) => { console.log('db error', err) })

mongoose.model('aru', require('./models/arukereso.schema'))
mongoose.model('user', require('./models/user.schema'))
mongoose.model('wares', require('./models/wares.schema'))

//app.use(cors());
/*app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))*/
/*app.use((req,res,next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if(req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    }
    next();
});
*/
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:4200");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS");
    next();
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


const imgModel = mongoose.model('wares');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
const upload = multer({ storage: storage });


//definiáljuk a lokális stratégiát
passport.use('local', new localStrategy(function (username, password, done) {
    const userModel = mongoose.model('user')
    //a passport hacsak nem rendelkezünk másképp, a req.body.username és a req.body.password mezőket keresi majd
    userModel.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })
    })
}));


/* Ezek a következőt csinálják: ha megadjuk őket, akkor a req.logIn művelet során sessionbe,
munkafolyamatba léptetik a usert - a kliens kap egy sütit, ami ha a későbbi kéréseiben visszjön,
a passport egyből felismeri, hogy már bejelentkezett egyszer, illetve a req.user mezőn keresztül
el tudjuk majd érni azt az adatot, amit a serialize-nál a done() második paramétereként adtunk meg */
passport.serializeUser(function (user, done) {
    console.log('serializáció meghivodik', user);
    if (!user) return done('nincs megadva beléptethető felhasználó', null);
    return done(null, user);
});
passport.deserializeUser(function (user, done) {
    console.log('deserializáció meghivodik', user);
    if (!user) return done("nincs user akit kiléptethetnénk", null);
    return done(null, user);
});
//ezzel a secrettel lesznek aláírva, hitelesítve a sütik, érdemes minél komplexebbet választani - vagyis nem ilyet, mint most én
app.use(session({ secret: 'prf2022asddsaasddsaasddsaasddsaaaaa', resave: true }));
app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routes'))
app.use('/subrouter-pelda', require('./routes'))
app.post('/wares', upload.single('file'), function (req, res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.status(500).send("Hiba történt a file feltöltés során, sikertelen");
    } else {
        req.body.imageUrl = 'https://prf-2022-webshop.herokuapp.com/images/' + req.file.filename; //'https://prf-2022-webshop.herokuapp.com/images/'
        let convertedPrice = '';
        let convertedDiameter = '';
        try {
            convertedPrice = Number(req.body.price);
        }catch(e) {
            return res.status(500).send("Az értéknek számnak kell lennie");
        }
        try {
            convertedDiameter = Number(req.body.diameter);
        }catch(e) {
            return res.status(500).send("Az átmérőnek számnak kell lennie (cm)");
        }
        const newWare = new imgModel({
            name: req.body.name,
            price: convertedPrice,
            description: req.body.description,
            diameter: convertedDiameter,
            imgUrl: req.body.imageUrl
        })
        newWare.save((error) => {
            if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
            return res.status(200).send(req.body)
        })
    }
  });

app.listen(port, () => {
    console.log('A szerver elindult')
})