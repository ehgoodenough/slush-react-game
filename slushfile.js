var gulp = require("gulp")
var gulp_install = require("gulp-install")
var gulp_conflict = require("gulp-conflict")
var gulp_template = require("gulp-template")

var path = require("path")
var inquirer = require("inquirer")

gulp.task("default", function(done) {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your app?",
            default: "fun"
        },
        {
            type: "confirm",
            name: "continuing",
            message: "Continue?"
        }
    ],
    function(inquiries) {
        if(!inquiries.continuing) {
            return done()
        }
        gulp.src(path.join(__dirname, "./templates/**/*"))
            .pipe(gulp_template(inquiries))
            .pipe(gulp_conflict("./"))
            .pipe(gulp.dest("./"))
            .pipe(gulp_install())
            .on("end", function() {
                done()
            })
            .resume()
    })
})

gulp.start("default")
