const {Schema} = require('mongoose');

const clienteSchema= new Schema({
    
    dniCliente:{
        type:Number,
        require:true
    },
    nombreCliente:{
        type:String,
        require:true
    },
},
{
    timestamps: true
})

module.exports = clienteSchema;