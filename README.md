# Let Me In

## What is Let Me In?
A game to play while in the Zoom waiting. Players will have to try to guess what image the facilitators are waiting to see before they'll let you into Zoom.

## Where to look for the planning?
[Check out the Miro board!](https://miro.com/app/board/uXjVPrOmhZE=/)

## Where is the Github Repo?
[Check out the Github repo!](https://github.com/tohora-2023/LetMeIn)

## After cloning what should I do?
```
git checkout -b <branchname>
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```
Then have a look at http://localhost:3000/ and over the code to get a feel for what's already there.

## Where do I look for what needs to be done?
Check out our [Github Project board](https://github.com/orgs/tohora-2023/projects/2/views/1).

## Before Creating a Pull Request
Make sure there are no linting or testing errors.
```
npm run lint
npm run test
```

Additionally, to check you have written tests with good coverage.
```
npm run test:coverage
```
