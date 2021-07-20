import api from '../data/index';
import axios from 'axios';
import AllRecipes from '../components/Recipes';

jest.mock('axios');


test('should fetch users', () => {
  const recipes = [{
      title: "TestTitle",
      ingredients: "TestIngredients",
      instructions: "TestInstructions",
      nutritional_info: "TestNutritionalInfo",
      classification: "TestClassification"
    }];
  const resp = {data: recipes};
  api.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return AllRecipes.all().then(data => expect(data).toEqual(users));
});