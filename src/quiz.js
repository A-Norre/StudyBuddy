"use strict";

const config = require("../config/db/study.json");
const mysql = require("promise-mysql");

async function showAll() {
    const db = await mysql.createConnection(config);
    let sql = `SELECT 
        *
    FROM question GROUP BY topic`;
    let res = await db.query(sql);

    db.end();

    return res;
}

async function fetchtopic(topic) {
    const db = await mysql.createConnection(config);
    //let sql;
    //sql = `
    //    SELECT
    //        *
    //    FROM produkt WHERE produktid = ?;
    //    `;
    //let res = await db.query(sql, [produktid]);
    console.log(topic);
    let sql = `CALL fetch_topic('${topic}')`;
    let res = await db.query(sql);

    //console.log(res);
    return res[0];
}

async function fetchcourse(course) {
    const db = await mysql.createConnection(config);
    //let sql;
    //sql = `
    //    SELECT
    //        *
    //    FROM produkt WHERE produktid = ?;
    //    `;
    //let res = await db.query(sql, [produktid]);
    console.log(course);
    let sql = `CALL fetch_course('${course}')`;
    let res = await db.query(sql);

    //console.log(res);
    return res[0];
}

async function fetchquestion(course) {
    const db = await mysql.createConnection(config);
    //let sql;
    //sql = `
    //    SELECT
    //        *
    //    FROM produkt WHERE produktid = ?;
    //    `;
    //let res = await db.query(sql, [produktid]);
    console.log(course);
    let sql = `CALL fetch_question('${course}')`;
    let res = await db.query(sql);

    //console.log(res);
    return res[0];
}

async function addQuestion(data) {
    const db = await mysql.createConnection(config);
    let sql = `CALL add_question(?,?,?,?)`;
    let res = await db.query(sql, Object.values(data));

    //console.log(res);
    db.end();

    return res;
}

async function addTopic(data) {
    const db = await mysql.createConnection(config);
    let sql = `CALL add_topic(?)`;
    let res = await db.query(sql, Object.values(data));

    db.end();

    return res;
}

async function addCourse(data) {
    const db = await mysql.createConnection(config);
    let sql = `CALL add_course(?,?)`;
    let res = await db.query(sql, Object.values(data));

    db.end();

    return res;
}

async function grabQuestion(id) {
    const db = await mysql.createConnection(config);
    //let sql;
    //sql = `
    //    SELECT
    //        *
    //    FROM produkt WHERE produktid = ?;
    //    `;
    //let res = await db.query(sql, [produktid]);
    console.log(id);
    let sql = `CALL grab_question('${id}')`;
    let res = await db.query(sql);

    //console.log(res);
    return res[0];
}

async function editQuestion(data) {
    const db = await mysql.createConnection(config);
    let sql = `CALL edit_question(?,?,?,?,?)`;
    let res = await db.query(sql, Object.values(data));

    //console.log(res);
    db.end();

    return res;
}

async function deleteQuestion(id) {
    const db = await mysql.createConnection(config);
    //let sql;
    //sql = `
    //DELETE FROM produkt WHERE produktid = ?;`;
    let sql = `CALL delete_question(?)`;

    await db.query(sql, id);
    db.end(); //skapa lagrad procedur
}

async function deleteQuestion2(topic) {
    const db = await mysql.createConnection(config);
    //let sql;
    //sql = `
    //DELETE FROM produkt WHERE produktid = ?;`;
    let sql = `CALL delete_question_all(?)`;

    await db.query(sql, topic);
    db.end(); //skapa lagrad procedur
}

module.exports = {
    showAll: showAll,
    fetchtopic: fetchtopic,
    fetchcourse: fetchcourse,
    fetchquestion: fetchquestion,
    addQuestion: addQuestion,
    grabQuestion: grabQuestion,
    editQuestion: editQuestion,
    deleteQuestion: deleteQuestion,
    deleteQuestion2: deleteQuestion2,
    addTopic: addTopic,
    addCourse: addCourse
};
