const app = require('./app')

const start = require('./messages/start')
const wish = require('./messages/wish')
const wishlist = require('./messages/wishlist')
const help = require('./messages/help')

const setBirthday = require('./actions/set_birthday')
const deleteWishFromList = require('./actions/delete_wish_from_list')

app.message('start', start);
app.message(/^wish\s(.*)/, wish);
app.message('wishlist', wishlist);
app.message('help', help);

app.action('set_birthday', setBirthday);
app.action('delete_wish_from_list', deleteWishFromList);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
