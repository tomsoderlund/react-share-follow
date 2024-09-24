# React Social Share & Follow

**A beautiful React component for Share and Follow on social networks**

## Example

![Example use of react-share-follow](docs/demo.png)

## Installation

    yarn add react-share-follow  # or: npm install react-share-follow

## Syntax

    import { SocialShareAndFollow } from 'react-share-follow'
    import 'react-share-follow/dist/SocialShareAndFollow.css'
    
    <SocialShareAndFollow
      url='https://www.mysite.com/'
      title='My title'
      description='My description'
      labelShare='Share this article'
      labelFollow='Follow me for more cool stuff'
      iconColor='black'
      buttonColor='lightgray'
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
        email: () => window.prompt('Customize this action to collect email'),
        web: 'https://www.tomsoderlund.com/',
        instagram: 'tomsoderlund',
        linkedin: 'in/tomsoderlund',
        threads: 'tomsoderlund',
        tiktok: 'tomsoderlund',
        twitter: 'tomsoderlund'
      }}
      onShare={({ message }) => window.alert(message)}
    />

## How to build and publish a new NPM package

    yarn publish  # yarn prepare (Babel) will be run automatically
