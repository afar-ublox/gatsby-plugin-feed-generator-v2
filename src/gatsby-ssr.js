import React from 'react'
import urlJoin from 'url-join'
import { withPrefix } from 'gatsby'
exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { rss, json, feeds, baseUrl, putnoIndex } = pluginOptions;

  let output = [];

  // console.log(putnoIndex);

  
  for (let feed of feeds) {

    if(feed.addToHeader === true){

      let siteUrl = feed.baseUrl || '/'
      if (rss) {
        let rssurl = urlJoin(siteUrl, feed.name).replace(/\/+$/, '') + '.xml'
        output.push(
          <link
            rel="alternate"
            key="gatsby-feed-rss"
            type="application/rss+xml"
            href={rssurl}
          />
        )
      }

      if (json) {
        let jsonurl = urlJoin(siteUrl, feed.name).replace(/\/+$/, '') + '.json'
        output.push(
          <link
            rel="alternate"
            key="gatsby-feed-json"
            type="application/json"
            href={jsonurl}
          />
        )
      }
      if(putnoIndex == true){
        output.push(
          <meta name="robots" content="noindex" />
        )
      }
      
    }
  }
  setHeadComponents(output)
}
