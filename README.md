# wishlist-bot

## Commands
- start
- birthday $date
- add
- delete
- list
- list @michael


## Models

User (id, name, slack_id, birthday)
  -> Wishlist (id)
    -> WishlistItem (title, link)
