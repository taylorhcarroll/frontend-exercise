# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?
```
While this dataset is not large, I would consider implementing lazy loading or pagination if we were fetching thousands of records. This could make implementing the search a bit trickier, and depending on other factors, you may want to move the filtering server-side. In this case, we have no control over the external API.

You could cache the API responses using something like Redux, or you could set a max-age in the HTTP header. I would also consider a debounce on the search input. In this case, I'm using useRef to recalculate the searchresults, but if there were 'expensive' calculations being made like large datasets with tons of filtering logic (i.e. partial matching on multiple searchterms for multiple columns, in multiple rows of a grid) a debounce could be helpful.


```

- Is there anything you would consider doing if we were to go live with this app?

```
If we were to go live with this application, I would consider using a middleware like NextJS to implement a proxy layer for api calls. This can be helpful for obscuring sensitive information like an API key, enable cacheing of api responses, consolidating data from multiple sources, or server-side rendering.

If I had more time, I would also sanitize user input, although the user is not posting to a db so that might not be a huge concern. I did add some things to improve the accesibility of this app such the aria-live, aria-labelledby, and the useRef managing the focus for screen readers, but there are more improvements that could be made such as swapping out divs for semantic html elements where necessary.

I would also containerize this app, and add environmental variables so that this could be spun up in a local dev environment, but also to facilitate building and deploying in dev, qa, and prod environmenta.

Unit tests and regression tests could also be created and used with CircleCI as a part of a CI/CD pipeline. This would help ensure new changes don't break functionality, and can be set up to test any new Pullrequests and prevent code from being merged unless it passed all tests and built successfully.
```

- What was the most challenging aspect of this work for you (if at all)?

```
If I had to pick something as the most challenging aspect of this project, it would be deciding whether to use the provided url resource from the return of the fetchPokemonSpeciesByName endpoint. The API provides a url that fetches the evolution chain. In the end I chose to strip the species ID from the url and use that to feed into our own fetchEvolutionChainById call to the API. There are pro and cons to using the provided url. One pro is that if the api updated, we could just use the new url if it changed. The con is that you now have a dependency on the exact url structure. This could also make it trickier to mock in unit or regression tests.

A pro, is that you can be more consist in all of your calls to endpoints. If you have a url builder that does additional things like passing params, API keys, headers, specifiying http or https, or if you implemented a middleware like nextJS to send your calls through a proxy layer, it would be better to strip the ID and make the call yourself. In this case, there aren't enviornmental related urls, but that is also a consideration.

```
