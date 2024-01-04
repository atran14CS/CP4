/*
 * Name: Akira Tran
 * This is the JavaScript portion for the movies.html. This file helps with the functionality of
 * the wepbage. These functionalitys consist of fect api request to reterive and send back data.
 * Giving UI experinces with clicking of buttons.
 *
 */
"use strict";
(function() {

  window.addEventListener("load", init);
  const MOVIETITLES = ["god-father.jpg", "pulb-fiction.jpg", "shawshank.jpg",
  "dark-knight-rises.jpeg", "john-wick-2.jpg", "jojo-rabbit.jpeg", "dictator.jpeg",
  "endgame.jpeg", "inglourious-bastards.jpg", "sorcer-stone.jpg"];
  const RANDUSER_URL = 'https://randomuser.me/api/';
  const MUSEUM_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/112";

  /**
   * main function controls which button assoicates to which call back function upon
   * click.
   */
  function init() {
    qs('#button').addEventListener("click", generateRandMov);
    qs('#list-btn').addEventListener("click", createMovieList);
    id("create").addEventListener("click", toggleCreateMovie);
    id("create").addEventListener("click", createMovieList);
    qs(".home").addEventListener("click", toggleHome);
    id("rate").addEventListener("click", toggleRate);
    id("background").addEventListener("click", makeRequest2);
    id("gen-more-reviews").addEventListener("click", makeRequest1);
    id("tr-btn").addEventListener("click", trendingRequest);
    id("subscription").addEventListener("submit", function(err) {
      err.preventDefault();
      addEmail();
    });
  }

  /**
   * sends over the email to be the server side to be checked out.
   */
  function addEmail() {
    let data = new FormData();
    let newEmail = id("email");
    data.append("email", newEmail.value);
    fetch("/newsletter", {method: "POST", body: data})
      .then(statusCheck)
      .then(res => res.text())
      .then(displayMsg)
      .catch(displayMsg);
  }

  /**
   * Displays the message if the email was successful or not.
   * @param {String} data - holds the success or error response for the inputted email
   */
  function displayMsg(data) {
    let msg = gen("p");
    msg.textContent = data;
    id("subscription").appendChild(msg);
  }

  /**
   * generate random movie from MOVIETITLES by picking a random number
   * Then change the current image to new movie title image.
   */
  function generateRandMov() {
    let randomIndex = Math.floor(Math.random() * MOVIETITLES.length);
    let randomMovie = MOVIETITLES[randomIndex];
    let changeImage = id("movie-box");
    changeImage.src = "random-movies/" + randomMovie;
    changeImage.alt = "generated-random-movie";
    changeImage.classList.toggle("dashed");
  }

  /**
   * fetch request to retreive random users from the RANDUSER_URL
   */
  function makeRequest1() {
    fetch(RANDUSER_URL)
      .then(statusCheck)
      .then(res => res.json())
      .then(userCreation)
      .then(movieReview)
      .catch(handleErrorReview);
  }

  /**
   * fetch request to retreive the primary image from the MUSEUM_URL
   */
  function makeRequest2() {
    fetch(MUSEUM_URL)
      .then(statusCheck)
      .then(res => res.json())
      .then(getBackgroundImage)
      .catch(handleErrorImage);
  }

  /**
   * Sets the background of the webpage to retive image from the MUSEUM_URL API
   * @param {String} data - holds the background image src.
   */
  function getBackgroundImage(data) {
    let imageSrc = data.primaryImage;
    document.body.style.backgroundImage = `url("${imageSrc}")`;
  }

  /**
   * Creates a random user to be displayed on the webpage.
   * @param {objecet} data - holds the user infromation name and image.
   * @returns {object} - a section tag that contains the random user infomration.
   */
  function userCreation(data) {
    let fName = data.results[0].name.first;
    let lName = data.results[0].name.last;
    let userSection = gen("section");
    let userName = gen("p");
    let userImg = gen("img");
    userName.textContent = fName + " " + lName;
    userImg.src = data.results[0].picture.large;
    userSection.appendChild(userImg);
    userSection.appendChild(userName);
    return userSection;
  }

  /**
   * Generates random movie reviews for random USERS for movies in MOVIETITLES.
   * @param {object} userSection - The section tag created from userCreation.
   */
  function movieReview(userSection) {
    const reviewComments = ["this movie was garbage!",
    "It was ok I think they could have done a better job.",
    "The director needs to be fire ASAP", "Speechless",
    "Amazing",
    "If was to choose 1 move to watch for the rest of my life it would be this one",
    ": ), Terrerfic!, not worth it, totally worth it"];
    let moveImg = gen("img");
    let randomIndex = Math.floor(Math.random() * MOVIETITLES.length);
    moveImg.src = "random-movies/" + MOVIETITLES[randomIndex];
    userSection.appendChild(moveImg);
    let newReview = gen("p");
    newReview.textContent = reviewComments[randomIndex];
    userSection.appendChild(newReview);
    id("user-reviews").appendChild(userSection);
  }

  /**
   * Will be called if not able to connect to RANDOMUSER_URL API.
   */
  function handleErrorReview() {
    let errorP = gen("h1");
    let errorImg = gen("img");
    errorImg.src = "error/images.jpeg";
    errorP.textContent = "ERROR CANNOT CONNECT LOAD REVIEWS";
    id("movie-reviews").appendChild(errorP);
    id("movie-reviews").appendChild(errorImg);
  }

  /**
   * Will be called if not able to connect to MUSEUM_URL.
   */
  function handleErrorImage() {
    let errorP = gen("h1");
    errorP.textContent = "ERROR CANNOT CONNECT LOAD BACKGROUND IMAGE!";
    id("main-menu").appendChild(errorP);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Takes user input of their favorite movie and the rating and adds it to a list
   */
  function createMovieList() {
    let newMovie = gen("li");
    newMovie.classList.add("movie-item");
    let movieTitle = id("movie-title").value;
    let movieRating = id("rating").value;
    newMovie.textContent = movieTitle + " " + movieRating;
    id("movie-list").appendChild(newMovie);
  }

  /**
   * Toggles to the movie reviews section in the webpage.
   */
  function toggleRate() {
    let rateView = id("movie-reviews");
    if (rateView.classList.contains("hidden")) {
      id("main-menu").classList.add("hidden");
      id("make-list").classList.add("hidden");
      rateView.classList.remove("hidden");
    }
  }

  /**
   * Toogles back to to the main home.
   */
  function toggleHome() {
    let homeView = id("main-menu");
    if (homeView.classList.contains("hidden")) {
      id("movie-reviews").classList.add("hidden");
      id("make-list").classList.add("hidden");
      homeView.classList.remove("hidden");
    }
  }

  /**
   * Toggles to the create movie list.
   */
  function toggleCreateMovie() {
    let createList = id("make-list");
    if (createList.classList.contains("hidden")) {
      id("main-menu").classList.add("hidden");
      id("movie-reviews").classList.add("hidden");
      createList.classList.remove("hidden");
    }
  }

  /**
   * Fetches the trending movies
   */
  function trendingRequest() {
    fetch("/trending")
      .then(statusCheck)
      .then(res => res.json())
      .then(populateTrending)
      .catch(handleErrorReview);
  }

  /**
   * Takes the trending movies and forms to be displayed on the webpage main-menu
   * @param {Object} data - The JSON object that holds the trending movie and the
   * rating for the movie
   */
  function populateTrending(data) {
    let trendingMovies = gen("section");
    for (let i = 0; i < data.length; i++) {
      let singleTrend = gen("article");
      let movieTitle = gen("p");
      let movieRating = gen("p");
      movieTitle.textContent = "Movie Title: " + data[i].movie;
      movieRating.textContent = "Rotten Tomatoe rating: " + data[i].rating;
      singleTrend.appendChild(movieTitle);
      singleTrend.appendChild(movieRating);
      trendingMovies.appendChild(singleTrend);
    }
    id("trending-movies").appendChild(trendingMovies);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();