import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  //agr index ya people change hoge to uske hisab se mjhe page render krwana hoga
  useEffect(
    () => {
      //setIndex to this lastIndex during overflow or underflow condition
      let lastIndex = people.length - 1; //this is the last index of the people array
      if (index < 0)
        //agr hmara index less than 0 hojata hai to hm index ko lastIndex set krdege
        setIndex(lastIndex);
      if (index > lastIndex)
        //but agr hmara index lastIndex hojata hai to next click me use 0 me pahucha de
        setIndex(0);
    },
    [index, people] //on index or people change
  );

  //this will make the slider slide autoMatically
  useEffect(() => {
    //we have to get the slider's id so that we can stop it after one transition
    let slider = setInterval(() => {
      setIndex(index + 1);  //after 3s just update the index automatically
      console.log("change");
    }, 3000);
    console.log(slider);
    return () => clearInterval(slider);
  }, [index]  //index is changing here 
  );

  //render this component
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>
      <div className="section-center">
      {/* map over people arrray to render them all at one page but we won't show everyone at a time but added some css so as to hide other objects of people array only the className with 'activeSlide' would be visible */}
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;  //destructure each person of people array

          {/* setting the className of the person according to the current index which we are in  */}
          let position = "nextSlide";  

          {/* jis person pr abhi hm hai, if it is equals to curr index then that person will be activeSlide */}
          if (personIndex === index) 
            position = "activeSlide";

          {/* or baki slides ko hm accordingly lastSlide and nextSlide assign krdege */}
          if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = "lastSlide";
          }

          {/* after all this just render that person slide */}
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button
          className="prev"
          onClick={() => {
            // setIndex((index-1<0)?data.length-1:index-1) //this can also be done using useEffect but if we use this then we won't be able to use slide funcitonality rnow
            setIndex(index - 1);
          }}
        >
          <FiChevronLeft />
        </button>
        <button
          className="next"
          onClick={() => {
            // setIndex((index+1>data.length-1)?0:index+1)
            setIndex(index + 1);
          }}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
