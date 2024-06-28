//import library for making HTTP requests 
import axios from 'axios';

export const fetchStargazers = async (owner, repo, t) => {

  try {

    // Make a GET request to fetch stargazers data from GitHub API
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stargazers`);

    if (response.status === 200) {

      // If request is successful  return data
      return { data: response.data, error: null };

    } else if (response.status === 404) {

      // If repository not found return error message
      return { data: null, error: t('invalidInputError') };
    }
  } catch (error) {

    // If an error occurs during API request, return error message
    return { data: null, error: t('invalidInputError') };
  }
};
