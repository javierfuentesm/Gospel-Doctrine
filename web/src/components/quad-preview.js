import {format} from 'date-fns'
import {Link} from 'gatsby'
import React from 'react'
import {buildImageObj, cn, getQuadUrl} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import styles from './blog-post-preview.module.css'
import {responsiveTitle3} from './typography.module.css'

function QuadPreview (props) {
  const {node} = props
  return (
    <Link
      className={node.isInList ? styles.inList : styles.inGrid}
      to={getQuadUrl(node.publishedAt, node.slug.current)}
    >
      <>
        <div className={styles.leadMediaThumb}>
          {node.mainImage && node.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(node.mainImage))
                .width(600)
                .height(Math.floor((9 / 16) * 600))
                .auto('format')
                .url()}
              alt={node.mainImage.alt}
            />

          )}
        </div>
        <div className={styles.text}>
          <h3 className={cn(responsiveTitle3, styles.title)}>{node.title}</h3>
          {node._rawExcerpt && (
            <div className={styles.excerpt}>
              <PortableText blocks={node._rawExcerpt} />
            </div>
          )}
          <div className={styles.date}>{format(node.publishedAt, 'MMMM Do, YYYY')}</div>
        </div>
      </>
    </Link>
  )
}

export default QuadPreview
