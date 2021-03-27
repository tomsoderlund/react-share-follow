import React from 'react'

const SocialShareAndFollow = ({
  url,
  title,
  description,
  hashtags,

  labelShare = 'Share',
  labelFollow = 'Follow',

  share = {
    copy: true,
    email: true,
    sms: false,
    facebook: true,
    twitter: true,
    reddit: false,
    pinterest: false,
    linkedin: true
  },

  follow = {},

  onShare,
  onFollow
}) => {
  const handleShare = (service) => {
    const sharedUrl = services[service].shareUrl(url || window.location.href, { title, description, onShare })
    sharedUrl !== false && window.open(sharedUrl, '_blank')
  }

  const handleFollow = (service, username) => {
    const followedUrl = services[service].followUrl(username, { title, description, onFollow })
    followedUrl !== false && window.open(followedUrl, '_blank')
  }

  return (
    <div className='social-share-and-follow'>
      <div className='button-row share'>
        <span><ShareIcon /></span>
        {labelShare && <span>{labelShare}:</span>}
        {Object.keys(services)
          .filter(serviceId => share[serviceId] && services[serviceId].shareUrl)
          .map(serviceId => (
            <IconButton
              key={serviceId}
              title={serviceId}
              onClick={e => handleShare(serviceId)}
            >
              {services[serviceId].icon || serviceId}
            </IconButton>
          ))}
      </div>

      <div className='button-row follow'>
        <span><FollowIcon /></span>
        {labelFollow && <span>{labelFollow}:</span>}
        {Object.keys(services)
          .filter(serviceId => follow[serviceId] && services[serviceId].followUrl)
          .map(serviceId => (
            <IconButton
              key={serviceId}
              title={serviceId}
              onClick={e => handleFollow(serviceId, follow[serviceId])}
            >
              {services[serviceId].icon || serviceId}
            </IconButton>
          ))}
      </div>

    </div>
  )
}
export default SocialShareAndFollow

