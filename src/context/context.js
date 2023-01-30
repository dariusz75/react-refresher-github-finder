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
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState({show: false, msg: ''});

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    
    const response = await axios(`${rootUrl}/users/${user}`)
    .catch(error => {console.log(error)});

    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, 'there is no user with that username')
    }

    checkRequests();
    setIsLoading(false);
  }

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
    .then((response) => {
      let remaining = response.data.rate.remaining;
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
            value={{
              githubUser,
              repos,
              followers,
              requests,
              error,
              searchGithubUser,
              isLoading,
            }}
          >
            {children}
          </GithubContext.Provider>
};

export { GithubProvider, GithubContext };