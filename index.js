const express = require('express');
const app = express();
const PtaxReader = require('./srv/readPtaxBacen');

app.use(express.urlencoded({ extended: false }));



app.use(function (req, res, next) {
    console.log("Request", req);
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
    next();
})

app.get("/PtaxHoje", function(req,res) {
        
    async () => { await PtaxReader.getUSDPtax().then((result) => {
        console.log("Index Return:", result);
        res.send({ data: result });
    }).catch( error => {
        res.send({ message: "Erro na comunicação com Banco Central", erro: error});
    }); 
    }

});

//Start App Listening at port.
app.listen(3000, () => {
    console.log("Server Running at port 3000");
});