
exports.up = knex => knex.schema.createTable('contato', tb => {
  tb.increments('id')
  tb.string('nome').notNullable()
  tb.string('telefone').notNullable()
  tb.timestamp('nascimento').notNullable()
})

exports.down =function(knex, Promise){
  return knex.schema.dropTable('contato')
}

