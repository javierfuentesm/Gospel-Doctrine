import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import {buildImageObj, getBlogUrl} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import AuthorList from './author-list'
import styles from './blog-post.module.css'
import {Link} from 'gatsby'

function BlogPost (props) {
  const {_rawBody, authors, categories, title, mainImage, publishedAt, allPosts} = props
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
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do, YYYY')}
              </div>
            )}
            {authors && <AuthorList items={authors} title='Authors' />}
            {categories && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
                <ul>
                  {categories.map(category => (
                    <a>
                      <li key={category._id}>{category.title}</li>
                    </a>
                  ))}
                </ul>
              </div>
            )}
            {allPosts && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>BOOK MENU</h3>
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
