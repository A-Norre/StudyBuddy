"use strict";

// const { localsName } = require("ejs");
const express = require("express");
const router = express.Router();
const quiz = require("../src/quiz.js");



router.get("/", async (req, res) => {
    console.log("Root TEST route");
    
    res.send("<h1>Root route FOR QUIZ</h1>");
});

router.get("/about", async (req, res) => {
    let data = {};

    data.all = await quiz.showAll();
    console.log(data.all);
    res.render("about.ejs", data);
});

router.get("/index", (req, res) => {
    res.render("index.ejs");
});

router.get("/quiz", async (req, res) => {
    let data = {};

    data.all = await quiz.showAll();

    res.render("quiz.ejs", data);
});

router.get("/quizcourse/:course&:zero", async (req, res) => {
    let data = {};
    data.course = req.params.course;
    let points = 0;
    data.points = points;

    data.courses = await quiz.fetchcourse(req.params.course);
    data.all = await quiz.showAll();
    
    data.zero = req.params.zero;
    res.render("quizcourse.ejs", data);
});

// router.post("/quizquestionp", (req, res) => {
//     res.redirect("/quizquestiong");
// });

router.get("/quizquestion/:course&:zero&:points", async (req, res) => {
    
    let data = {};

    data.pickedcourse = req.params.course;
    
    data.courses = await quiz.fetchquestion(req.params.course);
    console.log(data.courses);
    console.log(req.params.zero);
    console.log(data.courses.length);

    if (parseInt(req.params.zero) == (data.courses.length-1)) {
        data.currentquestion = data.courses[req.params.zero].quest
        data.currentanswer = data.courses[req.params.zero].answer
        data.currentid = data.courses[req.params.zero].id
        data.zero = parseInt(req.params.zero);
        data.reverse = parseInt(req.params.zero)-1;
        data.points = parseInt(req.params.points);
        data.size = data.courses.length;
        res.render("quizquestionend.ejs", data);
    } else if (parseInt(req.params.zero) == (data.courses.length-2) && data.courses[0].quest == null) {
        data.currentquestion = data.courses[req.params.zero].quest
        data.currentanswer = data.courses[req.params.zero].answer
        data.currentid = data.courses[req.params.zero].id
        data.zero = parseInt(req.params.zero);
        data.reverse = parseInt(req.params.zero)-1;
        data.points = parseInt(req.params.points);
        data.size = data.courses.length;
        res.render("quizquestionend.ejs", data);
    } else  {
        if (data.courses[req.params.zero].quest == null) {
            data.currentquestion = data.courses[(parseInt(req.params.zero)+1)].quest
            data.currentanswer = data.courses[(parseInt(req.params.zero)+1)].answer
            data.currentid = data.courses[(parseInt(req.params.zero)+1)].id
            data.size = data.courses.length;
            data.zero = parseInt((parseInt(req.params.zero)+1))+1;
            data.reverse = parseInt((parseInt(req.params.zero)+1))-1;
            data.points = parseInt(req.params.points);
        } else {
            data.currentquestion = data.courses[req.params.zero].quest
            data.currentanswer = data.courses[req.params.zero].answer
            data.currentid = data.courses[req.params.zero].id
            data.size = data.courses.length;
            data.zero = parseInt(req.params.zero)+1;
            data.reverse = parseInt(req.params.zero)-1;
            data.points = parseInt(req.params.points);
        }
        res.render("quizquestion.ejs", data);
    }
});




router.post("/quizquestionp", (req, res) => {
    // console.log("quiz?test?");
    // console.log(req.body.answer);
    // console.log(req.body.currentanswer);
    // console.log(req.body.zero);
    // console.log(req.body.size);
    let points = 0;
    
    if (req.body.answer.toLowerCase() == req.body.currentanswer.toLowerCase() && req.body.currentanswer != null) {
        console.log("SCORE!");
        points = req.body.points;
        points = parseInt(points) + 1;
        console.log(points);
    } else {
        points = parseInt(req.body.points);
        console.log("FAIL");
        console.log(points);
    }

    if (parseInt(req.body.size) == (parseInt(req.body.zero)+1)) {
        res.redirect("/quizquestionfinish&"+points+"&"+req.body.size+"&"+req.body.pickedcourse);
    } else if (parseInt(req.body.size) == (parseInt(req.body.zero)+2)) {
        res.redirect("/quizquestionfinish&"+points+"&"+req.body.size+"&"+req.body.pickedcourse);
    } else {
        let sendTo = "/quizquestion/" + req.body.pickedcourse + "&" + req.body.zero + "&" + points;

        res.redirect(sendTo);
    }
    
    // sista varvet ska den redirecta till /quizquestionresult (när zero == längden)
});

