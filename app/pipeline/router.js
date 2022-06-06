
var router = require('express').Router()

function getCustomers (req, res) {
  
}

function sendEvents (req, res) {
  console.log(req.body)
  return {"res":"test"}
}

router.post('/sendEvents', (req, res) => {
    console.log(req.body)
    res.send('2')
})
router.get('/sendEvents', (req,res) =>{
    console.log("test")
    return {"test":"1"}
})

module.exports = router