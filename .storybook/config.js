import { configure, addParameters } from '@storybook/react'

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module)

export const parameters = {
  backgrounds: {
    default: 'twitter',
    values: [
      {
        name: 'twitter',
        value: '#00aced'
      },
      {
        name: 'facebook',
        value: '#3b5998'
      }
    ]
  }
}

addParameters({
  backgrounds: [
    { name: 'E3 Darker Orange', value: '#F15C29', default: true }
  ]
})
