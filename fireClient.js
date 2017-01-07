
/**
 * Created by james on 12/1/16.
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD9HVSEGiY2Ev_oeBRYXh45aUA74zmOEJQ",
    authDomain: "highlanders-fc.firebaseapp.com",
    databaseURL: "https://highlanders-fc.firebaseio.com",
    storageBucket: "highlanders-fc.appspot.com",
};
firebase.initializeApp(config);
console.log('FireClient v0.0.1');
var FireClient = {

    rootRef :  "root reference",
    db : firebase.database().ref(),

    dataCallback: {
        onValue: function(data){
            console.log('on value event',data.val());
        },
        onChildAdded: function(){
            console.log('on child added event');
        }
    },

    /**
     * Create a new Model at the stated Reference
     *
     * @param reference
     * @param model
     */

    create : function (reference,model){

        if(reference != null && model != null){
            try{
                var newKey = firebase.database().ref(reference).push().key;
                var newRef = firebase.database().ref(reference + '/' + newKey);
                newRef.set(model);
            }catch(e){
                 console.log('an error occured whislt setting the model',e);
            }
            
        }
        else{
            console.log('reference or model not set');
        }


    },

    /**
     * Set a new Model at the stated Reference, a new key is not created here
     *
     * @param reference
     * @param model
     */

     set(reference, model){
        if(reference != null && model != null){
            firebase.database().ref(reference).set(model);
        }
        else{
            console.log('reference or model not set');
        }
     },

    /**
     *Find a specified Model/Reference
     *
     * @param options
     */

    find : function (options){
    	//instance
    	mFireClient = this;

        //set the default options
        options.event = options.event || 'value';
        options.id = options.id || '';

        if(options.reference != null){
            try{
            var myRef = firebase.database().ref(options.reference + options.id);

            //check for queries

            // console.log('where clause =>',options.where);
            var where = options.where;

            for (var key in where)
            { if (!where.hasOwnProperty(key))
            { continue; }
                // console.log(key + ' -> ' +  where[key]);
                myRef = myRef.orderByChild(key).equalTo(where[key])
            }




            myRef.on(options.event,function(snapshot){
                if (typeof options.then === "function") { 
                       // safe to use the function
                       options.then(snapshot);
                    }

            });
        }
        catch(e){
            console.log('error -> ',e)
        }

        }
        else{
            console.log('options { reference,id,dataCallback } must be set');
        }
    },

    update: function (reference,model){

        if(reference != null && model != null){

            if(model === 'array'){
                console.log('its an array');
                firebase.database().ref(reference).set(model);
            }
            else{
                newKey = firebase.database().ref(reference).update(model);
            }
            
        }
        else{
            console.log('reference or model not set');
        }
    },

    remove: function(reference){

        if(reference != null ){

            var myRef = firebase.database().ref(reference);

            myRef.remove()

        }
        else{
            console.log('options { reference } must be set');
        }
    },
    /**
    * Image Upload
    */
    uploadFile: function (options,file) {
            that = this;
            var storageRef = firebase.storage().ref();
            var file = options.file;

            var metadata = {
                'contentType': file.type
            };

            // Push to child path.
            // [START oncomplete]
            storageRef.child(options.reference +'/'+ file.name).put(file, metadata).then(function (snapshot) {
                var url = snapshot.metadata.downloadURLs[0];
                options.then(url);
            }).catch(function (error) {
                console.error('Upload failed:', error);
            });
        },
    then:function(data){
    	console.log('then')
    	return this;
    }




};