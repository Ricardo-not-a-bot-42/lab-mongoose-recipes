const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: 'Pizza',
      level: 'Easy Peasy',
      ingredients: ['Dough', 'Cheese'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 120,
      creator: 'Someone',
      created: 2000,
    });
  })
  .then((recipe) => {
    console.log('Recipe was created successfully: ', recipe);
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data);
  })
  .then((recipe) => {
    console.log('Recipes were created successfully: ', recipe);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then((recipe) => {
    console.log('Recipe was updated successfully: ', recipe);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((recipe) => {
    console.log('Recipe was deleted successfully: ', recipe);
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
