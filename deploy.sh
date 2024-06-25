echo 'Switch to deploy branch'

git checkout deploy

npm run build

scp -r dist/* dev1@158.160.24.205:/var/www/158.160.24.205/

