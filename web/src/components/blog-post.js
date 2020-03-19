import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import {buildImageObj, getBlogUrl, getBookUrl} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import styles from './blog-post.module.css'
import {Link} from 'gatsby'

import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody
} from '../components/styledComponents/Card'

function BlogPost (props) {
  const {allBooks, mainImage, publishedAt, allPosts, allVerses} = props
  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .auto('format')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            {allVerses.map(post => {
              const finalVerse = post.node
              return (
                <CardWrapper>
                  <CardHeader>
                    <CardHeading>{finalVerse.title}</CardHeading>
                  </CardHeader>
                  <CardBody>
                    {finalVerse._rawBody && <PortableText blocks={finalVerse._rawBody} />}
                  </CardBody>
                </CardWrapper>
              )
            })}
          </div>

          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do, YYYY')}
              </div>
            )}
            {allBooks && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Books</h3>
                <ul>
                  {allBooks.map(book => (
                    <a>
                      <Link to={getBookUrl(book.node.publishedAt, book.node.slug.current)}>
                        <li key={book.node._id}>{book.node.title}</li>
                      </Link>
                    </a>
                  ))}
                </ul>
              </div>
            )}
            {allPosts && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>CHAPTER MENU</h3>
                <ul>
                  {allPosts.map(post => {
                    const finalPost = post.node
                    return (
                      <Link to={getBlogUrl(finalPost.publishedAt, finalPost.slug.current)}>
                        <li key={finalPost.id}>{finalPost.title}</li>
                      </Link>
                    )
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
