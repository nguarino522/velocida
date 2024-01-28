import axios from "axios";

//const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5227";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:5227";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class VelocidaApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${VelocidaApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** get rss feed from worldathletics.org */
  static async getNews() {
    let res = await this.request("news")
    return res
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies (filtered by name if not undefined) */
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get list of jobs (filtered by title if not undefined) */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Apply to a job */
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile. */
  static async saveProfile(username, data) {
    let res = await this.request(`profile/${username}`, data, "patch");
    return res.profile;
  }

  /** Get user profile. */
  static async getProfile(id) {
    let res = await this.request(`profile/${id}`);
    return res.profile;
  }

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`user/${username}`);
    return res.user;
  }

  /** Create activity. */
  static async createActivity(data) {
    let res = await this.request("activity", data, "post")
    return res.activity;
  }

  /** Get user profile. */
  static async getActivity(id) {
    let res = await this.request(`activity/${id}`);
    return res.activity;
  }

  /** Get list of threads paginated. */
  static async getThreads(pageNum) {
    let res = await this.request(`thread/forum/${pageNum}`)
    return res.threads;
  }

  /** Create a thread. */
  static async createThread(data) {
    let res = await this.request("thread", data, "post")
    return res.thread
  }

  /** Get thread by id. */
  static async getThread(id) {
    let res = await this.request(`thread/${id}`)
    return res.thread;
  }

  /** Create a vote. */
  static async createVote(data) {
    let res = await this.request("vote", data, "post")
    return res.vote;
  }

  /** Delete a vote. */
  static async removeVote(id) {
    let res = await this.request(`vote/${id}`, {}, "delete")
    return res;
  }

  /** Toggle a vote. */
  static async toggleVote(id){
    let res = await this.request(`vote/${id}`, {}, "patch")
    return res.vote;
  }

  /** Get a post. */
  static async getPost(id) {
    let res = await this.request(`post/${id}`)
    return res.post;
  }

  /** Create a post. */
  static async createPost(data) {
    let res = await this.request("post", data, "post")
    return res.post;
  }

  /** Follow a profile. */
  static async followProfile(data) {
    let res = await this.request("follow", data, "post")
    return res.follow
  }

  /** Unfollow a profile. */
  static async unfollowProfile(data) {
    let res = await this.request("follow", data, "delete")
    return res.follow
  }

  /** Create a comment. */
  static async createComment(data) {
    let res = await this.request("comment", data, "post")
    return res.comment
  }

  /** Create a like. */
  static async createLike(data) {
    let res = await this.request("like", data, "post")
    return res.like
  }

  /** Delete a like. */
  static async deleteLike(id) {
    let res = await this.request(`like/${id}`, {}, "delete")
    return res.like
  }
}


export default VelocidaApi;