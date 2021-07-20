import { api } from '../data/index';
import renderer from 'react-test-renderer'
import AllRecipes, { Recipes } from '../components/Recipes';

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    }))
  }
})


test('should fetch all recipes', () => {
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

  return AllRecipes.all().then(data => expect(data).toEqual(recipes));
})

test('Recipes page renders correctly', () => {
  const component = renderer.create(
      <Recipes />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})