import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function App() {
  console.log("レンダリング");
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState('');

  useEffect(() => {
      Axios.get("http://localhost:3001/api/get").then((response) => {
        setMovieList(response.data);
      })
  }, []);

  const submitReview = () => {
      // server側でリクエストのbodyに入ってくる
      Axios.post("http://localhost:3001/api/insert", {
          movieName: movieName,
          movieReview: review
      });

      setMovieList([...movieReviewList,
        { movieName: movieName, movieReview: review }
      ]);
      setMovieName('');
      setReview('');
  };

  const updateReview = (name) => {
      Axios.put("http://localhost:3001/api/update", {
        movieName: name,
        movieReview: newReview
      });
      setNewReview('');
  }

  const deleteReview = (index, movie) => {
      Axios.delete(`http://localhost:3001/api/delete/${movie}`);

      const movieReviews = [...movieReviewList]
      movieReviews.splice(index, 1);
      setMovieList(movieReviews);
  }


  return (
    <div className="App">
        <h1>CRUD APPLICATION</h1>

        <div className="form">
        <label>Movie Name:</label>
        <input value={movieName} type="text" name="movieName" onChange={(e) => {
            setMovieName(e.target.value);
        }}/>
        <label>Review</label>
        <input value={review} type="text" name="review" onChange={(e) => {
            setReview(e.target.value);
        }}/>

        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val, index) => {
            return (
                <div key={index} className="card">
                    <h2>{val.movieName}</h2>
                    <p>{val.movieReview}</p>

                    <button onClick={() => {deleteReview(index, val.movieName)}}>Delete</button>
                    <input
                    type="text"
                    id="updateInput"
                    value={newReview} 
                    onChange={(e) => {
                        setNewReview(e.target.value)}}/>
                    <button onClick={() => {
                        updateReview(val.movieName)}}>Update</button>
                </div>
            );
        })}
        </div>
    </div>
  );
}

export default App;
