// //L'application requiert l'utilisation du module Express.
// //La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
// var express = require("express"),
//   bodyParser = require("body-parser"),
//   swaggerJsdoc = require("swagger-jsdoc"),
//   swaggerUi = require("swagger-ui-express");

//   const options = {
// 	definition: {
// 	  openapi: "3.0.0",
// 	  info: {
// 		title: "Express API with Swagger",
// 		version: "0.1.0",
// 		description:
// 		  "This is a simple CRUD API application made with Express and documented with Swagger",
// 		license: {
// 		  name: "MIT",
// 		  url: "https://spdx.org/licenses/MIT.html",
// 		},
// 		contact: {
// 		  name: "Learn Studio",
// 		  url: "https://learnstudio.com",
// 		  email: "contact@learnstudio.com",
// 		},
// 	  },
// 	  servers: [
// 		{
// 		  url: "http://localhost:3000/piscines",
// 		},
// 	  ],
// 	},
// 	apis: ["./api.js"],
//   };
  
//   const specs = swaggerJsdoc(options);

// // Nous définissons ici les paramètres du serveur.
// var hostname = 'localhost'; 
// var port = 3000; 

// // Nous créons un objet de type Express. 
// var app = express();

// //Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
// //C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
// var myRouter = express.Router(); 



// myRouter.route('/')
// // all permet de prendre en charge toutes les méthodes. 
// .all(function(req,res){ 
//       res.json({message : "Bienvenue sur notre API ", methode : req.method});
// });

// // Je vous rappelle notre route (/piscines).  

// myRouter.route('/piscines')
// // J'implémente les méthodes GET, PUT, UPDATE et DELETE
// // GET
// .get(function(req,res){ 
//  res.json({
//  message : "Liste les piscines de Lille Métropole avec paramètres :",
//  ville : req.query.ville,
//  nbResultat : req.query.maxresultat, 
//  methode : req.method });
 
// })

// //POST
// .post(function(req,res){
//       res.json({message : "Ajoute une nouvelle piscine à la liste", methode : req.method});
// })
// //PUT
// .put(function(req,res){ 
//       res.json({message : "Mise à jour des informations d'une piscine dans la liste", methode : req.method});
// })
// //DELETE
// .delete(function(req,res){ 
// res.json({message : "Suppression d'une piscine dans la liste", methode : req.method});  
// }); 

// myRouter.route('/piscines/:piscine_id')
// .get(function(req,res){ 
// 	  res.json({message : "Vous souhaitez accéder aux informations de la piscine n°" + req.params.piscine_id});
// })
// .put(function(req,res){ 
// 	  res.json({message : "Vous souhaitez modifier les informations de la piscine n°" + req.params.piscine_id});
// })
// .delete(function(req,res){ 
// 	  res.json({message : "Vous souhaitez supprimer la piscine n°" + req.params.piscine_id});
// });

// myRouter.use('/api-docs', swaggerUi.serve);
// myRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

// // Nous demandons à l'application d'utiliser notre routeur
// app.use(myRouter);  
var express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/books", require("./routes/books"));




const options = {
	definition: {
	  openapi: "3.0.0",
	  info: {
		title: "Express API with Swagger",
		version: "0.1.0",
		description:
		  "This is a simple CRUD API application made with Express and documented with Swagger",
		license: {
		  name: "MIT",
		  url: "https://spdx.org/licenses/MIT.html",
		},
		contact: {
		  name: "Learn Studio",
		  url: "https://learn-studio.com",
		  email: "contact@learn-studio.com",
		},
	  },
	  servers: [
		{
		  url: "http://localhost:3000/books",
		},
	  ],
	},
	apis: ["./routes/books.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true })
  );


const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);