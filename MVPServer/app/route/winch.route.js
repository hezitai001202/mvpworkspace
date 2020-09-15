module.exports = app => {
    const winch_ctl = require("../controller/winch.controller");

    var router = require("express").Router();
    router.get("/init", winch_ctl.init_winch);
    router.get("/prepare", winch_ctl.data_prepare);
    router.get("/get_realdata", winch_ctl.get_real_data);
    router.get("/export_realdata", winch_ctl.export_realtime_data);

    //router.post("/export", realtime_ctl.exportRealtimeData);
    app.use('/api/winch', router);
};
