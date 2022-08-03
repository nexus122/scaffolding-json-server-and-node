const path = require('path');
const jsonServer = require('json-server');
const { ServerResponse } = require('http');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname,'db.json'));
const middlewares = jsonServer.defaults();

server.use(
    jsonServer.rewriter({
        '/api/*': '/$1'
    })
)

server.use(middlewares);

server.use(jsonServer.bodyParser);

/* Metodo Get en el json server */
server.get('/echo',(req,res)=>{
    console.log('Get Server is running');
    res.json('Hello World!');
});

server.use('/pension-plan/deduct',(req,res,next)=>{
    console.log('Post Server is running')
    if(req.method === 'POST'){
        const companyPensionPlan = req.query.companyPensionPlan;
        const personPensionPlan = req.query.personPensionPlan;
        const taxeBase = req.query.taxeBase;
        console.log(companyPensionPlan, personPensionPlan, taxeBase);

        if(parseInt(companyPensionPlan) === 8500 && parseInt(personPensionPlan) === 1500, parseInt(taxeBase) === 6000){
            console.log('The result is 4500');
            res.writeHead(200, {'content-Type': 'application/json'})
            res.end('Tu madre');
        }

        if(parseInt(companyPensionPlan) === 8500 && parseInt(personPensionPlan) === 1500, parseInt(taxeBase) === 500000){
            console.log('The result is 4700');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('4700');
        }

    }
})

server.use(router);

server.listen(3001,()=>{
    console.log('JSON Server is running')
})