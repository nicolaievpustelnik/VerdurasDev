const {Schema} = require('mongoose');

const clienteSchema= new Schema({
    
    dniCliente:{
        type:Number,
        require:true
    },
},
{
    timestamps: true
})

module.exports = clienteSchema;