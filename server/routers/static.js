const router = require('express').Router();

router.get('/', (req,res)=>{
    res.render('index');
});

// router.all('*', (req,res)=>{
//     res.status(404).render('404');
// })

module.exports = router;