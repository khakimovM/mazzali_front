import { gql } from "@apollo/client";

const STRAPI_BASE_URL =
  import.meta.env.VITE_STRAPI_BASE_URL || "http://localhost:1337";

export const buildStrapiUrl = (path: string) => `${STRAPI_BASE_URL}${path}`;

// GraphQL query for homepage data
export const HOMEPAGE_QUERY = gql`
  query HomePage {
    homePage {
      documentId
      heroSection {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
        discount_text
      }
      forSection {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      youGet {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      youGetMenu {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      getTips {
        id
        title
        info {
          id
          title
          subtitle
        }
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      getDesign {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      howItWork {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      offerOne {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      offerTwo {
        id
        title
        subtitle
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      tarif {
        id
        price
        description
        special
      }
      download {
        id
        title
        url
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
      partners {
        id
        companyName
        image {
          name
          width
          height
          size
          url
          mime
        }
      }
    }
  }
`;
