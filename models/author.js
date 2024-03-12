var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual property for author's full name
//* Not stored in the database, but calculated on the fly
//* This is an example of OOD of encapsulation. We are encapsulating the logic for computing the full name of the author within the Author model. This is a good practice because it means that if we ever need to change the way we calculate the full name, we only need to change the Author model, and all code that uses the author's full name will automatically use the new method.
AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual property for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  var lifespan_string = '';
  if (this.date_of_birth && this.date_of_death) {
    lifespan_string = (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  }
  if (!this.date_of_death) {
    lifespan_string = '';
  }
  return lifespan_string;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
