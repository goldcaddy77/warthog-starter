# Deploying to Heroku

To get started in Heroku, do the following:

## First Login

```bash
heroku login
```

## App the add-on

```bash
heroku addons:create heroku-redis:hobby-dev
```

## Check status of add-on

```bash
heroku addons | grep heroku-redis
```

## Get Redis conneciton info

Heroku will create the `REDIS_URL` config value that you can use to connect

```bash
heroku config:get REDIS_URL
```

## Get info about redis addon

```bash
heroku addons --json | jq -c '.[] | select(.addon_service.cli_plugin_name == "heroku-redis")'
```

## References

[heroku-redis](https://elements.heroku.com/addons/heroku-redis)