const services = {
  copy: {
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path fill-rule='evenodd' clip-rule='evenodd' d='M7.33633 2.03348L7.99917 1.37064C8.87901 0.492918 10.0711 0 11.3138 0C12.5566 0 13.7487 0.492918 14.6285 1.37064C15.5058 2.25072 15.9984 3.44267 15.9984 4.6853C15.9984 5.92793 15.5058 7.11989 14.6285 7.99997L12.639 9.98849C11.7549 10.8735 10.5774 11.362 9.32485 11.362C8.0723 11.362 6.89475 10.8735 6.01065 9.98849L5.34781 9.32565L6.67349 7.99997L7.33633 8.66281C8.39856 9.72504 10.2511 9.72504 11.3134 8.66281L13.3028 6.67429C13.8292 6.1462 14.1249 5.43096 14.1249 4.6853C14.1249 3.93965 13.8292 3.2244 13.3028 2.69631C12.7745 2.17035 12.0593 1.87506 11.3138 1.87506C10.5683 1.87506 9.85318 2.17035 9.32485 2.69631L8.66201 3.35915L7.33633 2.03348ZM9.32487 7.99998L8.66203 7.33714C7.5998 6.27491 5.74723 6.27491 4.685 7.33714L2.69554 9.32565C2.16912 9.85374 1.87351 10.569 1.87351 11.3146C1.87351 12.0603 2.16912 12.7755 2.69554 13.3036C3.22387 13.8296 3.93903 14.1249 4.68453 14.1249C5.43003 14.1249 6.14518 13.8296 6.67352 13.3036L7.33635 12.6408L8.66203 13.9665L7.99919 14.6293C7.56421 15.065 7.0474 15.4104 6.47846 15.6456C5.90953 15.8808 5.2997 16.0013 4.68406 16C4.06858 16.0011 3.45895 15.8806 2.89019 15.6453C2.32143 15.4101 1.80476 15.0648 1.36986 14.6293C0.492603 13.7492 0 12.5573 0 11.3146C0 10.072 0.492603 8.88006 1.36986 7.99998L3.35932 6.01146C4.24342 5.12642 5.42096 4.63796 6.67352 4.63796C7.92607 4.63796 9.10361 5.12642 9.98771 6.01146L10.6506 6.6743L9.32487 7.99998Z' fill='black' />
      </svg>
    ),
    shareUrl: (url, { onShare }) => {
      window.navigator.clipboard && window.navigator.clipboard.writeText(url)
      if (onShare) onShare({ message: 'Link copied to clipboard' })
      return false
    }
  },
  email: {
    icon: (
      <svg width='21' height='16' viewBox='0 0 21 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M17.9984 0H3.99835C3.2027 0 2.43964 0.316071 1.87703 0.87868C1.31442 1.44129 0.998352 2.20435 0.998352 3V13C0.998352 13.7956 1.31442 14.5587 1.87703 15.1213C2.43964 15.6839 3.2027 16 3.99835 16H17.9984C18.794 16 19.5571 15.6839 20.1197 15.1213C20.6823 14.5587 20.9984 13.7956 20.9984 13V3C20.9984 2.20435 20.6823 1.44129 20.1197 0.87868C19.5571 0.316071 18.794 0 17.9984 0ZM17.3284 2L10.9984 6.75L4.66835 2H17.3284ZM17.9984 14H3.99835C3.73314 14 3.47878 13.8946 3.29125 13.7071C3.10371 13.5196 2.99835 13.2652 2.99835 13V3.25L10.3984 8.8C10.5714 8.92982 10.782 9 10.9984 9C11.2147 9 11.4253 8.92982 11.5984 8.8L18.9984 3.25V13C18.9984 13.2652 18.893 13.5196 18.7055 13.7071C18.5179 13.8946 18.2636 14 17.9984 14Z' fill='black' />
      </svg>
    ),
    shareUrl: (url, { title, description } = {}) => 'mailto:' + queryObjectToString({ subject: title, body: description ? description + ' → ' + url : url }),
    followUrl: (emailFunction) => {
      emailFunction && emailFunction()
      return false
    }
  },
  sms: {
    icon: (
      <svg width='19' height='16' viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path fill-rule='evenodd' clip-rule='evenodd' d='M18.1436 7.50103C18.1436 11.6437 14.3052 15.0021 9.57096 15.0021C8.7219 15.0032 7.87635 14.893 7.05597 14.6742C6.43017 14.9913 4.99319 15.6 2.57571 15.9965C2.3614 16.0308 2.19852 15.8079 2.28317 15.6086C2.66251 14.7127 3.00541 13.519 3.10828 12.4303C1.7956 11.1122 0.998352 9.387 0.998352 7.50103C0.998352 3.35832 4.83674 0 9.57096 0C14.3052 0 18.1436 3.35832 18.1436 7.50103ZM6.35623 7.50103C6.35623 7.78523 6.24333 8.05779 6.04237 8.25875C5.84141 8.45971 5.56885 8.57261 5.28465 8.57261C5.00045 8.57261 4.7279 8.45971 4.52694 8.25875C4.32598 8.05779 4.21308 7.78523 4.21308 7.50103C4.21308 7.21683 4.32598 6.94427 4.52694 6.74331C4.7279 6.54235 5.00045 6.42945 5.28465 6.42945C5.56885 6.42945 5.84141 6.54235 6.04237 6.74331C6.24333 6.94427 6.35623 7.21683 6.35623 7.50103ZM10.6425 7.50103C10.6425 7.78523 10.5296 8.05779 10.3287 8.25875C10.1277 8.45971 9.85516 8.57261 9.57096 8.57261C9.28676 8.57261 9.0142 8.45971 8.81324 8.25875C8.61228 8.05779 8.49938 7.78523 8.49938 7.50103C8.49938 7.21683 8.61228 6.94427 8.81324 6.74331C9.0142 6.54235 9.28676 6.42945 9.57096 6.42945C9.85516 6.42945 10.1277 6.54235 10.3287 6.74331C10.5296 6.94427 10.6425 7.21683 10.6425 7.50103ZM13.8573 8.57261C14.1415 8.57261 14.414 8.45971 14.615 8.25875C14.8159 8.05779 14.9288 7.78523 14.9288 7.50103C14.9288 7.21683 14.8159 6.94427 14.615 6.74331C14.414 6.54235 14.1415 6.42945 13.8573 6.42945C13.5731 6.42945 13.3005 6.54235 13.0995 6.74331C12.8986 6.94427 12.7857 7.21683 12.7857 7.50103C12.7857 7.78523 12.8986 8.05779 13.0995 8.25875C13.3005 8.45971 13.5731 8.57261 13.8573 8.57261Z' fill='black' />
      </svg>
    ),
    shareUrl: (url, { title, description } = {}) => 'sms:number' + queryObjectToString({ body: title ? title + ' → ' + url : url })
  },
  twitter: {
    icon: (
      <svg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M19.8382 1.9006C19.114 2.21303 18.3258 2.43788 17.514 2.52545C18.3568 2.02471 18.988 1.23362 19.2891 0.300601C18.4982 0.771108 17.6317 1.10104 16.7282 1.27575C16.3505 0.872024 15.8938 0.5504 15.3864 0.330915C14.879 0.11143 14.3319 -0.00121132 13.779 9.82343e-06C11.5424 9.82343e-06 9.74355 1.81303 9.74355 4.03788C9.74355 4.3503 9.78142 4.66273 9.84296 4.96332C6.49385 4.78817 3.50687 3.18817 1.52107 0.738471C1.15924 1.3565 0.969622 2.06019 0.971956 2.77634C0.971956 4.17752 1.68438 5.41302 2.77077 6.13965C2.13055 6.11444 1.50531 5.93846 0.945921 5.62604V5.67575C0.945921 7.63787 2.3329 9.26391 4.18142 9.63787C3.83434 9.72803 3.4773 9.77415 3.1187 9.77515C2.85598 9.77515 2.60746 9.74912 2.35657 9.71361C2.86781 11.3136 4.35657 12.4757 6.12935 12.5136C4.74237 13.6 3.00509 14.2391 1.1187 14.2391C0.780241 14.2391 0.467815 14.2272 0.143555 14.1894C1.9329 15.3373 4.05598 16 6.34237 16C13.7648 16 17.8264 9.85089 17.8264 4.51362C17.8264 4.33847 17.8264 4.16332 17.8145 3.98817C18.6003 3.41303 19.2891 2.7006 19.8382 1.9006Z' fill='black' />
      </svg>
    ),
    // url, text, hashtags, via, related
    shareUrl: (url, { title, description, hashtags } = {}) => 'https://twitter.com/share' + queryObjectToString({ url, text: title, hashtags: (hashtags && hashtags.length > 0) ? hashtags.join(',') : undefined }),
    followUrl: (username) => `https://twitter.com/${username}`
  },
  facebook: {
    icon: (
      <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M16.1983 0H1.47826C1.12426 0 0.838257 0.286 0.838257 0.64V15.36C0.838257 15.714 1.12426 16 1.47826 16H16.1983C16.5523 16 16.8383 15.714 16.8383 15.36V0.64C16.8383 0.286 16.5523 0 16.1983 0ZM14.3503 4.67H13.0723C12.0703 4.67 11.8763 5.146 11.8763 5.846V7.388H14.2683L13.9563 9.802H11.8763V16H9.38226V9.804H7.29626V7.388H9.38226V5.608C9.38226 3.542 10.6443 2.416 12.4883 2.416C13.3723 2.416 14.1303 2.482 14.3523 2.512V4.67H14.3503Z' fill='black' />
      </svg>
    ),
    shareUrl: (url, { title, description, hashtags } = {}) => 'https://www.facebook.com/sharer/sharer.php' + queryObjectToString({ u: url, quote: title, hashtag: (hashtags && hashtags.length > 0) ? hashtags[0] : undefined }),
    followUrl: (username) => `https://www.facebook.com/${username}`
  },
  instagram: {
    icon: (
      <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M8.89259 3.89523C6.62106 3.89523 4.78782 5.72847 4.78782 8C4.78782 10.2715 6.62106 12.1048 8.89259 12.1048C11.1641 12.1048 12.9974 10.2715 12.9974 8C12.9974 5.72847 11.1641 3.89523 8.89259 3.89523ZM8.89259 10.6678C7.4236 10.6678 6.22479 9.46899 6.22479 8C6.22479 6.53101 7.4236 5.3322 8.89259 5.3322C10.3616 5.3322 11.5604 6.53101 11.5604 8C11.5604 9.46899 10.3616 10.6678 8.89259 10.6678ZM13.1655 2.77047C12.6351 2.77047 12.2068 3.19876 12.2068 3.72911C12.2068 4.25947 12.6351 4.68776 13.1655 4.68776C13.6958 4.68776 14.1241 4.26147 14.1241 3.72911C14.1243 3.60318 14.0996 3.47845 14.0515 3.36207C14.0034 3.24569 13.9327 3.13995 13.8437 3.0509C13.7546 2.96185 13.6489 2.89124 13.5325 2.84312C13.4161 2.795 13.2914 2.77031 13.1655 2.77047ZM16.894 8C16.894 6.89525 16.904 5.80051 16.842 4.69777C16.7799 3.4169 16.4877 2.28014 15.5511 1.3435C14.6125 0.404868 13.4777 0.114672 12.1968 0.0526304C11.0921 -0.0094115 9.99734 0.000595291 8.89459 0.000595291C7.78985 0.000595291 6.69511 -0.0094115 5.59236 0.0526304C4.3115 0.114672 3.17473 0.40687 2.23809 1.3435C1.29946 2.28214 1.00926 3.4169 0.947223 4.69777C0.885181 5.80252 0.895188 6.89725 0.895188 8C0.895188 9.10275 0.885181 10.1995 0.947223 11.3022C1.00926 12.5831 1.30146 13.7199 2.23809 14.6565C3.17673 15.5951 4.3115 15.8853 5.59236 15.9474C6.69711 16.0094 7.79185 15.9994 8.89459 15.9994C9.99934 15.9994 11.0941 16.0094 12.1968 15.9474C13.4777 15.8853 14.6145 15.5931 15.5511 14.6565C16.4897 13.7179 16.7799 12.5831 16.842 11.3022C16.906 10.1995 16.894 9.10475 16.894 8ZM15.1328 12.7192C14.9867 13.0834 14.8106 13.3556 14.5284 13.6358C14.2462 13.918 13.976 14.0941 13.6118 14.2402C12.5591 14.6585 10.0594 14.5644 8.89259 14.5644C7.7258 14.5644 5.22411 14.6585 4.1714 14.2422C3.80716 14.0961 3.53497 13.92 3.25478 13.6378C2.97259 13.3556 2.79647 13.0854 2.65037 12.7212C2.23409 11.6665 2.32816 9.16679 2.32816 8C2.32816 6.83321 2.23409 4.33152 2.65037 3.27881C2.79647 2.91456 2.97259 2.64238 3.25478 2.36219C3.53697 2.082 3.80716 1.90388 4.1714 1.75778C5.22411 1.3415 7.7258 1.43556 8.89259 1.43556C10.0594 1.43556 12.5611 1.3415 13.6138 1.75778C13.978 1.90388 14.2502 2.08 14.5304 2.36219C14.8126 2.64438 14.9887 2.91456 15.1348 3.27881C15.5511 4.33152 15.457 6.83321 15.457 8C15.457 9.16679 15.5511 11.6665 15.1328 12.7192Z' fill='black' />
      </svg>
    ),
    followUrl: (username) => `https://www.instagram.com/${username}/`
  },
  pinterest: {
    icon: (
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M7.9996 0C3.581 0 0 3.5818 0 7.9996C0 11.3884 2.1084 14.2856 5.08483 15.4515C5.01436 14.8189 4.9519 13.8451 5.11205 13.1549C5.25779 12.5303 6.05055 9.17832 6.05055 9.17832C6.05055 9.17832 5.81112 8.69866 5.81112 7.98999C5.81112 6.87853 6.45573 6.04814 7.25889 6.04814C7.94194 6.04814 8.27106 6.56063 8.27106 7.17481C8.27106 7.86187 7.83384 8.88764 7.60883 9.83894C7.42065 10.6349 8.00841 11.2843 8.79315 11.2843C10.2145 11.2843 11.3083 9.78529 11.3083 7.62084C11.3083 5.70542 9.93183 4.36655 7.96677 4.36655C5.6902 4.36655 4.35373 6.07377 4.35373 7.83784C4.35373 8.5249 4.61879 9.2624 4.9495 9.66358C4.9776 9.69379 4.99745 9.73074 5.00713 9.77085C5.01681 9.81096 5.01599 9.85289 5.00475 9.8926C4.9439 10.1448 4.80857 10.6886 4.78294 10.7999C4.74771 10.9464 4.66683 10.9776 4.51469 10.9072C3.51614 10.4419 2.89155 8.98133 2.89155 7.80741C2.89155 5.28422 4.72449 2.96682 8.17737 2.96682C10.9528 2.96682 13.1093 4.9439 13.1093 7.58721C13.1093 10.345 11.3708 12.5623 8.95811 12.5623C8.14694 12.5623 7.38541 12.1419 7.12437 11.6447L6.62549 13.5457C6.44532 14.2407 5.95766 15.112 5.63175 15.6437C6.39897 15.8805 7.19745 16.0006 8.0004 16C12.4182 16 16 12.4182 16 8.0004C16 3.5826 12.4174 0 7.9996 0Z' fill='black' />
      </svg>
    ),
    // url, media, description
    shareUrl: (url, { title, description } = {}) => 'https://pinterest.com/pin/create/button/' + queryObjectToString({ url, description }),
    followUrl: (username) => `https://www.pinterest.com/${username}`
  },
  reddit: {
    icon: (
      <svg width='19' height='16' viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.0563 8.11268C18.0563 6.98592 17.1549 6.08451 16.0282 6.19718C15.5775 6.19718 15.0141 6.42253 14.6761 6.76056C13.0986 5.74648 11.2958 5.07042 9.38028 5.07042L10.2817 0.788732L13.2113 1.46479C13.2113 2.25352 13.8873 2.8169 14.6761 2.8169C15.4648 2.8169 16.0282 2.14084 16.0282 1.35211C16.0282 0.56338 15.3521 0 14.5634 0C14 0 13.5493 0.338028 13.3239 0.788732L10.169 0H9.94366C9.83099 0 9.83099 0.112676 9.83099 0.225352L8.70423 5.07042C6.78873 5.07042 4.98592 5.6338 3.40845 6.76056C2.61972 5.97183 1.38028 5.97183 0.591549 6.76056C-0.197183 7.54929 -0.197183 8.78873 0.591549 9.57746C0.704225 9.69014 0.929577 9.91549 1.15493 9.91549V10.4789C1.15493 13.5211 4.64789 16 9.04225 16C13.4366 16 16.9296 13.5211 16.9296 10.4789V9.91549C17.6056 9.57746 18.0563 8.90141 18.0563 8.11268V8.11268ZM4.53521 9.57746C4.53521 8.78873 5.21127 8.22535 5.88732 8.22535C6.67606 8.22535 7.23944 8.90141 7.23944 9.57746C7.23944 10.2535 6.56338 10.9296 5.88732 10.9296C5.09859 10.9296 4.53521 10.3662 4.53521 9.57746ZM12.4225 13.2958C11.4085 13.9718 10.2817 14.4225 9.04225 14.3099C7.80282 14.3099 6.67606 13.9718 5.66197 13.2958C5.5493 13.1831 5.5493 12.9577 5.66197 12.7324C5.77465 12.6197 6 12.6197 6.11268 12.7324C6.90141 13.2958 7.91549 13.6338 8.92958 13.5211C9.94366 13.6338 10.9577 13.2958 11.7465 12.7324C11.8592 12.6197 12.0845 12.6197 12.3099 12.7324C12.5352 12.8451 12.5352 13.0704 12.4225 13.2958ZM12.0845 10.9296C11.2958 10.9296 10.7324 10.2535 10.7324 9.57746C10.7324 8.90141 11.4085 8.22535 12.0845 8.22535C12.8732 8.22535 13.4366 8.90141 13.4366 9.57746C13.5493 10.3662 12.8732 10.9296 12.0845 10.9296Z' fill='black' />
      </svg>
    ),
    shareUrl: (url, { title } = {}) => 'https://www.reddit.com/submit' + queryObjectToString({ url, title })
  },
  linkedin: {
    icon: (
      <svg width='16' height='16' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M19.665 0H1.26497C0.822466 0 0.464966 0.3575 0.464966 0.8V19.2C0.464966 19.6425 0.822466 20 1.26497 20H19.665C20.1075 20 20.465 19.6425 20.465 19.2V0.8C20.465 0.3575 20.1075 0 19.665 0ZM6.39747 17.0425H3.42997V7.4975H6.39747V17.0425ZM4.91497 6.1925C4.57478 6.1925 4.24224 6.09162 3.95938 5.90263C3.67653 5.71363 3.45608 5.445 3.32589 5.13072C3.19571 4.81643 3.16165 4.47059 3.22802 4.13694C3.29438 3.8033 3.4582 3.49682 3.69874 3.25628C3.93929 3.01573 4.24576 2.85192 4.57941 2.78555C4.91306 2.71918 5.25889 2.75324 5.57318 2.88343C5.88747 3.01361 6.1561 3.23407 6.34509 3.51692C6.53409 3.79977 6.63497 4.13232 6.63497 4.4725C6.63247 5.4225 5.86247 6.1925 4.91497 6.1925ZM17.5075 17.0425H14.5425V12.4C14.5425 11.2925 14.5225 9.87 13 9.87C11.4575 9.87 11.22 11.075 11.22 12.32V17.0425H8.25747V7.4975H11.1025V8.8025H11.1425C11.5375 8.0525 12.505 7.26 13.95 7.26C16.955 7.26 17.5075 9.2375 17.5075 11.8075V17.0425Z' fill='black' />
      </svg>
    ),
    // title, summary, source, mini
    shareUrl: (url, { title, description } = {}) => 'https://linkedin.com/shareArticle/' + queryObjectToString({ url, title }),
    followUrl: (username) => `https://www.linkedin.com/${username.includes('/') ? username : `company/${username}`}`
  }
}

