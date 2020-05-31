import React, {useState, useEffect} from 'react'
import {buildImageObj, getBlogUrl, getBookUrl} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import ShareComponent from './share'
import styles from './blog-post.module.css'
import {Link} from 'gatsby'
import ShareButton from 'react-web-share-button'
import {CardWrapper, CardHeader, CardHeading, CardBody} from '../components/styledComponents/Card'

function BlogPost (props) {
  const {allBooks, mainImage, allPosts, allVerses} = props
  const [navigatorShare, setNavigatorShare] = useState(false)
  const [showShare, setShowShare] = useState([])

  useEffect(() => {
    if (navigator.share) {
      setNavigatorShare(true)
    }

    let json = {}
    allVerses.forEach((element, key) => {
      let aux = JSON.parse(JSON.stringify(showShare))
      json = {
        show: false,
        id: key
      }
      aux.push(json)
      setShowShare(showShare => [...showShare, json])
    })
  }, [])

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
            {allVerses.map((post, key) => {
              const finalVerse = post.node
              return (
                <CardWrapper key={key}>
                  <a id={key} />
                  <CardHeader>
                    <CardHeading>{finalVerse.title}</CardHeading>
                  </CardHeader>
                  <CardBody>
                    {finalVerse._rawBody && <PortableText blocks={finalVerse._rawBody} />}

                    {navigatorShare ? (
                      <>
                        <ShareButton
                          title={finalVerse.title}
                          text='I want to share this quote with you'
                          url={`${window.location.href}#${key}`}
                        />
                      </>
                    ) : (
                      <>
                        {showShare && showShare.length > 0 && (
                          <>
                            <ShareComponent
                              url={`${window.location.href}#${key}`}
                              quote={finalVerse.title}
                              text='I want to share this quote with you'
                            />
                          </>
                        )}
                      </>
                    )}
                  </CardBody>
                </CardWrapper>
              )
            })}
          </div>

          <aside className={styles.metaContent}>
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
                <h3 className={styles.categoriesHeadline}>Chapter Menu</h3>
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
