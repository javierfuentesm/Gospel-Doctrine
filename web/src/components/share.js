
import React from 'react'
import {FaTwitter, FaFacebook, FaEnvelope} from 'react-icons/fa/'

import {ShareButtonRoundSquare, ShareBlockStandard} from 'react-custom-share'

const ShareComponent = ({url, quote, text}) => {
  console.log(text)
  const shareBlockProps = {
    url: url,
    button: ShareButtonRoundSquare,
    buttons: [
      {network: 'Twitter', icon: FaTwitter},
      {network: 'Email', icon: FaEnvelope},

      {network: 'Facebook', icon: FaFacebook}
    ],
    text: `I want to share this ${quote}`,
    longtext: `I fund interesting this quote ${text}`
  }

  return <ShareBlockStandard {...shareBlockProps} />
}

export default ShareComponent
