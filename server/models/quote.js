var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quoteSchema = new Schema({
  status:  String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote
