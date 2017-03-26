branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
commit=$(git rev-parse HEAD)
ghead -n -2 .env > temp ; mv temp .env
echo REACT_APP_BRANCH=$branch >> .env
echo REACT_APP_COMMIT=$commit >> .env