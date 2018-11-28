# csci4300-final-project - 

## Team Name
 - $3!N0RZZ!!
 
## Team Member names
  - Ausitn Hardaway
  - Nicholas Caamano
  - Aubri McMann
  - Brittany Clarke

## Proposal: BarCrawlApp [placeholder]

- Issa app that uses your location to generate a randomized sequence of bars to hit in a night. Have you ever been in a dead bar arguing with 5 of your sort of acquaintances about where to go to next? It sucks right? Let a wacky web app make the decision for you! It'll create a whole randomly generated scenario that will make your whole night! That way if it’s bad you can blame us! Using the GoogleMaps Api we will be able to fetch a list of bars that meet certain user specified requirements, as well as generate a map and center it on your location.  

### Sign-In 
  - Users should be able to sign up for an account on this app, with their email and a suitably robust password. The email for each user should be unique. Also when signing up users will have to affirm that they are above the age of twenty one (Because we want our users to be of age #pleasedontsueus). After signing up users will be able to sign in and request a bar crawl be generated for them. 

### Choose your Crawl
  - On this page, after having signed in, you will be able to select some options about the bars that this app will select for you. You will be able to choose the number of bars on the generated list, the lower and upper bound on the price level (as determined by the Google Places API), as well as a maximum distance you are willing to walk from your current location. Drinking and driving is bad! Once we have tailored your experience based on the options that you selected, you will be presented with a list of bars. When you wish to begin your crawl, just tap the start button and you will be directed to a map with your location and the first bar's location marked. Onc e you have completed your crawl you will be returned to this page.  
  
### Map Page
  - On this page you will be shown a map with your current location as well as the location of the bar you are currently going to. Once you have reached that bar and are ready to leave that particular establishment you will be able to hit a next button which will show you the name, address, price point, and reviews. Then you may begin the journey to the next bar. When you get to the last bar you will be prompted to complete your crawl, this will ask you to leave a reviews of the bars that you visited along the way. 
  
## Past Projects Used
  1. Pj00 - HTML
  2. Pj01 - CSS
  3. Pj02 - UWSGI
  4. Pj03 - MySQL Database (for users and reviews)
  5. Pj04 - Django
  
  Licensing request: All code produced in accordance with this proposal will be sole ownership of the $3!N0RZZ!! team members. This code will be licensed under the Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA).

- (30 points) SQL Database
 	- (15 points) User & Review Tables
	    - User table for storing usernames & hashed passwords & uid
	      ``` javascript
	      {
	       uid: long
	       username : string,
	       password: string, //hashed with Django’s hashing algorithm 
	      }
	      ```
	    - Reviews table for storing user reviews of bars
	      ``` javascript
	      {
	      review: review,
	      bar_id: bar_id,
	      user: username,
	      rating: rating //1-5 star system
	      }  
	      ```
 - (3 points) User passwords will be hashed before being pushed to database
	- (2 points) schema.sql available for download on the site
- (20 points) Use of XHR for Google Places and Map API
	- (10 points) Gets random bar information
	- (10 points) Displays that information to the user
- (20 points) UI
	- (5 points) Styling: modern design that should be easy to understand
	- (5 points) Consistent design throughout entire app
	- (10 points) Responsive for mobile users
- (10 points) User bar crawl preferences
	- (5 points) Users can filter by:
		- Price 
		- Distance
	- (5 points) Users can specify the number of bars in a crawl
-  (10 points) User Registration and Login/Logout
	- (5 points) Users can register with a username and password
	- (2.5 points) Users can login
	- (2.5 points) Users can logout
-  (10 points) Django 
	- (10 points) We will use Django


