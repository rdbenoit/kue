
var kue = require('../'),
    redis = require("redis");

kue.redis.createClient = function() {
    var client = redis.createClient(6379, '192.168.0.143');
//    client.auth('password');
    return client;
};

var jobs = kue.createQueue();

jobs.promote();

jobs.process('email', function(job, done){
    console.log("Job:", job.type);
    console.log("Processing:", job.data);
    console.log("Delay:", job._delay);
    setTimeout(function(){
        done();
    }, 5000);
});

// start the UI
kue.app.listen(3000);
console.log('UI started on port 3000');