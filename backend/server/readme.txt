Óra eleje:

npm install
npm install mongoose
npm install -g nodemon

nodemon index

docker run -d --name mongo -v $PWD/db:/data/db -p 127.0.0.1:27017:27017 mongo

// Mongo Compass vagy VSC MongoDB bővítmény

connection string: mongodb://localhost:27017


// A telepítendő új csomagok a mai órához:
npm install passport passport-local bcrypt express-session

FIGYELMEZTETÉS: az óra végén a sessionnel problémák voltak, így a logout és a bejelentkezés ellenőrzése lemaradt, a forráskódot frissíteni fogom,
ha ezeknek az okát sikerült debugolni és jelezni is fogom coospacen
A jövő heti coospace tesztben csak olyan rész fordulhat elő, ami működött helyesen az óra során

UPDATE: Frissítve, az index.js-ben két parancs kimaradt, és rosszul emlékeztem órán a middleware sorrendre, ez a frissített
változat már tökéletesen fog működni

