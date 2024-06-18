exports.getcart = (req, res) => {
    req.session.test = req.session.test || [];
    console.log(req.session.test)
    res.json({ test: req.session });
  }

 exports.addcart = (req, res) => {
    req.session.test = req.session.test || [];
    // this line check data already exist or not
    const existingTest = req.session.test.find((test) => test.id === req.body.id);
    // if condition for check and update data all feild required
    if (existingTest) {
      existingTest.name = req.body.name;
      existingTest.price = req.body.price;
      existingTest.url = req.body.url;
      existingTest.quantity = req.body.quantity;
      console.log("Item already exists", req.session.id, req.body.id);
    } else {
      req.session.test.push(req.body);
      console.log(req.session.test, "test");
    }
    res.send({ test: req.session.test });
  ;
}

  exports.deletecart = (req,res)=>{
      req.session.test = req.session.test || [];
      req.session.test = req.session.test.filter((test) => test.id != req.body.id);
      res.send({ test: req.session.test });
  }

//   realcode
// GET route
// app.get('/test', (req, res) => {
//   req.session.test = req.session.test || [];
//   console.log(req.session.test)
//   res.json({ test: req.session });
// });

// app.post('/test', (req, res) => {
//   req.session.test = req.session.test || [];
//   // this line check data already exist or not
//   const existingTest = req.session.test.find((test) => test.id === req.body.id);
//   // if condition for check and update data all feild required
//   if (existingTest) {
//     existingTest.age = req.body.age;
//     existingTest.name = req.body.name;
//     existingTest.url = req.body.url;
//     existingTest.email = req.body.email;
//     console.log("Item already exists", req.session.id, req.body.id);
//   } else {
//     req.session.test.push(req.body);
//     console.log(req.session.test, "test");
//   }
//   res.send({ test: req.session.test });
// });

// app.delete('/test',(req,res)=>{
//     req.session.test = req.session.test || [];
//     req.session.test = req.session.test.filter((test) => test.id != req.body.id);
//     res.send({ test: req.session.test });
// })
  