const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const numberData = [{id: 1, number: 45}];

app.get('/number',(req,res) =>
{
    res.status(200).send(numberData);
});

app.get('/number/:id',(req,res) => {

    const { id } = req.params;
    
    if(id > numberData.length){
        res.status(404).send(`Entry ${id} doesn't exist!`);
    }
    else{
        res.status(200).send(numberData[id - 1]);
    }
})

// Joi Schema's

function validatePostNum(body){
    const schema = Joi.object({
        number: Joi.number().integer().min(0).max(100).required()
    })

    return schema.validate(body);
}

function validatePushNumObj(body){
    const schema = Joi.object({
        id: Joi.number().integer().min(1).max(numberData.length).required(),
        number: Joi.number().integer().min(0).max(100).required()
    })

    return schema.validate(body);
}

app.post('/number',(req,res) => {

    const { error, value } = validatePostNum(req.body);

    if (!error){
        numberData.push({id: numberData.length+1, number: value.number});
        res.status(200).send(`Number ${value.number} added to database`);
    }
    else{
        res.status(418).send(error);
    }
})

function findEntryIndex(id){
    return numberData.findIndex((e) => e.id == id);
}

app.put('/number/:idNum', (req, res) => {
    const { error, value } = validatePushNumObj({id: parseInt(req.params.idNum), number: req.body.number});

    if(!error){
        const entryIndex = findEntryIndex(value.id);
        if (entryIndex == -1) return res.status(404).send(`No Entry of ID ${value.id} exists!`);

        numberData.splice(entryIndex, 1, value);
        res.status(200).send(`Entry ${value.id}'s number has been updated!`);
    }
    else{
        res.status(404).send(error);
    }
})

export default app;