var gulp = require("gulp")
var gulp_rename = require("gulp-rename")
var gulp_install = require("gulp-install")
var gulp_template = require("gulp-template")
var gulp_conflict = require("gulp-conflict")

var path = require("path")
var inquirer = require("inquirer")

gulp.task("default", function(done) {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your game?",
            default: path.basename(process.cwd()) || "game"
        },
        {
            type: "input",
            name: "description",
            message: "How would you describe your game?",
            default: "A game that was developed in React"
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
                    if(file.basename.charAt(0) === "!") {
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
