# baseball-feed

Diagram located within project folder: Broadcast and stats feed.png
video demo recording: https://www.loom.com/share/33f2090d220c47f68f3c6f2cea0fe8e2

I used React, Typescript, Next.js because these were the only technologies mentioned in the job description and the directions said we are free to use any existing service or database.
Since no backend languages or databases were requested I used a simple JSON file as a mock database.
I styled the UI with Material-UI but also configured it for tailwind to demonstrate that I'm comfortable with both since the job description or directions didn’t specify (they seem to be the most common lately)

I have set up the 'front-end stopGap' to fetch data with next.js API route handlers, they come with node.js streaming capability built in so the consumer-facing portion receives the data as a stream.
Then using Suspense from React, you can progressively render HTML from the server to the client. This allows for selective hydration on the UI.
This part is not done in the code but the next step would be to make a separate API route just to fetch the score outside of suspense. Then recursively call it so the score updates while everything loads.

The admin front-end updates the redux store on both server and client-side so when you update a game and redirect back to home it shows the latest data without refresh.
The consumer front-end only updates the redux store on the server side.
The simplest way to sync redux stores is to handle them separately but you could also use next-redux-wrapper to rehydrate the page.
Dispatching/fetching happens on the client in components/schedule.tsx and on the server in pages/index.tsx.

On the home page (…/) If you click anywhere on the left 60% of the game list item, it links to the admin page.
If you click view consumer page (example.com/schedule/gameById/[slug]) you can see what the consumer sees.
I would use NextAuth.js (https://next-auth.js.org/getting-started/example) useSession() and create a login page to prevent consumers from seeing the front-end and redirect the user to the consumer page on login.
This is where I would dynamically render the game feed if there was a game that matches today's date. For now, the consumer page fetches and shows one game from the array of games by ID. I would also have like to make more styled components and use less sx={} as it was getting repetitive ( I was working on this after work in the evenings )

## Getting Started

To run the application and complete the tasks, follow these steps:

1. Install dependcies cd into baseball-feed folder : `npm init`
2. Start the development server using the following command: `npm run next`
