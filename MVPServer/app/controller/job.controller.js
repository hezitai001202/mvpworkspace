const fastcsv = require("fast-csv");
const fs = require("fs");
const export_file = "job-realtime-data.csv";
const ws = fs.createWriteStream(export_file);

const db = require('../config/db.config.js').jobdb;


exports.set_job_run_times = (req, res) => {
    const jobId = req.body.in_JobId;
    const runTimes = req.body.in_RunTimes;

    var execStmt = "CALL sp_setJobRunTimes(:in_JobId, :in_RunTimes)";

    db.query(execStmt,
        { replacements: { in_JobId: jobId, in_RunTimes: runTimes } })
        .then(data => {
            res.send(data);
            console.log("Prepare winch data successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};


exports.set_job_run_times = (req, res) => {
    const jobId = req.body.in_JobId;
    const runTimes = req.body.in_RunTimes;

    var execStmt = "CALL sp_setJobRunTimes(:in_JobId, :in_RunTimes)";

    db.query(execStmt,
        { replacements: { in_JobId: jobId, in_RunTimes: runTimes } })
        .then(data => {
            res.send(data);
            console.log("Prepare winch data successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.add_job = (req, res) => {
    const jobName = req.body.jobName;
    const jobMode = req.body.jobMode;
    const jobDeep = req.body.jobDeep;
    const dropTimes = req.body.dropTimes;
    const intervalTime = req.body.intervalTime;
    const safeDeep = req.body.safeDeep;

    var execStmt = "CALL sp_addJob(:jobName, :jobMode, :jobDeep, :dropTimes, :intervalTimes, :safeDeep)";

    db.query(execStmt, { replacements: { jobName: jobName, jobMode: jobMode, jobDeep: jobDeep, dropTimes: dropTimes, intervalTimes: intervalTimes, safeDeep: safeDeep } })
        .then(data => {
            res.send(data);
            console.log("add job successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};


exports.get_real_data = (req, res) => {
    const startTime = req.query.start_time;
    const limitCount = req.query.limit;
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    if (startTime)
        query_stmt += " where startTime >= $start_time";
    if (limitCount)
        query_stmt += " limit $limit_count"
    db.query(query_stmt, {
        //model: RealTime,
        //mapToModel: false // ������κ�ӳ���ֶΣ��������ﴫ��true
        bind: {
            start_time: startTime,
            limit_count: limitCount
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
            // Each record will now be an instance of Project
        })
};

exports.export_realtime_data = (req, res) => {

    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            const jsonData = JSON.parse(JSON.stringify(real_data));
            console.log("jsonData", jsonData);

            fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function () {
                    console.log("Write to csv successfully!");
                    res.json({ fileName: export_file });
                })
                .pipe(ws);
        })
};



/*
exports.add_job = (req, res) => {
    const jobName = req.body.jobName;
    const jobMode = req.body.jobMode;
    const jobDeep = req.body.jobDeep;
    const dropTimes = req.body.dropTimes;
    const intervalTime = req.body.intervalTime;
    const safeDeep = req.body.safeDeep;

    var execStmt = "CALL sp_addJob(:jobName, :jobMode, :jobDeep, :dropTimes, :intervalTimes, :safeDeep");

    db.query(execStmt, { replacements: { jobName: jobName, jobMode: jobMode, jobDeep: jobDeep, dropTimes: dropTimes, intervalTimes: intervalTimes, safeDeep: safeDeep } })
        .then(data => {
            res.send(data);
            console.log("add job successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.set_job_run_times = (req, res) => {
    const jobId = req.body.in_JobId;
    const runTimes = req.body.in_RunTimes;

    var execStmt = "CALL sp_setJobRunTimes(:in_JobId, :in_RunTimes)";

    db.query(execStmt,
        { replacements: { in_JobId: jobId, in_RunTimes: runTimes } })
        .then(data => {
            res.send(data);
            console.log("Prepare winch data successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.get_real_data = (req, res) => {
    const startTime = req.query.start_time;
    const limitCount = req.query.limit;
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    if (startTime)
        query_stmt += " where startTime >= $start_time";
    if (limitCount)
        query_stmt += " limit $limit_count"
    db.query(query_stmt, {
        //model: RealTime,
        //mapToModel: false // ������κ�ӳ���ֶΣ��������ﴫ��true
        bind: {
            start_time: startTime,
            limit_count: limitCount
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
            // Each record will now be an instance of Project
        })
};

exports.export_realtime_data = (req, res) => {

    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            const jsonData = JSON.parse(JSON.stringify(real_data));
            console.log("jsonData", jsonData);

            fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function () {
                    console.log("Write to csv successfully!");
                    res.json({ fileName: export_file });
                })
                .pipe(ws);
        })
};
*/