// router.get("/quizquestionresult&:points&:size", (req, res) => {
//     console.log(req.params.points);
//     let points = parseInt(req.params.points);
//     res.redirect("quizquestionfinish&"+ points);
// });

router.get("/quizquestionfinish&:points&:size&:course", async (req, res) => {
    let data = {};
    console.log(req.params.course);

    data.courses = await quiz.fetchquestion(req.params.course);
    console.log(data.courses[0]);

    if (data.courses[0].quest == null) {
        data.size = parseInt(req.params.size)-1;
    } else {
        data.size = req.params.size;
    }

    data.points = req.params.points;

    if (req.params.size == 1) {
        data.question = "question";
    } else {
        data.question = "questions";
    }
    res.render("quizquestionfinish.ejs", data);
});


router.post("/quizquestion3p", (req, res) => {
    res.redirect("/quizquestion3g");
});

router.get("/quizquestion3g", (req, res) => {
    res.render("quizquestion3.ejs");
});


router.post("/studyp", (req, res) => {
    res.redirect("/study");
});

router.get("/study", async (req, res) => {
    let data = {};

    data.all = await quiz.showAll();

    res.render("study.ejs", data);
});

router.get("/studyadd", async (req, res) => {

    let data = {};

    data.all = await quiz.showAll();
    console.log("studyadd")

    res.render("studyadd.ejs", data);
});

router.post("/studyaddp", async (req, res) => {

    console.log(req.body.subject);
    console.log("studyaddp");
    await quiz.addTopic(req.body);

    res.redirect("/study");
});

router.get("/studycourse/:course&:zero", async (req, res) => {
    
    let data = {};
    data.course = req.params.course;

    data.courses = await quiz.fetchcourse(req.params.course);
    data.all = await quiz.showAll();

    // if (data.courses[0].course == null) {
    //     data.found = 1;
    // } else {
    //     data.found = 0;
    // }

    // console.log(data.found);
    // console.log(data.courses[0].course);

    data.course = req.params.course
    
    data.zero = req.params.zero;


    res.render("studycourse.ejs", data);
});

router.get("/studycourseadd/:course&:zero", async (req, res) => {

    let data = {};
    data.course = req.params.course;

    data.courses = await quiz.fetchcourse(req.params.course);
    data.all = await quiz.showAll();
    
    data.course = req.params.course

    data.zero = req.params.zero;

    res.render("studycourseadd.ejs", data);
});

router.get("/studycourseadd2/:course&:zero", async (req, res) => {

    let data = {};
    data.course = req.params.course;

    data.courses = await quiz.fetchcourse(req.params.course);
    data.all = await quiz.showAll();
    
    data.course = req.params.course

    data.zero = req.params.zero;

    res.render("studycourseadd2.ejs", data);
});

router.post("/studycourseaddp/:course&:zero", async (req, res) => {

    console.log(req.body.subject);
    await quiz.addTopic(req.body);

    res.redirect("/studycourse/" + req.params.course + "&" + req.params.zero);
});

router.post("/studycourseadd2p/:course&:zero", async (req, res) => {

    console.log(req.body.course);
    await quiz.addCourse(req.body.course);

    res.redirect("/studycourse/" + req.params.course + "&" + req.params.zero);
});

