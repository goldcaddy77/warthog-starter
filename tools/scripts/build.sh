# This is the script that is run as part of the build process, so it needs to do
# everything to get a Production system built

env
NODE_ENV=production yarn run config
yarn run codegen
yarn run compile
