import React, { useState } from 'react';
import { useAppContext } from "../../context/AppContext";
import { IoIosMusicalNotes } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import styles from "./Recommendations.module.css";
import { GrPrevious } from "react-icons/gr";
import { FaPlay } from "react-icons/fa6";
import { GrNext } from "react-icons/gr";

function Recommendations() {
  const { currentWeatherData } = useAppContext();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  function getWeatherMood() {
    const weatherId = currentWeatherData?.weather[0].id;

    if (weatherId >= 200 && weatherId < 300) {
      return "Thunderstorm";
    } else if (weatherId >= 300 && weatherId < 600) {
      return "Rainy";
    } else if (weatherId >= 600 && weatherId < 700) {
      return "Snowy";
    } else if (weatherId >= 700 && weatherId < 800) {
      return "Atmosphere";
    } else if (weatherId === 800) {
      return "Clear";
    } else if (weatherId > 800 && weatherId < 900) {
      return "Cloudy";
    } else {
      return "Unknown";
    }
  }

  function getRecommendations() {
    const mood = getWeatherMood();
    switch (mood) {
      case "Rainy":
        return {
          songs: ["Raindrops Keep Fallin' on My Head", "Set Fire to the Rain", "Umbrella"],
          food: ["Hot Chocolate", "Soup", "Pakoras"],
        };
      case "Snowy":
        return {
          songs: ["Let It Snow!", "Winter Wonderland", "Do You Want to Build a Snowman?"],
          food: ["Hot Cocoa", "Stew", "Pancakes"],
        };
      case "Clear":
        return {
          songs: ["Here Comes the Sun", "Walking on Sunshine", "Sunny"],
          food: ["Ice Cream", "Salads", "Lemonade"],
        };
      case "Cloudy":
        return {
          songs: ["Cloudy Day", "Ain't No Sunshine", "Drive"],
          food: ["Coffee", "Cookies", "Grilled Cheese Sandwich"],
        };
      case "Thunderstorm":
        return {
          songs: ["Thunderstruck", "Riders on the Storm", "Stormy Weather"],
          food: ["Hot Tea", "Biscuits", "Comfort Food"],
        };
      default:
        return {
          songs: ["Somewhere Over the Rainbow", "Daydream", "Imagine"],
          food: ["Comfort Food", "Pastries", "Smoothies"],
        };
    }
  }

  const recommendations = getRecommendations();
  const currentSong = recommendations.songs[currentSongIndex];

  function handleNext() {
    setCurrentSongIndex((prevIndex) => 
      (prevIndex + 1) % recommendations.songs.length
    );
  }

  function handlePrevious() {
    setCurrentSongIndex((prevIndex) => 
      (prevIndex - 1 + recommendations.songs.length) % recommendations.songs.length
    );
  }

  function handlePlay() {
    alert(`Playing: ${currentSong}`);
  }

  return (
    <section className={styles.recommendations} aria-label="mood based recommendations">
      <h2 className={styles.tH} id="recommendations-label">
        Mood-based Recommendations
      </h2>
      <div>
        <div className={styles.row}>
          <div className={styles.box}>
            <span className={styles.headers}><h3>Recommended Songs</h3><IoIosMusicalNotes className={styles.icons}/><IoIosMusicalNotes/></span>
            <div className={styles.bottom}>
              <p className={styles.songName}>{currentSong}</p>
              <div>
              <div>
                <button className={styles.previous} onClick={handlePrevious}><GrPrevious /></button>
                <button className={styles.play} onClick={handlePlay}><FaPlay /></button>
                <button className={styles.next} onClick={handleNext}><GrNext /></button>
              </div>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <span className={styles.headers}><h3>Recommended Food </h3><IoFastFoodOutline className={styles.icons} /></span>
            <ul className={styles.foodList}>
              {recommendations.food.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recommendations;