router.get("/studyquestion/:course&:zero", async (req, res) => {


    let data = {};

    data.pickedcourse = req.params.course;
    data.courses = await quiz.fetchquestion(req.params.course);
    console.log(data.courses.length);
    console.log(data.courses);


    if (data.courses[0].quest == null && data.courses.length == 1) {
        data.currentquestion = data.courses[parseInt(req.params.zero)].quest
        data.currentanswer = data.courses[parseInt(req.params.zero)].answer
        data.currentid = data.courses[parseInt(req.params.zero)].id
        data.currenttopic = data.courses[parseInt(req.params.zero)].topic
        data.zero = parseInt(req.params.zero);
        data.reverse = parseInt(req.params.zero)-1;
        data.size = parseInt(data.courses.length);
        res.render("studyquestionend2empty.ejs", data);
    } 
    else if ((parseInt(data.courses.length) == 1)) {
        data.currentquestion = data.courses[req.params.zero].quest
        data.currentanswer = data.courses[req.params.zero].answer
        data.currentid = data.courses[req.params.zero].id
        data.currenttopic = data.courses[req.params.zero].topic
        data.zero = parseInt(req.params.zero);
        data.reverse = parseInt(req.params.zero)-1;
        data.size = data.courses.length;
        res.render("studyquestionend2.ejs", data);
        console.log("ny!");

    } else if (data.courses[0].quest == null && data.courses.length == 2) {
        data.currentquestion = data.courses[parseInt(req.params.zero)+1].quest
        data.currentanswer = data.courses[parseInt(req.params.zero)+1].answer
        data.currentid = data.courses[parseInt(req.params.zero)+1].id
        data.currenttopic = data.courses[parseInt(req.params.zero)+1].topic
        data.zero = parseInt(req.params.zero);
        data.reverse = parseInt(req.params.zero)-1;
        data.size = parseInt(data.courses.length)-1;
        res.render("studyquestionend2.ejs", data);

    } else if (parseInt(req.params.zero) == (parseInt(data.courses.length)-1)) {
        data.currentquestion = data.courses[req.params.zero].quest
        data.currentanswer = data.courses[req.params.zero].answer
        data.currentid = data.courses[req.params.zero].id
        data.currenttopic = data.courses[req.params.zero].topic
        data.zero = parseInt(req.params.zero);
        data.reverse = parseInt(req.params.zero)-1;
        data.size = data.courses.length;
        res.render("studyquestionend.ejs", data);
    } else if (req.params.zero == 0) {
        data.currentquestion = data.courses[req.params.zero].quest
        data.currentanswer = data.courses[req.params.zero].answer
        data.currentid = data.courses[req.params.zero].id
        data.currenttopic = data.courses[req.params.zero].topic
        data.size = data.courses.length;
        data.zero = parseInt(req.params.zero)+1;

        res.render("studyquestionpre.ejs", data);
    } else  {
        data.currentquestion = data.courses[req.params.zero].quest
        data.currentanswer = data.courses[req.params.zero].answer
        data.currentid = data.courses[req.params.zero].id
        data.currenttopic = data.courses[req.params.zero].topic
        data.size = data.courses.length;
        data.zero = parseInt(req.params.zero)+1;
        data.reverse = parseInt(req.params.zero)-1;
        res.render("studyquestion.ejs", data);
    }
});

router.get("/addquestion/:id&:topic&:zero&:course&:size", async (req, res) => {
    console.log("addquestion");
    let data = {};
    console.log(req.params.topic);
    data.currenttopic = req.params.topic;
    data.currentcourse = req.params.course;
    data.all = await quiz.fetchtopic(req.params.topic);

    if (data.all[0].course == null) {
        data.all.shift();
    }

    console.log(req.params.course);
    let findIndex = 0;
    
    for (let i = 0; i < data.all.length; i++) {
        if (data.all[i].course == req.params.course) {
            findIndex = i;
        }
    }

    data.all.splice(findIndex, 1);

    console.log(findIndex);

    if (parseInt(req.params.zero) != 0) {
        data.zero = parseInt(req.params.zero)-1;
    } else {
        data.zero = parseInt(req.params.zero);
    }

    res.render("addquestion.ejs", data);
});

router.get("/studyquestion3", (req, res) => {
    res.render("studyquestion3.ejs");
});




router.post("/add2p&:zero&:topic&:course", async (req, res) => {
    let data = {};

    console.log(req.body);
    // console.log(req.body.add_course);
    console.log("lade den till?");
    console.log(req.params.course);
    data.all = await quiz.fetchquestion(req.params.course);
    console.log(data.all.length);
    if (data.all.length == 1 && data.all[0].quest == null) {
        console.log("TOM!");
        await quiz.deleteQuestion(data.all[0].id);
        console.log("removedfirst!");
    }
    console.log("len");
    await quiz.addQuestion(req.body);
    res.redirect("/studyquestion/" + req.body.currentcourse + "&" + req.params.zero);
});

router.get("/add", async (req, res) => {
    let data = {};

    data.all = await quiz.showAll();
    console.log(data.all[0].topic);

    data.all2 = await quiz.fetchcourse(data.all[0].topic);
    console.log(data.all2);

    res.render("add.ejs", data);
});

router.post("/addp", async (req, res) => {
    console.log("test");
    console.log(req.body.add_quest);
    if (req.body.add_quest == "") {
        console.log("No input");
    } else {
        await quiz.addQuestion(req.body);
    }
    res.redirect("/addChange/" + req.body.add_topic);
});

