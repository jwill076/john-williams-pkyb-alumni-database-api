const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");
const path = require("path");

router.use(cors());
router.use(express.json());
router.use(bodyParser.json());
router.use(express.static('public'));

function loadProfiles() {
  const jsonString = fs.readFileSync("./data/profiles.json");
  return JSON.parse(jsonString);
}

router
  .get("/", (request, response) => {
    const profiles = loadProfiles();
    response.status(200).json(profiles);
  })

  .get("/:id", (request, response) => {
    const profiles = loadProfiles();
    const profileId = request.params.id;
    const selectedProfileById = profiles.find((profile) => profileId === profile.id);

    if (selectedProfileById) {
      response.status(200).json(selectedProfileById);
    } else {
      response.status(400).json({errorMessage: `Profile not found with requested ID: ${profileId}`});
    }
  })

  .post("/", (request, response) => {
    const profiles = loadProfiles();
    const newProfileObject = [
      {
        "id": uuidv4(),
        "name": request.body.name,
        "username": request.body.username,
        "email": request.body.email,
        "password": request.body.password,
        "school": request.body.school,
        "year": request.body.year,
        "image": "http://localhost:8080/images/avatar.svg",
        "college": "BrainStation",
        "quote": "Does war bring out the worst in men or does the worst in men bring out war? -Winstin Churchill",
        "career" : "Web Developer"
      }
    ];
    const newProfilesDetailsArray = profiles.push(newProfileObject);

    fs.writeFile(
      __dirname + "./data/profiles.json",
      JSON.stringify(newProfilesDetailsArray, null, 2), "utf8",
      (error) => {
        if (error) {
          console.error(error);
        } else {
          response.status(201).json(newProfilesDetailsArray);
        }
      }
    );
  });

module.exports = router;