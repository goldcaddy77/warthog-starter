# Deploying to Heroku

To get started in Heroku, do the following:

## Install the CLI

```bash
brew tap heroku/brew && brew install heroku
```

## Login to CLI

```bash
heroku login
```

## Create your App

```bash
heroku create warthog-starter
heroku git:remote -a warthog-starter
```
