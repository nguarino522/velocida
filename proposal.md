# Velocida

## Running/fitness log social media app and news/forum:

### Project Overview: 
#### 1. What goal will your website be designed to achieve? 
Create a running/fitness social media logging application similar to strava combined with forum and news like letsrun.com and upvote/downvote system like reddit.

The basic functionality at first will be manual activity upload but stretch goals (unlikely to reach) is to get automatic upload or sync from third party devices/apps like Garmin, etc. Most likely will have to implment that after submitting the capstone for completion.

### Functionality:
- Users can login and create an account
- Sign up users
- Login / logout
- User profile
  - follow other users and view their activities
- create/log their fitness/running activities 
- create posts in forum and reply to other posts in forum


#### 2. What kind of users will visit your site? In other words, what is the demographic of your users? 
Anybody that wants to log fitness/running activities and discuss that latest running news.

#### 3. What data do you plan on using? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. 

- Could incorporate Strava's API, however, will eventually use Garmins and other fitness logging apps as well.
- could potentially expose own API or way to easily share with other social media via a widget or something, data could be the following:
  - activities
  - posts

#### 4. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: 

##### a. What does your database schema look like? 
Users, profiles, activities, posts, activity comments, activity reactions, threads, votes

##### b. What kinds of issues might you run into with your API? 
Difficulty for stretch features (will implment most likely after submitting app to complete course).
	
##### c. Is there any sensitive information you need to secure?
We will need to secure user passwords. Would like to add extra account verification like email passcode perhaps when creating an account, so it can’t be spammed.
Or if using third party like clerk.js (potentially) need to figure that out, but may be better to just base off of the jobly proejct the custom auth system we did.

##### d. What will the user flow look like?
Users won’t have to create a login to just view the forum or news, but to post or create thread, log activities, or view other user activities they will need a user account.


##### e. What features make your site more than CRUD? Do you have any stretch goals?
Large amount of the similar functionality strava has with auto sync from Garmin etc. or uploading a gps data file (FIT, GPX, etc.) will be difficult to implement and the last thing we attempt.
