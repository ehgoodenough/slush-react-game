var gulp = require("gulp")
var gulp_install = require("gulp-install")
var gulp_conflict = require("gulp-conflict")
var gulp_template = require("gulp-template")
var gulp_rename = require("gulp-rename")

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
            name: "confirmed",
            message: "Confirm?"
        }
    ], function(answers) {
        if(answers.confirmed) {
            gulp.src(path.join(__dirname, "./template/**/*"))
                .pipe(gulp_template(answers))
                .pipe(gulp_rename(function(file) {
                    if(file.basename.charAt(0) === "_") {
                        file.basename = "." + file.basename.slice(1)
                    }
                }))
                .pipe(gulp_conflict(__dirname + "/temp"))
                .pipe(gulp.dest(__dirname + "/temp"))
                .pipe(gulp_install())
        } else {
            done()
        }
    })
})

gulp.start("default")
