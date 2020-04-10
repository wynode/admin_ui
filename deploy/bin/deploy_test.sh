yarn install &&
# yarn test:unit &&
yarn run build:test &&
rsync -r deploy/nginx/nginx.test.conf root@hongkong:/root/project/admin_ui &&
rsync -r dist root@hongkong:/root/project/admin_ui
