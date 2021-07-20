import { api } from '../data/index';
import renderer from 'react-test-renderer'
import AllMenus from '../components/Menus';
import { Menus } from '../components/Menus'

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


test('should fetch all menus', () => {
  const menus = [{
      week: "2021-07-05"
    }];
  const resp = {data: menus};
  api.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return AllMenus.all().then(data => expect(data).toEqual(menus));
})

test('Menus page renders correctly', () => {
    const component = renderer.create(
        <Menus />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})