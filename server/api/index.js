const path = require("path");
const fs = require("fs");
const app = require("../app");
const router = require("express").Router();
const challenges = require("../challenges");
module.exports = router;

router.get("/headshots", (req, res, next) => {
  try {
    const imagesArr = [];
    const images = path.join(__dirname, "../../public/star_wars_characters");
    fs.readdir(images, (err, files) => {
      try {
        files.forEach((file) => {
          if (!file.includes(".DS_Store")) {
            imagesArr.push(file);
          }
        });
      } catch (error) {
        console.log("files error", error);
      }
      res.send(imagesArr);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/backgrounds", (req, res, next) => {
  try {
    const bgArr = [];
    const bgs = path.join(__dirname, "../../public/backgrounds");
    fs.readdir(bgs, (err, files) => {
      try {
        files.forEach((file) => {
          if (!file.includes(".DS_Store")) {
            bgArr.push(file);
          }
        });
      } catch (error) {
        console.log("files error", error);
      }
      res.send(bgArr);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/challengecount", (req, res, next) => {
  try {
    res.send({
      demo: challenges.demo.length,
      youngling: challenges.youngling.length,
      padawan: challenges.padawan.length,
      jedi: challenges.jedi.length,
      master: challenges.master.length,
      sith: challenges.sith.length,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/gamedata/:level/:rounds", (req, res, next) => {
  const { rounds, level } = req.params;
  if (challenges[level] && challenges[level].length >= rounds) {
    const gameData = new Set();
    while (gameData.size < rounds) {
      gameData.add(
        challenges[level][Math.floor(Math.random() * challenges[level].length)]
      );
    }

    if (challenges[level]) res.send([...gameData]);
  } else res.sendStatus(404);
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
