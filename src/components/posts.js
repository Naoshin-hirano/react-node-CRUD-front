import React, { useState } from "react";
import Axios from "axios";

/**
 * 投稿一覧リスト
 * memo: propsが変化しない限りこのcomponentは再レンダリングしない
 * @returns 投稿一覧リストのcomponent
 */
export const Post = React.memo(({
    index,
    movieName,
    movieReview,
    movieReviewList,
    setMovieList
}) => {
    console.log("postのレンダリング");
    const [newReview, setNewReview] = useState('');

    // レビューコメントの更新
    const updateReview = (movieName) => {
        Axios.put("http://localhost:3001/api/update", {
          movieName: movieName,
          movieReview: newReview
        });
        // 更新レビュー入力から更新ボタン押下でレビュー更新入力欄が空欄に戻る
        setNewReview('');
        // レビュー更新後にDOM上でもレビューを更新
        setMovieList((prevState) => 
          prevState.map((obj) => 
          (obj.movieName === movieName ? {movieName: movieName, movieReview: newReview} : obj))
        );
    };

    // 投稿の削除
    const deleteReview = (index, movie) => {
        Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  
        const movieReviews = [...movieReviewList]
        movieReviews.splice(index, 1);
        setMovieList(movieReviews);
    };

    return (
        <>
            <h2>{movieName}</h2>
            <p>{movieReview}</p>
            <button onClick={() => {deleteReview(index, movieName)}}>Delete</button>
            <input
            type="text"
            id="updateInput"
            value={newReview}
            onChange={(e) => {
                setNewReview(e.target.value)}}/>
            <button onClick={() => {updateReview(movieName)}}>Update</button>
        </>
    )
});