const IconButton = ({ children, ...props }) => (
  <button className='icon-button' {...props}>
    {children}
  </button>
)

const queryObjectToString = queryObject => Object.keys(queryObject).reduce((result, key) => (queryObject[key] === undefined) ? result : result + (result.length ? '&' : '?') + key + '=' + window.encodeURIComponent(queryObject[key]), '')

const ShareIcon = () => (
  <svg height='20' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fill-rule='evenodd' clip-rule='evenodd' d='M10.0008 0.0572666C9.91868 0.0211489 9.82794 0.00109863 9.73251 0.00109863C9.64688 0.00109863 9.56503 0.0172404 9.48983 0.046647C9.40649 0.079153 9.32838 0.129058 9.26108 0.196361L4.72817 4.72927C4.46782 4.98962 4.46782 5.41173 4.72817 5.67208C4.98852 5.93243 5.41063 5.93243 5.67098 5.67208L9.06584 2.27721V15.3997C9.06584 15.7679 9.36432 16.0664 9.73251 16.0664C10.1007 16.0664 10.3992 15.7679 10.3992 15.3997V2.27727L13.794 5.67208C14.0543 5.93243 14.4764 5.93243 14.7368 5.67208C14.9971 5.41173 14.9971 4.98962 14.7368 4.72927L10.2076 0.200037C10.1487 0.140254 10.0786 0.09153 10.0008 0.0572666ZM0.666667 11.3333C1.03486 11.3333 1.33333 11.6318 1.33333 12V21.0658C1.33333 21.4901 1.50188 21.897 1.8019 22.197C2.10192 22.497 2.50883 22.6656 2.93312 22.6656H16.5318C16.9561 22.6656 17.363 22.497 17.6631 22.197C17.9631 21.897 18.1316 21.4901 18.1316 21.0658V12C18.1316 11.6318 18.4301 11.3333 18.7983 11.3333C19.1665 11.3333 19.465 11.6318 19.465 12V21.0658C19.465 21.8437 19.1559 22.5898 18.6059 23.1398C18.0558 23.6899 17.3098 23.9989 16.5318 23.9989H2.93312C2.15521 23.9989 1.40916 23.6899 0.859091 23.1398C0.309024 22.5897 0 21.8437 0 21.0658V12C0 11.6318 0.298477 11.3333 0.666667 11.3333Z' fill='black' />
  </svg>
)

