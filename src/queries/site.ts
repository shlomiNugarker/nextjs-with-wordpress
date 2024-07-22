import { gql } from '@apollo/client'

export const GET_SITE_DATA = gql`
  query GetSiteData {
    generalSettings {
      language
      title
      description
      url
    }
  }
`

export const QUERY_SEO_DATA = gql`
  query SeoData {
    seo {
      webmaster {
        yandexVerify
        msVerify
        googleVerify
        baiduVerify
      }
      social {
        youTube {
          url
        }
        wikipedia {
          url
        }
        twitter {
          username
          cardType
        }
        pinterest {
          metaTag
          url
        }
        mySpace {
          url
        }
        linkedIn {
          url
        }
        instagram {
          url
        }
        facebook {
          url
          defaultImage {
            altText
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
  }
`
