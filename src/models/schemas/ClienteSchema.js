const {Schema} = require('mongoose');

const clienteSchema= new Schema({
    
    idCliente:{
        type:Number,
        require:true
    },
},
{
    timestamps: true
})

module.exports = clienteSchema;