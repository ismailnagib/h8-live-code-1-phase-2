var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: String,
  content: String,
  tags: Array,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article
