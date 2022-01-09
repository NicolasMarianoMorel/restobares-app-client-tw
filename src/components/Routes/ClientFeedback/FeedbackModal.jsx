import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { postFeedback } from "../../../redux/actions";
import { useParams } from "react-router-dom";
// import {sockets} from "../../../redux/actions";

const FeedbackModal = ({ showModal, setShowModal }) => {

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);

  
  const { idResto, idTable } = useParams();
  const dispatch = useDispatch();

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
    console.log(ratingValue);
  };

  const changeModal = async (e) => {
    e.preventDefault();
    await dispatch(postFeedback(idResto, idTable, comment, rating));
    setShowModal((prev) => !prev);
    //sockets van acá
  };

  const NotFeed = () =>{
    
    setShowModal((prev) => !prev);
  } 

  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (<>

{/* 
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={100}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label> */}

          {showModal ? (<div className="fixed -mt-40 inset-0 bg-black bg-opacity-40 pt-60 ">
      <div className="relative w-8/12 mx-auto h-72 bg-pink-800  border-2 border-pink-900 rounded-3xl ">
        
        <h1 className='my-4 text-white'>We appreciate your feedback!</h1>
      <div className="mx-4">
        <label>
          <textarea onChange={(e)=> setComment(e.target.value)} className="bg-pink-900 w-full h-36 rounded-xl text-white text-xl px-1.5 resize-none" maxlength="100"></textarea>
        </label>
        <button onClick={(e) => changeModal(e)}className="float-left bg-pink-900 text-white rounded-xl ml-2 px-4 mt-2 ">
          Send
        </button>
        <button onClick={NotFeed} className="float-right bg-pink-900 text-white rounded-xl mr-2 px-4 mt-2 ">
          No
        </button>
        <div className="flex mt-12 justify-center items-center">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
      </div>
      
       
        </div>  
      </div>) : null }

        </>
        );
        
      })}
    </div>
  );
};

export default FeedbackModal;