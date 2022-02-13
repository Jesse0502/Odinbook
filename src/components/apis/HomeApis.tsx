import React from 'react'
export let tweets = null;
export function getTweets() {
  fetch("https://twitter-clone-69.herokuapp.com/tweet").then((res) => {
    return res.json()
  }).then((result) => {
    tweets = result;
  })
}
