var path = require("path");
const log4js = require('log4js');

const db_params = {

    username: 'root',
    password: 'op[]op[]',
    host: 'localhost',

    // password: '123456',
    // host: '192.168.92.152',

    //username:'MVPUser',
    //password:'MVP_Laurel_2020',
    //host: '116.228.83.142',

    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 300000,
        idle: 1000000
    },
    dialectoptions: {
        connectTimeout: 60000,
        options: {
            requestTimeout: 300000
        }
    },

    define: {
        timestamps: false
    }
};

/*
 * ��־�ļ���
 * {
  ALL 
  TRACE
  DEBUG
  INFO
  WARN
  ERROR
  FATAL
  MARK
  OFF 
} 
 */

log4js.configure({
    appenders: {
        mvp: {
            type: 'dateFile',
            filename: 'mvpserver',
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            category: 'normal'
        }
    },
    categories: { default: { appenders: ['mvp'], level: 'debug' } }
});

const logger = log4js.getLogger('mvp');

const env = {
    sysDB: {
        database: 'DB_SYSTEM',
        params: db_params
    },
    jobDB: {
        database: 'DB_JOB',
        params: db_params
    },
    datasetDB: {
        database: 'DB_DATASET',
        params: db_params
    },
    winchDB: {
        database: 'DB_WINCH',
        params: db_params
    },
    logger: logger
};

module.exports = env;