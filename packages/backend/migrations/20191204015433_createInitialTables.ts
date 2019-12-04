import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {

  await knex.schema.createTable('given_names', function(t) {
    t.increments('id');
  });

  await knex.schema.createTable('given_names_spellings', function(t) {
    t.integer('given_name_id')
      .notNullable()
      .references('id').inTable('given_names');

    t.string('spelling', 32).notNullable();

    t.primary(['given_name_id', 'spelling']);
    t.index('given_name_id');
    t.index('spelling');
  });

  await knex.schema.createTable('surnames', function(t) {
    t.increments('id');
  });

  await knex.schema.createTable('surnames_spellings', function(t) {
    t.integer('surname_id')
      .notNullable()
      .references('id').inTable('surnames');

    t.string('spelling', 32).notNullable();

    t.primary(['surname_id', 'spelling']);
    t.index('surname_id');
    t.index('spelling');
  });

  await knex.schema.createTable('full_names', function(t) {
    t.increments('id');
  });

  await knex.schema.createTable('full_names_given_names', function(t) {
    t.integer('full_name_id')
      .notNullable()
      .references('id').inTable('full_names');

    t.integer('given_name_id')
      .notNullable()
      .references('id').inTable('given_names');

    t.integer('ordering')
      .notNullable();

    t.primary(['full_name_id', 'given_name_id', 'ordering']);
    t.index('full_name_id');
    t.index('given_name_id');
  });


  await knex.schema.createTable('full_names_surnames', function(t) {
    t.integer('full_name_id')
      .notNullable()
      .references('id').inTable('full_names');

    t.integer('surname_id')
      .notNullable()
      .references('id').inTable('surnames');

    t.integer('ordering')
      .notNullable();

    t.primary(['full_name_id', 'surname_id', 'ordering']);
    t.index('full_name_id');
    t.index('surname_id');
  });

}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('full_names_surnames');
  await knex.schema.dropTable('full_names_given_names');
  await knex.schema.dropTable('full_names');

  await knex.schema.dropTable('surnames_spellings');
  await knex.schema.dropTable('surnames');

  await knex.schema.dropTable('given_names_spellings');
  await knex.schema.dropTable('given_names');
}
