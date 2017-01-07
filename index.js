/**
 * Created by james on 12/21/16.
 */


var FireClient = require('./FireClient.js');
var person = require('./person.js');


var options ={
    reference : "players"
};

var model ={
    'name':'james',
    'surname':'dube'
};

FireClient.create("test",model).then(function (data) {

        console.log(data);

}).catch(function (error) {
    console.log(error);
});

/*FireClient.create("test",model).then(function (data) {

    data.forEach(function (player) {
        console.log(player.val().name);
    })

}).catch(function (error) {
    console.log(error);
});*/