router.get("/addChange/:topic", async (req, res) => {
    let data = {};

    data.all = await quiz.fetchtopic(req.params.topic);
    console.log(data.all);

    data.all2 = await quiz.fetchcourse(data.all[0].topic);
    console.log(data.all2);
    data.seltopic = req.params.topic;

    data.all3 = await quiz.showAll();


    res.render("addChange.ejs", data);
});

router.get("/edit/:id&:zero&:course", async (req, res) => {
    console.log("edit");
    // console.log(req.params.id);
    let data = {};

    // console.log(req.params.question);
    // data.pickedquestion = req.params.question;
    data.courses = await quiz.grabQuestion(req.params.id);
    // console.log(data.courses);
    data.currenttopic = data.courses[0].topic
    data.currentcourse = data.courses[0].course
    data.currentquestion = data.courses[0].quest
    data.currentanswer = data.courses[0].answer
    data.id = req.params.id;
    data.zero = parseInt(req.params.zero)-1;
    data.pickedcourse = req.params.course;

    data.courses = await quiz.fetchquestion(data.pickedcourse);
    console.log("hej");
    console.log(data.courses.length);

    res.render("edit.ejs", data);
});

router.get("/edit2/:id&:zero&:course", async (req, res) => {
    console.log("edit2");
    // console.log(req.params.id);
    let data = {};

    // console.log(req.params.question);
    // data.pickedquestion = req.params.question;
    data.courses = await quiz.grabQuestion(req.params.id);
    // console.log(data.courses);
    data.currenttopic = data.courses[0].topic
    data.currentcourse = data.courses[0].course
    data.currentquestion = data.courses[0].quest
    data.currentanswer = data.courses[0].answer
    data.id = req.params.id;
    data.zero = parseInt(req.params.zero);
    data.pickedcourse = req.params.course;

    data.courses = await quiz.fetchquestion(data.pickedcourse);
    console.log("hej");
    console.log(data.courses.length);

    res.render("edit2.ejs", data);
});

router.post("/editp", async (req, res) => {

    await quiz.editQuestion(req.body);
    let sendTo = "/studyquestion/" + req.body.pickedcourse + "&" + req.body.zero;
    let data = {};

    data.courses = await quiz.fetchquestion(req.body.pickedcourse);
    console.log(data.courses.length);


    res.redirect(sendTo);
});

router.get("/delete/:id&:zero&:course&:size", async (req, res) => {
    console.log("delete");
    let data = {};

    data.courses = await quiz.grabQuestion(req.params.id);
    data.currenttopic = data.courses[0].topic
    data.currentcourse = data.courses[0].course
    data.currentquestion = data.courses[0].quest
    data.currentanswer = data.courses[0].answer
    data.id = req.params.id;
    data.zero = parseInt(req.params.zero);
    data.pickedcourse = req.params.course;
    data.size = req.params.size;

    res.render("delete.ejs", data);
});

router.get("/delete2/:id&:zero&:course&:size", async (req, res) => {
    console.log("delete");
    let data = {};

    data.courses = await quiz.grabQuestion(req.params.id);
    data.currenttopic = data.courses[0].topic
    data.currentcourse = data.courses[0].course
    data.currentquestion = data.courses[0].quest
    data.currentanswer = data.courses[0].answer
    data.id = req.params.id;
    data.zero = parseInt(req.params.zero);
    data.pickedcourse = req.params.course;
    data.size = req.params.size;

    res.render("delete2.ejs", data);
});

router.post("/deletep", async (req, res) => {
    console.log(req.body);
    console.log("removing!");
    console.log(req.body.size);
    if (req.body.question == "") {
        await quiz.deleteQuestion2(req.body.topic);
    } else {
        await quiz.deleteQuestion(req.body.id);
    }

    if (parseInt(req.body.size) == 1) {
        res.redirect("/study");
    } else if (parseInt(req.body.zero) == parseInt(req.body.zero)) {
        console.log("ok");
        let index = parseInt(req.body.zero)-1;
        let sendTo = "/studyquestion/" + req.body.pickedcourse + "&" + index;
        res.redirect(sendTo);
    } else {
        let index = parseInt(req.body.zero)+1;
        let sendTo = "/studyquestion/" + req.body.pickedcourse + "&" + index;
        res.redirect(sendTo);
    }

});




module.exports = router;
