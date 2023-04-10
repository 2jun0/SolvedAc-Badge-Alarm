const { getLastestBadge } = require("./crawling")
const { sendEmail } = require("./mailer")

let currBadgeId = null

if (process.argv.length > 2) {
  currBadgeId = process.argv[2]
  console.log(`found current badge.. our current badgeId is ${currBadgeId}`)
}

getLastestBadge().then(badge => {
  console.log(`check badge id...${badge.badgeId}`)
  if (badge.badgeId == currBadgeId) {
    console.log(`nothing updated`)
    return
  }

  console.log(`new badge was found`)
  console.log(badge)


  sendEmail(badge)
})