import React, { useState, useEffect, useContext } from "react";
import '../App.css';
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../helper/AuthContext";

import { Post } from "../components/posts";

export const Crud = () => {
  console.log("App.jsのレンダリング");
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  const { authState } = useContext(AuthContext);
  useEffect(() => {
      Axios.get("http://localhost:3001/api/get").then((response) => {
        setMovieList(response.data);
      })
  }, []);

  // 投稿ボタン
  const submitReview = () => {
      // server側でリクエストのbodyに入ってくる
      Axios.post("http://localhost:3001/api/insert", {
          movieName: movieName,
          movieReview: review
      });
      // 配列に新たなオブジェクトを追加
      setMovieList([...movieReviewList,
        { movieName: movieName, movieReview: review }
      ]);
      setMovieName('');
      setReview('');
  };

  if(!authState){
      <Redirect to="/login" />
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
                    <Post
                    index={index}
                    movieName={val.movieName}
                    movieReview={val.movieReview}
                    movieReviewList={movieReviewList}
                    setMovieList={setMovieList}
                    />
                </div>
            );
        })}
        </div>
    </div>
  );
}
