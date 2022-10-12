import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

const App = () => {
  const [businesses, setBusinesses] = useState([])
  //weird that process.env only works when using REACT_APP_ infront of the value.
  const REACT_APP_API_TOKEN = process.env.REACT_APP_API_TOKEN;
  const location="Alpharetta"


  const fetchReviews = async (id) => {
     const reviews = await axios.get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${id}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_TOKEN}`,
        },
      }
    );
    return reviews
  }

  const fetchAPI = async () => {
   await axios
     .get(
       //justification: use this cors anywhere url to avoid spending extra time on CORS issues I was recieving
       `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}`,
       {
         headers: {
           Authorization: `Bearer ${REACT_APP_API_TOKEN}`,
         },
         params: {
           term: 'icecream',
         },
       }
     )

     .then(({data}) => {
      const savedBusinesses = data.businesses.sort(({ rating: a }, { rating: b }) => b - a).slice(0, 5)
        setBusinesses(savedBusinesses)
        console.info(data.businesses.sort(({ rating: a }, { rating: b }) => b - a).slice(0, 5))
       // would create a promise.all to get the reviews, and update the 'businesses' state with the reviews here
     })
     .catch((err) => {
       console.error(err);
     });
  }

  useEffect(() => {
   fetchAPI()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className='App'>
      <div>
        {businesses.map((business, i) => (
          <React.Fragment key={business.name}>
            <p>{`business ${i + 1}`}</p>
            <p>{business.name}</p>
            <p>
              {`${business.location.address1 } ${business.location.city} ${business.location.state}`}
            </p>
            {/* would dispalay the review information here */}
            {/* <p>{business.review.text}</p> */}
            {/* <p>{business.review.author}</p> */}
            <p>------------------------------------------</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
