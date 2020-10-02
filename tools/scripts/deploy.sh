heroku git:remote -a warthog-starter
git push heroku master
WARTHOG_ENV=production yarn run config
warthog db:migrate
