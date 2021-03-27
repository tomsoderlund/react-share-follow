import React from 'react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links' // linkTo('Button')
import backgrounds from '@storybook/addon-backgrounds'

import SocialShareAndFollow from '../src/SocialShareAndFollow'
import '../src/SocialShareAndFollow.css'
import '../src/common.css'

const signupEmailFunction = () => {
  window.prompt('Enter your email address:')
}

// ----- Story -----

export default {
  title: 'SocialShareAndFollow'
}

export const noProps = () => {
  return (
    <SocialShareAndFollow />
  )
}

export const normalUse = () => {
  return (
    <SocialShareAndFollow
      title='My title'
      description='My description'
      labelShare='Share this article'
      labelFollow='Follow me for more cool stuff'
      iconColor='darkturquoise'
      share={{
        copy: true,
        email: true,
        sms: false,
        facebook: true,
        twitter: true,
        reddit: false,
        pinterest: true,
        linkedin: true
      }}
      follow={{
        email: signupEmailFunction,
        web: 'https://www.tomsoderlund.com/',
        twitter: 'tomsoderlund',
        instagram: 'tomsoderlund',
        linkedin: 'in/tomsoderlund'
      }}
      onShare={({ message }) => action('onShare')(message, 'success')}
    />
  )
}
