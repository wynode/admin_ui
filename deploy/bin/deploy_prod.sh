yarn install &&
# yarn test:unit &&
yarn run build &&
rsync -r deploy/nginx/nginx.prod.conf opt@118.24.78.45:/data/opt/coconut_ui &&
rsync -r dist opt@118.24.78.45:/data/opt/coconut_ui
