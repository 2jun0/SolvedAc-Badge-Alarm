const { getLastestBadge } = require("./crawling");

getLastestBadge().then(badge => {
  console.log(badge.badgeId)
})