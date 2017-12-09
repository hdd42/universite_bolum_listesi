const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');

// Initialize knex connection.
const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: 'yokOkulListe.db'
  }
});

// Give the connection to objection.
Model.knex(knex);



// Create database schema. You should use knex migration files to do this. We
// create it here for simplicity.
const okulSchema = knex.schema.createTableIfNotExists('Okullar', table => {
  table.increments('id').primary();
  table.integer('kod');
  table.string('url');
  table.string('isim');
});

const bolumSchema = knex.schema.createTableIfNotExists('Bolumler', table => {
    table.increments('id').primary();
    table.string('isim');
    table.string('fakulte');
    table.string('url');
    table.string('tur');
    table.string('puanTuru');
    table.integer('kod');
    table.integer('okulKod');
  });
  

// Person model.
class Bolum extends Model {
  static get tableName() {
    return 'Bolumler';
  }


}

class Okul extends Model {
    static get tableName() {
      return 'Okullar';
    }

  }

  okulSchema
  .then(() => bolumSchema)
  .then(() => console.log("tablolar..."))

module.exports.Okul = Okul;
module.exports.Bolum = Bolum;