const router = require('express').Router()
const mongoose = require('mongoose')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const aruModel = mongoose.model('aru')
const userModel = mongoose.model('user')

const passport = require('passport')

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
const imgModel = mongoose.model('wares');
router.route('/wares/:id?').get((req, res) => {
    if(!req.params.id) {
        imgModel.find((err, aruk) => {
            if (err) return res.status(500).send({message: 'DB hiba betöltés során'})
            return res.status(200).send(aruk)
        });
    }else {
        imgModel.findOne({ _id: req.params.id }, (err, aru) => {
            console.log(req.params.id);
            if (err) return res.status(500).send({message: 'DB hiba betöltés során'})
            if (!aru) return res.status(400).send({message: 'Nincs ilyen áru'})
            return res.status(200).send(aru)
        })
    }
}).delete((req,res) => {
    if(!req.params.id) {
        res.status(500).send('Nem lehet minden árut törölni egyszerre');
    }else {
        imgModel.deleteOne({ _id: req.params.id }, (err, aru) => {
            console.log(req.params.id);
            if (err) return res.status(500).send({message: 'DB hiba betöltés során'})
            if (!aru) return res.status(400).send({message: 'Nincs ilyen áru'})
            return res.status(200).send({message: 'Törölve lett az áru'});
        })
    }
}).put((req,res) => {
    if(!req.params.id) {
        return res.status(500).send('Válasszon ki egy terméket, amit frissíteni szeretne');
    }else {
        imgModel.findOne({ _id: req.params.id }, (err, ware) => {
            if (err) return res.status(500).send({message: 'DB hiba betöltés során'})
            if (!ware) return res.status(400).send({message: 'Nincs ilyen áru'})
            if (req.body.name) ware.name = req.body.name
            if (req.body.description) ware.description = req.body.description
            if (req.body.diameter) {
                try {
                    convertedDiameter = Number(req.body.diameter);
                    ware.diameter = convertedDiameter;
                }catch(e) {
                    return res.status(500).send({message: "Az átmérőnek számnak kell lennie (cm)"});
                }
            }
            if (req.body.price) {
                try {
                    convertedPrice = Number(req.body.price);
                    ware.price = req.body.price;
                }catch(e) {
                    return res.status(500).send({message: "Az értéknek számnak kell lennie"});
                }
            }
            if (req.file) {
                ware.imgUrl = 'https://prf-2022-webshop.herokuapp.com/images/' + req.file.filename;
            }
            ware.save((error) => {
                if (error) return res.status(500).send({message: 'DB hiba betöltés során'})
                return res.status(200).send(ware)
            })
        })
    }
}); 

router.route('/users/:id?').get((req, res) => {
    if (!req.params.id) {
        userModel.find((err, users) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send(users)
        })
    } else {
        userModel.findOne({ nev: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!user) return res.status(400).send('Nincs ilyen user!')
            return res.status(200).send(user)
        })
    }
}).post((req, res) => {
    if (!req.params.id || !req.body.password || !req.body.email) {
        console.log(req.params.id, req.body.password, req.body.email, req.body)
        return res.status(400).send("Hiányos input!")
    } else {
        userModel.findOne({ username: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (user) return res.status(400).send('mar van ilyen')
            const nUser = new userModel({
                username: req.params.id, email: req.body.email,
                password: req.body.password
            })
            nUser.save((error) => {
                if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                return res.status(200).send(req.body)
            })
        })
    }
}).put((req, res) => {
    if (!req.params.id || (!req.body.username && !req.body.password)) {
        return res.status(400).send("Hiányos input!")
    } else {
        userModel.findOne({ username: req.params.id }, (err, user) => {
            if (err) return res.status(500).send({message: 'DB hiba betöltés során'})
            if (!user) return res.status(400).send({message: 'Még nincs ilyen user'})
            if (req.body.password) user.password = req.body.password
            if (req.body.email) user.darab = req.body.darab
            user.save((error) => {
                if (error) return res.status(500).send({message: 'DB hiba betöltés során'})
                return res.status(200).send(user)
            })
        })
    }
}).delete((req, res) => {
    if (req.params.id) {
        userModel.deleteOne({ username: req.params.id }, (err) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send({message: 'Törölve az adott user'})
        })
    } else {
        return res.status(403).send({message: 'Tilos minden felhasználót törölni egyszerre!'})
    }
})

router.route('/regist').post((req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        console.log(req.body.username, req.body.password, req.body.email, req.body)
        return res.status(400).send({message: 'Hiányos input!'})
    } else {
        userModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) return res.status(500).send({message: 'DB hiba'})
            if (user) return res.status(400).send({message: 'Már van ilyen felhasználónév'})
            const nUser = new userModel({
                username: req.body.username, email: req.body.email,
                password: req.body.password
            })
            nUser.save((error) => {
                if (error) return res.status(500).send({message: 'DB hiba a betöltés során ' + error})
                return res.status(200).send(req.body)
            })
        })
    }
})

router.route('/login').post((req, res, next) => {
    console.log(req.body);
    if (req.body.username, req.body.password) {
        //meghívom a passport local stratégiáját és paraméterként átadom neki a req,res objektumokat
        passport.authenticate('local', function (error, user) {
            if (error) return res.status(500).send(error);
            console.log('de attol ide is bemegy');
            // ezzel léptetem bele a sessionbe a felhasználót, a user objektumot utána mindig el tudom majd érni
            // req.user néven
            req.logIn(user, function (error) {
                if (error) {
                    console.log('itt kuldi errort');
                    return res.status(500).send(error);
                }
                console.log('login eredménye:',user)
                console.log('login eredménye:',passport)
                return res.status(200).send(user);
            })
        })(req, res, next);
    } else { return res.status(400).send({message: 'Felhasználónév és jelszó szükséges'}); }
});

router.route('/logout').post((req, res, next) => {
    console.log('user:', req.user)
    // ha volt sikeres login és sikerült sessionbe léptetni a usert, akkor a session megszüntetéséig
    // vagyis logoutig ez az isAuthenticated() mindig true lesz majd
    if (req.isAuthenticated()) {
        req.logout(); // megszünteti a sessiont
        return res.status(200).send({message: 'Sikeres kijelentkezés'});
    } else {
        return res.status(403).send({message: 'Nem is volt bejelentkezve'});
    }
});

router.route('/status').get((req, res, next) => {
    console.log('user:', req.user)
    // ha volt sikeres login és sikerült sessionbe léptetni a usert, akkor a session megszüntetéséig
    // vagyis logoutig ez az isAuthenticated() mindig true lesz majd
    if (req.isAuthenticated()) { 
        return res.status(200).send(req.session);
    } else {
        return res.status(403).send({message: false});
    }
})


module.exports = router