
var kue = require('../'),
    redis = require("redis");

kue.redis.createClient = function() {
    var client = redis.createClient(6379, '192.168.0.143');
//    client.auth('password');
    return client;
};

// create our job queue

var jobs = kue.createQueue();

// one minute

var email = jobs.create('email', {
    title: 'Test email'
    , to: 'tj@learnboost.com'
    , template: 'renewal-email'
}).every({
        seconds:30
    })
    .priority('high')
    .save();

email.on('promotion', function(){
    console.log('renewal job promoted');
});

email.on('complete', function(){
    console.log('renewal job completed');
});

jobs.promote();

jobs.process('email', function(job, done){
    console.log("Processing:", job.data);
    setTimeout(function(){
        done();
    }, 5000);
});

// start the UI
kue.app.listen(3000);
console.log('UI started on port 3000');