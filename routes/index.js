const express = require('express');
const router = express.Router();

// Main Page
router.get('/', function (req, res) {

  Return();

  function Return () {
    res.render('main', { layout: 'main', title: 'Node Admin' });
  }
});

module.exports = router;
