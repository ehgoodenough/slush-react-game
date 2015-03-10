var gulp = require("gulp")
var gulp_rename = require("gulp-rename")
var gulp_install = require("gulp-install")
var gulp_template = require("gulp-template")
var gulp_conflict = require("gulp-conflict")

var path = require("path")
var async = require("async")
var inquirer = require("inquirer")
var exec = require("child_process").exec

gulp.task("default", function(done) {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Project Name?",
            default: path.basename(process.cwd()) || "game"
        },
        {
            type: "input",
            name: "description",
            message: "Project Description?",
            default: "An awesome game."
        },
        {
            type: "input",
            name: "version",
            message: "Initial Version?",
            default: "0.0.0"
        },
        {
            type: "input",
            name: "repository",
            message: "Git Repository?",
            validate: function(repository) {
                if(repository == "") {
                    return true
                } else {
                    if(repository/*is valid*/) {
                        return true
                    } else {
                        return false
                    }
                }
            }
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
                .pipe(gulp_conflict(process.cwd()))
                .pipe(gulp.dest(process.cwd()))
                .pipe(gulp_install())
            if(answers.repository) {
                async.series([
                    exec.bind(null, "cd " + process.cwd()),
                    exec.bind(null, "git init"),
                    exec.bind(null, "git remote add origin " + answers.repository)
                ])
            }
        } else {
            done()
        }
    })
})
