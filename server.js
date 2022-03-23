var connect = require("connect");
var logger = require("morgan");
var serve_static = require("serve-static");
var ejs = require("ejs");  
var http = require("http");
var bodyparse = require("body-parser");


var app = connect().use(logger("dev")).use(bodyparse()).use(serve);

http.createServer(app).listen(8080);


var contactArr = [];

function serve (req, res) {
	if (req.url == "/index") {
        console.log("Starting!");
        render (res, "index", {});
    }
    else if(req.url == "/mailer"){
        console.log("Starting!");
        let mailObj = {
            prefix : req.body.prefix,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            street : req.body.street,
            city : req.body.city,
            state : req.body.states,
            zipCode : req.body.zipc,
            phoneNum : req.body.phone,
            emailAddr : req.body.email,
            phoneCon : req.body.phoneCon,
            mailCon : req.body.mailCon,
            emailCon : req.body.emailCon,
            anyCon : req.body.anyCon,
        };
        //console.log(mailObj);
        contactArr.push(mailObj);
        render (res,"mailer", mailObj);
    }
    else if(req.url == "/contacts"){
        console.log("Starting!");
        render(res,"contacts",{contactList : contactArr});
    }

}
function render (res, view, model) {
    ejs.renderFile("public/" + view + ".ejs" ,model,
       function(err, result) {
           if (!err) {
               res.end(result);
           }
           else {
               console.log(err);
               res.end("An error occurred");
           }
       }
   );
}