const FollowIcon = () => (
  <svg height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fill-rule='evenodd' clip-rule='evenodd' d='M19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5C9.21523 22.5 6.54451 21.3938 4.57538 19.4246C2.60625 17.4555 1.5 14.7848 1.5 12C1.5 9.21523 2.60625 6.54451 4.57538 4.57538C6.54451 2.60625 9.21523 1.5 12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246ZM20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853ZM12 5.25C12.1989 5.25 12.3897 5.32902 12.5303 5.46967C12.671 5.61032 12.75 5.80109 12.75 6V11.25H18C18.1989 11.25 18.3897 11.329 18.5303 11.4697C18.671 11.6103 18.75 11.8011 18.75 12C18.75 12.1989 18.671 12.3897 18.5303 12.5303C18.3897 12.671 18.1989 12.75 18 12.75H12.75V18C12.75 18.1989 12.671 18.3897 12.5303 18.5303C12.3897 18.671 12.1989 18.75 12 18.75C11.8011 18.75 11.6103 18.671 11.4697 18.5303C11.329 18.3897 11.25 18.1989 11.25 18V12.75H6C5.80109 12.75 5.61032 12.671 5.46967 12.5303C5.32902 12.3897 5.25 12.1989 5.25 12C5.25 11.8011 5.32902 11.6103 5.46967 11.4697C5.61032 11.329 5.80109 11.25 6 11.25H11.25V6C11.25 5.80109 11.329 5.61032 11.4697 5.46967C11.6103 5.32902 11.8011 5.25 12 5.25Z' fill='black' />
  </svg>
)
