const mongoose = require('mongoose')
const config = require('config-lite')(__dirname);
const mock = require('../mock.json')

console.log(config.mongodb);

// mongodb 连接
mongoose.connect(config.mongodb)

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('open', function () {
    console.log('connect success')
    // initData();
});
db.on('error', function () { console.log('connect error') });


var userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    age: String,
})

var model = {
    // 在此处扩展 model，例如：
    // Article: mongoose.model('Article', articleSchema),
    User: mongoose.model('User', userSchema)
}

var initData = () => {

    model.User.find({}, (err, res) => {
        if (err) log(err)
        if (res) {
            log(modle)
        }
    })
}

module.exports = model
