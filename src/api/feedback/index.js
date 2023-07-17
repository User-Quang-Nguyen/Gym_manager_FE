import axios from 'axios';
import { deepCopy } from 'src/utils/deep-copy';
import { applySort } from 'src/utils/apply-sort';
import getUserById from './userById';
import { useState } from 'react';
// import { wait } from 'src/utils/wait';
/* 
This class has methods to perform HTTP requests such as getting 
a list of feedbacks, getting feedback by ID, creating new feedback, 
updating feedback, and deleting feedback.
*/
class FeedbacksApi {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getFeedbacks(request = {}) {
    var data = [];
    try {
      const response = await axios.get(`${this.baseUrl}/feedback/`);
      const result = await getUserById(response);
      data = Object.assign([], result);
    } catch (error) {
      console.error('Error while fetching feedbacks:', error);
      return [];
    }
    // console.log(data);
    data = deepCopy(data);
    data = applySort(data, 'createdAt', 'desc');
    let feedbacks = data.map(feedback => {
      let comments = data.filter(item => item.parentFeedbackId === feedback.id);
      comments = applySort(comments, 'createdAt', 'asc');
      return {
        ...feedback,
        comments
      };
    });

    feedbacks = feedbacks.filter(item => item.parentFeedbackId === 0);


    return feedbacks;
  }

  async getFeedbackById(id) {
    var data = [];
    try {
      const response = await axios.get(`${this.baseUrl}/feedback/${id}`);
      const result = await getUserById(response);
      data = Object.assign([], result);
      return data;
    } catch (error) {
      console.error(`Error while fetching feedback with ID ${id}:`, error);
      return null;
    }
  }

  async createFeedback(newFeedback) {
    try {
      const response = await axios.post(`${this.baseUrl}/feedback/`, newFeedback);
      return response.data;
    } catch (error) {
      console.error('Error while creating feedback:', error);
      return null;
    }
  }

  async updateFeedbackById(id, updatedFeedback) {
    try {
      const response = await axios.put(`${this.baseUrl}/feedbacks/${id}`, updatedFeedback);
      return response.data;
    } catch (error) {
      console.error(`Error while updating feedback with ID ${id}:`, error);
      return null;
    }
  }

  async deleteFeedbackById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/feedbacks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting feedback with ID ${id}:`, error);
      return false;
    }
  }
}

const feedbacksApi = new FeedbacksApi('http://localhost:8081');

export default feedbacksApi;

