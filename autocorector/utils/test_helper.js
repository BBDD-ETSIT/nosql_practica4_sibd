const mongoose = require('mongoose');
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

// Close connection
before( (done) => {
	console.log('--------------------------')
	console.log('--> CONNECTING WITH MONGODB...')

	mongoose.connection
	    .once('open', function() {
	    	console.log('  --> CONNECTED!')
	    	console.log('--------------------------')
	    	done()
	    })
	    .on('error', (error) => {
	        console.warn('  -->ERROR: ',error);
	        console.log('--------------------------')
	        done()
	    });
	mongoose.connect('mongodb://127.0.0.1:27017/bio_test');
});

//Called hooks which runs before something.
beforeEach((done) => {
    mongoose.connection.collections.patients.drop(() => {
        //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    });
});

// Close connection
after((done) => {
	mongoose.connection.close()
	done()
});
