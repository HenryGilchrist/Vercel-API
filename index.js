const express = require('express');
const app = express();
const Joi = require('joi');
const cors = require('cors');
const qs = require('qs');



app.use(express.json());
app.use(cors());
app.set("query parser", str => qs.parse(str));

const reviews = [
  {
    id: 1,
    review: "We can't thank Emily enough for her help! She made the process clear, easy, and stress-free. The experience well exceeded our expectations.",
    name: "Carla & Mateo",
    rating: 5,
    userId: -1,
    date: new Date('2025-02-15T09:30:00'),
    policy: "Joint Life Insurance"
  },
  {
    id: 2,
    review: "The process was mostly smooth and the staff were friendly, but the cost was higher than I anticipated. It's not cheap, though I do feel confident about the coverage.",
    name: "George",
    rating: 4,
    userId: -1,
    date: new Date('2025-02-28T14:15:00'),
    policy: "Term Insurance"
  },
  {
    id: 3,
    review: "Rachel made the experience so simple. She was clear, polite, and so helpful in walking me through each step of the process.",
    name: "Les",
    rating: 5,
    userId: -1,
    date: new Date('2025-03-10T11:45:00'),
    policy: "Term Insurance"
  },
  {
    id: 4,
    review: "Overall I'm happy with the policy we agreed to. The staff were nice, but it felt like there was a lot of waiting between steps. Decent service, but room for improvement.",
    name: "Mike",
    rating: 3.5,
    userId: -1,
    date: new Date('2025-03-22T16:20:00'),
    policy: "Term Insurance"
  },
  {
    id: 5,
    review: "We're so happy we chose this company! The team made the experience feel personal and stress-free. They were polite, clear in their explanations, and genuinely helpful when answering our questions.",
    name: "Max & Elena",
    rating: 5,
    userId: -1,
    date: new Date('2025-04-05T10:00:00'),
    policy: "Joint Life Insurance"
  },
  {
    id: 6,
    review: "Excellent service all around! The experience was positive, the process smooth, and everyone I spoke to was polite and informative.",
    name: "Alexandria",
    rating: 5,
    userId: -1,
    date: new Date('2025-04-18T13:30:00'),
    policy: "Term Insurance"
  },
  {
    id: 7,
    review: "I was nervous about getting life insurance, but the staff made the experience reassuring and straightforward. They were professional and polite throughout.",
    name: "Susan",
    rating: 5,
    userId: -1,
    date: new Date('2025-05-02T15:45:00'),
    policy: "Term Insurance"
  },
  {
    id: 8,
    review: "Laila explained everything thoroughly, which was much appreciated. However, the options felt limited for our budget and we ended up paying more than we'd have liked to.",
    name: "Becky & Tom",
    rating: 3.5,
    userId: -1,
    date: new Date('2025-05-14T09:15:00'),
    policy: "Joint Life Insurance"
  },
  {
    id: 9,
    review: "David was professional and easy to work with. He answered all my questions and made sure I understood my options. The only downside was that the policy costs a bit more than I expected, but I feel confident it's the right fit.",
    name: "Samuel",
    rating: 4,
    userId: -1,
    date: new Date('2025-06-07T12:00:00'),
    policy: "Term Insurance"
  },
  {
    id: 10,
    review: "The process was seamless — very clear communication and polite staff who genuinely cared about helping me choose the right policy.",
    name: "Richard",
    rating: 5,
    userId: -1,
    date: new Date('2025-06-28T14:50:00'),
    policy: "Term Insurance"
  },
  {
    id: 11,
    review: "Laila was fantastic to work with. She made everything easy to understand and was always warm and helpful. The only minor issue was a bit of waiting between steps, but otherwise a great service.",
    name: "Rohan & Anika",
    rating: 4.5,
    userId: -1,
    date: new Date('2025-07-15T11:10:00'),
    policy: "Joint Life Insurance"
  },
  {
    id: 12,
    review: "Huge thanks to James for helping me set everything up! He was super helpful, polite, and made the process really clear.",
    name: "Laura",
    rating: 5,
    userId: -1,
    date: new Date('2025-08-03T16:40:00'),
    policy: "Term Insurance"
  },
  {
    id: 13,
    review: "Good overall service and friendly staff, but definitely not cheap. The process dragged out a bit longer than expected, though they were always helpful when I reached out.",
    name: "Asha",
    rating: 4,
    userId: -1,
    date: new Date('2025-08-26T10:25:00'),
    policy: "Term Insurance"
  },
  {
    id: 14,
    review: "I was impressed by how clear the communication was. The process of setting up my policy was smooth, and the team was professional and polite throughout.",
    name: "John",
    rating: 4.5,
    userId: -1,
    date: new Date('2025-09-19T13:15:00'),
    policy: "Term Insurance"
  },
  {
    id: 15,
    review: "I've never had such a good experience arranging insurance! My advisor Laila took the time to explain every step and made sure everything was clear before moving forward. Very helpful and professional!",
    name: "Sylvia",
    rating: 5,
    userId: -1,
    date: new Date('2025-10-11T05:30:00'),
    policy: "Term Insurance"
  },
  {
    id: 16,
    review: "David was wonderful to work with — clear, polite, and quick to respond to all my questions. It did take a bit longer than I thought to finalize everything, but he kept me informed the whole time.",
    name: "Michael",
    rating: 4.5,
    userId: -1,
    date: new Date('2025-10-18T09:50:00'),
    policy: "Term Insurance"
  },
  {
    id: 17,
    review: "The entire team was wonderful. Clear communication, polite, and helpful guidance every step of the way.",
    name: "Lila",
    rating: 5,
    userId: -1,
    date: new Date('2025-10-26T12:45:00'),
    policy: "Term Insurance"
  }
];

