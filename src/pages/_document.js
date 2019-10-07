import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
// import criticalCSS from '../static/css/site-a41baf993b.css';


// const HASHED_CSS = require('../static/css/rev-manifest')['site.css'];

// const siteCss = `/static/css/${siteCSS['site.css']}`;


const schema = {
  website: 'https://carbonhealth.com',
  name: 'Carbon Health',
  title: 'A fresh take on health care | Carbon Health',
  description: 'A new Primary Care clinic that works with your busy life',
  logo: 'https://carbonhealth.com/static/img/_common/logo-wordmark.svg',
  address: {
    addressCountry: 'United States',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94111',
    streetAddress: '55 Pacific Ave',
    email: 'info@carbonhealth.com',
    telephone: '+1-415-869-8858',
    latitude: '37.797992',
    longitude: '-122.4002661',
  },
};

// console.log(HASHED_CSS)


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // const isV4 = this.props.__NEXT_DATA__.page.includes('/v4');
    return (
      <html lang="en">
        <Head id="head">
          {/* <style id="criticalCSS" dangerouslySetInnerHTML={{ __html: require(`../static/css/${HASHED_CSS}`) }} /> */}




          <link rel="preconnect" href="https://www.googleapis.com" crossOrigin="crossorigin" />
          <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="crossorigin" />

          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#24a06d" />
          <meta name="google-site-verification" content="NLZC20pU2aoMIpVQDrri-PqqgjiNPPYakEyGEXakAk8" />
          <meta name="google-site-verification" content="SqiIaEYame1hvyt54cwpZFk9H88kHJois7oUPuFXq0g" />
          <meta name="google-site-verification" content="ipSV4g_piTq3N41Hxb5TzMT4lyBSoeYViILnhpvFvvY" />
          <meta name="google-site-verification" content="SqiIaEYame1hvyt54cwpZFk9H88kHJois7oUPuFXq0g" />
          <meta name="google-site-verification" content="9Y4821XwGm8hJ8ujh8jr3WFMM_xPWieMsqZiAm_WLpg" />

          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="apple-touch-icon" href="/static/img/_common/facebook.png" />


          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{
              "@context":"http://schema.org",
              "@type":"WebSite",
              "name":"${schema.name}",
              "headline":"${schema.title}",
              "image":"${schema.logo}",
              "description":"${schema.description}",
              "publisher":{
                "@type":"Organization",
                "logo":{
                  "@type":"ImageObject",
                  "url":"${schema.logo}"
                  }
                }
              }
              `,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "${schema.website}",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "${schema.website}/r/{search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
              `,
            }}
          />


          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                {
                  "@context": "http://schema.org",
                  "@type": "Organization",
                  "url": "${schema.website}",
                  "logo": "${schema.logo}",
                  "contactPoint": [{
                    "@type": "ContactPoint",
                    "telephone": "${schema.address.telephone}",
                    "contactType": "billing support",
                    "areaServed": "US"
                  }]
                }
              `,
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                {
                "@context": "http://schema.org/",
                "@type": "MedicalOrganization",
                "name": "Carbon Health Primary Care",
                "url": "${schema.website}",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "${schema.address.addressCountry}",
                  "addressLocality": "${schema.address.addressLocality}",
                  "addressRegion": "${schema.address.addressRegion}",
                  "postalCode": "${schema.address.postalCode}",
                  "streetAddress": "${schema.address.streetAddress}",
                  "email": "${schema.address.email}",
                  "telephone": "${schema.address.telephone}"
                },
                "logo": {
                  "@type": "ImageObject",
                  "image": "${schema.logo}"
                }
              }
              `,
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                {
                  "@context": "http://schema.org",
                  "@type": "HealthAndBeautyBusiness",
                  "name": "${schema.name}",
                  "image": "${schema.logo}",
                  "@id": "${schema.website}",
                  "url": "${schema.website}",
                  "telephone": "${schema.address.telephone}",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "${schema.address.streetAddress}",
                    "addressLocality": "${schema.address.addressLocality}",
                    "addressRegion": "${schema.address.addressRegion}",
                    "postalCode": "${schema.address.postalCode}",
                    "addressCountry": "${schema.address.addressCountry}"
                  },
                  "priceRange": "29-195",
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": ${schema.address.latitude},
                    "longitude": ${schema.address.longitude}
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                  },
                  "sameAs": [
                    "https://www.facebook.com/carbonhealth/",
                    "https://twitter.com/carbonhealth"
                  ]
                }
              `,
            }}
          />


        </Head>
        <body>
          <Main />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
