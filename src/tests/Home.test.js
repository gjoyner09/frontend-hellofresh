import React from 'react'
import renderer from 'react-test-renderer'
import { Home } from '../components/Home'

test('Home page renders correctly', () => {
    const component = renderer.create(
        <Home></Home>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})