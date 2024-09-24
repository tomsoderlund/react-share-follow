import React from 'react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links' // linkTo('Button')
// import backgrounds from '@storybook/addon-backgrounds'

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
      title='My short title'
      description='My long description of what this is about'
      labelShare='Share this article'
      labelFollow='Follow me for more cool stuff'
      iconColor='rebeccapurple'
      buttonColor='lightblue'
      share={{
        copy: true,
        email: true,
        sms: true,
        facebook: true,
        linkedin: true,
        pinterest: true,
        reddit: true,
        threads: true,
        twitter: true
      }}
      follow={{
        email: signupEmailFunction,
        web: 'https://www.tomsoderlund.com/',
        instagram: 'tomsoderlund',
        linkedin: 'in/tomsoderlund',
        threads: 'tomsoderlund',
        tiktok: 'tomsoderlund',
        twitter: 'tomsoderlund'
      }}
      onShare={({ message }) => action('onShare')(message, 'success')}
    />
  )
}
