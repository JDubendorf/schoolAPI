/* jshint esversion:6 */
 
var http = require("http");
var fs = require("fs");

var classes = [

    {   name: "Fetching", 
        homework: "done", 
        grade: "A", 
        taking: true 
    },
    {   name: "International Dog Treats", 
        homework: "not done", 
        grade: "B", 
        taking: true 
    },
    {   name: "Hiking and You", 
        homework: "not done", 
        grade: "none", 
        taking: false
    },
    {   name: "Advanced Sniffing", 
        homework: "not done", 
        grade: "none", 
        taking: false
    },
    {   name: "Fire Hydrant Theory and Practice", 
        homework: "not done", 
        grade: "none", 
        taking: false
    },
    {   name: "Eating Things Off the Ground", 
        homework: "not done", 
        grade: "none", 
        taking: false
    } 

];

var server = http.createServer((req, res) => {
    if (req.url === "/index.html" || req.url === "/"){
        fs.readFile("index.html", (err, data) => {
            res.write(data);
            res.end();
        });
    } else if (req.url === "/classes" || req.url === "/schedule" || req.url === "/getGrades" || req.url === "/getHomework") {
        if (req.method === "GET") {
            allClasses = JSON.stringify(classes);
            res.write(allClasses);
            res.end();
        }
    } else if (req.url === "/addClass" && req.method === "POST") {
        var className = "";

        req.on('data',function(data){
            className += data;
        });

        req.on('end', function(){
            for (var each of classes) {
                if (className === each.name && each.taking === false) {
                    each.taking = true;
                    each.grade = "no assignments submitted";
                }
            }
        });
        res.end();
    } else if (req.url === "/updateHomework" && req.method === "POST") {
        var update = "";

        req.on('data',function(data){
            update += data;
        });

        req.on('end', function(){
            for (var each of classes) {
                if (update === each.name && each.homework === "not done" && each.taking === true) {
                    each.homework = "done";
                    each.grade = "A";
                }
            }
        });
        res.end();
    } else {
        res.write("This is James's Server!");
        res.end();
    }
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});

