const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.send("Hello form the notes api endpoints");
})

module.exports = router;