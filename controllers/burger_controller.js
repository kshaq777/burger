var express = require("express");
const burger = require("../models/burgers.js");

var router = express.Router();


router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


router.get("/api/burger", function(req, res) {
  burger.all(function(data) {
    res.json({ burgers: data });
  });
});


router.post("/api/create", function(req, res) {
console.log(req.body.burger_name);
  burger.create([
    "burger_name"
  ], [
    req.body.burger_name
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/devour/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id});
    }
  });
});

router.delete("/delete/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