const reviewProperties = ["id","review","name","rating","userId","date"];

let reviewIdCounter = 17;

const filterOperations = {
  greaterThan: 'gt',
  lessThan: 'lt',
  greaterThanOrEqual: 'gte',
  lessThanOrEqual: 'lte',
  equal: 'eq'
}

const valueIsNumber = (value) => !isNaN(parseFloat(value));

function valueIsDateString(value) {
    const time = Date.parse(value);
    return !isNaN(time);
}

function createFilterFunctions(filters) {
  const filterFunctions = [];
  
  Object.entries(filters).forEach(([property, operations]) => {
    if (!reviewProperties.includes(property)) {
      throw new Error(`Invalid property name: ${property}`);
    }
    
    Object.entries(operations).forEach(([operator, value]) => {
      if (!Object.values(filterOperations).includes(operator)) {
        console.error("Invalid operator");
        throw new Error(`Invalid operator: ${operator} for property: ${property}`);
      }

      if(!valueIsNumber(value)){
        if(operator != 'eq') throw new Error(`Invalid value of ${value} for ${operator} operation on property ${property}`);
      }

      switch (operator) {
        case 'gt': 
          filterFunctions.push(item => item[property] > parseFloat(value));
          break;
        case 'lt':
          filterFunctions.push(item => item[property] < parseFloat(value));
          break;
        case 'gte':
          if(valueIsDateString(value)){
            filterFunctions.push(item => item[property] >= new Date(value));
          }
          else{
            filterFunctions.push(item => item[property] >= parseFloat(value));
          }
          break;
        case 'lte':
          if(valueIsDateString(value)){
            filterFunctions.push(item => item[property] <= new Date(value));
          }
          else{
            filterFunctions.push(item => item[property] <= parseFloat(value));
          }
          break;
        case 'eq':
          const valueArr = Array.isArray(value) ? value : [value];

          filterFunctions.push(item => {
            return valueArr.some(v => {
              if (valueIsNumber(v) && valueIsNumber(item[property])) {
                return parseFloat(item[property]) === parseFloat(v);
              }

              return String(item[property]).toUpperCase() === String(v).toUpperCase();
            });
          });
          break;
      }
    });
  });
  
  return filterFunctions;
}

function sortResourceAsc(data, propertyName, propertyTypeString){
  if (propertyTypeString) return data.sort((a,b) => a[propertyName].localeCompare(b[propertyName]));
  else return data.sort((a,b) => a[propertyName] - b[propertyName]);
}

function sortResourceDesc(data, propertyName, propertyTypeString){
  if (propertyTypeString) return data.sort((a,b) => b[propertyName].localeCompare(a[propertyName]));
  else return data.sort((a,b) => b[propertyName] - a[propertyName]);
}


app.get('/reviews/count', (req,res) => {
    res.status(200).send({length: reviews.length});
})

app.get('/reviews', (req,res) => {

  let reviewData = [...reviews];

  if(Object.keys(req.query).length == 0){
    return res.status(200).send({success: true, data: reviews, length: reviewData.length});
  }

  const { page, limit, sort, order="desc", filter}  = req.query;
  

  if(filter){

    if(typeof filter !== 'object' && !Array.isArray(filter)){
      return res.status(400).send({success: false, message: "Must provide filter object: filter[property][operation]=value", filter: filter, reviewProperties: reviewProperties, filterOperations: filterOperations});
    }

    try{
      const filterFunctions = createFilterFunctions(filter);
      reviewData = reviewData.filter(item => 
        filterFunctions.every(filterFn => filterFn(item))
      );
    }
    catch(error){
      return res.status(400).send({success: false, message: error.message, filter: filter, reviewProperties: reviewProperties, filterOperations: filterOperations});
    }
  }

  if(sort){
    if(Array.isArray(sort) || sort.length == 0){
      res.status(400).send({success: false, message: "Can only sort by a single property", sort: sort});
    }

    if(reviewProperties.includes(sort)){
      let orderList = ["asc", "desc"];
      let orderChoice = orderList.indexOf(order);
      if(orderChoice == -1){
        return res.status(400).send({success: false, message: "Must provide valid order direction", order: order, orderOptions: orderList});
      }
      else{
        reviewData = orderChoice == 0 ? sortResourceAsc(reviewData, sort) : sortResourceDesc(reviewData, sort);
      }
    }
    else{
      return res.status(400).send({success: false, message: "Must provide valid property to sort by", reviewProperties: reviewProperties});
    }
  }

  if(page == null && limit == null){
    return res.status(200).send({success: true,length: reviewData.length, data: reviewData});
  }

  const pageNum = parseInt(page);
  const pageLimit = parseInt(limit);

  if(Number.isNaN(pageNum) || Number.isNaN(pageLimit)){
    return res.status(400).send({success: false, message: "Page number and limit must be numeric", page: page, limit: limit});
  }

  if(pageNum < 1 || pageLimit < 1){
    return res.status(400).send({success: false, message: "Page number and limit must be greater than 0", page: page, limit: limit});
  }


  const pageStartIndex = (pageNum - 1) * pageLimit;
  
  if(pageStartIndex > reviewData.length - 1){
    return res.status(404).send({success: false, message: `Page ${pageNum} does not exist with page size ${pageLimit}`});
  }

  return res.status(200).send({success: true, length: reviewData.length, data: reviewData.slice(pageStartIndex, pageStartIndex + pageLimit), message: `Returning page ${pageNum} of limit ${pageLimit}`});
})




app.post('/reviews',(req,res) => {
  /*

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
        */
})

 export default app;