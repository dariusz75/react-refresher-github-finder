import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
  const [ githubUser, setGithubUser ] = useState(mockUser);
  const [ repos, setRepos ] = useState(mockRepos);
  const [ followers, setFollowers ] = useState(mockFollowers);
  const [ requests, setRequests ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState({show: false, msg: ''});

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
    .then((response) => {
      let remaining = response.data.rate.remaining;
      remaining = 0;
      setRequests(remaining);
      if(remaining === 0) {
        console.log('remaining is', remaining)
        toggleError(true, 'Sorry, you have exceeded your hourly request limit!');
        
      }
    }).catch((error) => {
      console.log(error);
    })
  };
  
  const toggleError = (show = false, msg = '') => {
    setError({show, msg});
    console.log('the error is', error)
  }

  useEffect(checkRequests, []);

  return <GithubContext.Provider 
            value={{githubUser, repos, followers, requests, error}}
          >
            {children}
          </GithubContext.Provider>
};

export { GithubProvider, GithubContext };