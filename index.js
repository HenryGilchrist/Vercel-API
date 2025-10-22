const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const reviews = [
  {
    id: 1,
    review: "We can’t thank Emily enough for her help! She made the process clear, easy, and stress-free. The experience well exceeded our expectations.",
    name: "Carla & Mateo",
    rating: 5
  },
  {
    id: 2,
    review: "The process was mostly smooth and the staff were friendly, but the cost was higher than I anticipated. It’s not cheap, though I do feel confident about the coverage.",
    name: "George",
    rating: 4
  },
  {
    id: 3,
    review: "Rachel made the experience so simple. She was clear, polite, and so helpful in walking me through each step of the process.",
    name: "Les",
    rating: 5
  },
  {
    id: 4,
    review: "Overall I'm happy with the policy we agreed to. The staff were nice, but it felt like there was a lot of waiting between steps. Decent service, but room for improvement.",
    name: "Mike",
    rating: 3.5
  },
  {
    id: 5,
    review: "Laila explained everything thoroughly, which was much appreciated. However, the options felt limited for our budget and we ended up paying more than we'd have liked to.",
    name: "Becky & Tom",
    rating: 3.5
  },
  {
    id: 6,
    review: "Excellent service all around! The experience was positive, the process smooth, and everyone I spoke to was polite and informative.",
    name: "Alexandria",
    rating: 5
  },
  {
    id: 7,
    review: "I was nervous about getting life insurance, but the staff made the experience reassuring and straightforward. They were professional and polite throughout.",
    name: "Susan",
    rating: 5
  },
  {
    id: 8,
    review: "We're so happy we chose this company! The team made the experience feel personal and stress-free. They were polite, clear in their explanations, and genuinely helpful when answering our questions.",
    name: "Max & Elena",
    rating: 5
  },
  {
    id: 9,
    review: "David was professional and easy to work with. He answered all my questions and made sure I understood my options. The only downside was that the policy costs a bit more than I expected, but I feel confident it’s the right fit.",
    name: "Samuel",
    rating: 4
  },
  {
    id: 10,
    review: "The process was seamless — very clear communication and polite staff who genuinely cared about helping me choose the right policy.",
    name: "Richard",
    rating: 5
  },
  {
    id: 11,
    review: "Laila was fantastic to work with. She made everything easy to understand and was always warm and helpful. The only minor issue was a bit of waiting between steps, but otherwise a great service.",
    name: "Rohan & Anika",
    rating: 4.5
  },
  {
    id: 12,
    review: "Huge thanks to James for helping me set everything up! He was super helpful, polite, and made the process really clear.",
    name: "Laura",
    rating: 5
  },
  {
    id: 13,
    review: "Good overall service and friendly staff, but definitely not cheap. The process dragged out a bit longer than expected, though they were always helpful when I reached out.",
    name: "Asha",
    rating: 4
  },
  {
    id: 14,
    review: "I was impressed by how clear the communication was. The process of setting up my policy was smooth, and the team was professional and polite throughout.",
    name: "John",
    rating: 4.5
  },
  {
    id: 15,
    review: "I’ve never had such a good experience arranging insurance! My advisor Laila took the time to explain every step and made sure everything was clear before moving forward. Very helpful and professional!",
    name: "Sylvia",
    rating: 5
  },
  {
    id: 16,
    review: "David was wonderful to work with — clear, polite, and quick to respond to all my questions. It did take a bit longer than I thought to finalize everything, but he kept me informed the whole time.",
    name: "Michael",
    rating: 4.5
  },
  {
    id: 17,
    review: "The entire team was wonderful. Clear communication, polite, and helpful guidance every step of the way.",
    name: "Lila",
    rating: 5
  }
];

app.get('/reviews',(req,res) =>
{
    res.status(200).send(reviews);
});

app.get('/reviews/:groupFiveIndex',(req,res) => {

    const { groupFiveIndex } = req.params;
    
    if(groupFiveIndex * 5 > reviews.length - 1){
        res.status(404).send(`Group is out of range!`);
    }
    else{
        let startIndex = groupFiveIndex * 5;
        res.status(200).send(reviews.slice(startIndex, startIndex + 5));
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
        id: Joi.number().integer().min(1).max(reviews.length).required(),
        number: Joi.number().integer().min(0).max(100).required()
    })

    return schema.validate(body);
}

app.post('/reviews',(req,res) => {

    const { error, value } = validatePostNum(req.body);

    if (!error){
        reviews.push({id: reviews.length+1, number: value.number});
        res.status(200).send(`Number ${value.number} added to database`);
    }
    else{
        res.status(418).send(error);
    }
})

function findEntryIndex(id){
    return reviews.findIndex((e) => e.id == id);
}

app.put('/reviews/:idNum', (req, res) => {
    const { error, value } = validatePushNumObj({id: parseInt(req.params.idNum), number: req.body.number});

    if(!error){
        const entryIndex = findEntryIndex(value.id);
        if (entryIndex == -1) return res.status(404).send(`No Entry of ID ${value.id} exists!`);

        reviews.splice(entryIndex, 1, value);
        res.status(200).send(`Entry ${value.id}'s number has been updated!`);
    }
    else{
        res.status(404).send(error);
    }
})

export default app;