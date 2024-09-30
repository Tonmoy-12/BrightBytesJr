import React, { useState, useEffect } from "react";
import "./index.css"; // Assuming the CSS file is in the public folder
import Kanha from "../../assets/images/kanha.png";
import Step1 from "../../assets/images/step1.png";
import Step2 from "../../assets/images/step2.png";
import Final from "../../assets/images/final.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { showToast } from "../../utils/app.utils";
import Victory from "../../assets/audio/victory.mp3";
import GameOver from "../../assets/audio/gameover.mp3";
import BgMusic from "../../assets/audio/flute-music.mp3";

const GameLevel = () => {
  const [level, setLevel] = useState(1);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [hint, setHint] = useState("");
  const [gameSceneVisible, setGameSceneVisible] = useState(false);
  const [tutorialVisible, setTutorialVisible] = useState(false);
  const [posStyle, setPosStyle] = useState({
    left: undefined,
    bottom: undefined,
  });

  // Handle level number from URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const levelFromUrl = urlParams.get("level") || 1;
    setLevel(levelFromUrl);
  }, []);

    useEffect(() => {
      document.getElementById("bg-music").play().catch(err => console.log(err))
    }, [])



  const runCode = async () => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Check if the code is the correct code to print the first 5 even numbers and then the first 5 odd numbers and generate just a one-liner hint accordingly for the user, don't give any code or extra line. just ONE SENTENCED RESPONSE. If the code given by the user is correct, then show 'Correct code, congratulations!!'. The user's code is -" +
      code;

    const result = await model.generateContent(prompt);
    const res = result.response.text();
    if (res.includes("Correct code, congratulations!!")) {
      showToast(res, "success");
      setTimeout(function () {
        setPosStyle({
          left: "890px",
          bottom: "60px",
        });
      }, 500);
      setTimeout(function () {
        setPosStyle({
          left: "1040px",
          bottom: "50px",
        }); // 1 second pause at step1
      }, 1500);
      setTimeout(function () {
        setPosStyle({
          left: "1210px",
          bottom: "60px",
        }); // 1 second pause at step1
      }, 2500);
      setOutput(res);
      setCongratsVisible(true);
      setGameSceneVisible(true);
      document
        .getElementById("victory-music")
        .play()
        .catch((err) => console.error(err));
    } else {
      showToast(res);
      setPosStyle({
        left: "1040px",
        bottom: "50px",
      });
      setOutput("Incorrect code. Please try again.");
      setHint("Check the print statements and the range function.");
      setGameSceneVisible(true);
      document.getElementById("game-over-music").play();
    }
  };

  // Toggle tutorial video visibility
  const toggleTutorial = () => {
    setTutorialVisible(!tutorialVisible);
  };

  return (
    <div>
      <header>
        <h1>Python Basics - Level {level}</h1>
        <nav>
          <a href="/HTML/indexweb.html">Home</a>
          <a href="/HTML/course.html">Course</a>
          <a href="#">Profile</a>
        </nav>
      </header>
      <main>
        <h1
          style={{
            color: "rgb(17, 6, 237)",
            fontWeight: "bolder",
            fontSize: "xx-large",
            textAlign: "center",
          }}
        >
          # Write code to print the first 5 even numbers and then the first 5
          odd numbers
        </h1>
        <section id="code-editor-section">
          <h2 style={{ color: "rgb(10, 243, 10)", fontWeight: "bold" }}>
            Code Editor
          </h2>
          <textarea
            id="editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your Python code here..."
          />
          <button onClick={runCode}>Run Code</button>
        </section>
        <pre
          style={{
            color: "rgb(47, 235, 239)",
            fontWeight: "bold",
            fontSize: "x-large",
          }}
          id="output"
        >
          {output}
        </pre>
        {congratsVisible && (
          <div id="congratulations">
            <h2
              style={{
                color: "rgb(47, 235, 239)",
                fontWeight: "bold",
                fontSize: "xx-large",
              }}
            >
              Congratulations! Level {level} complete!
            </h2>
          </div>
        )}
        {hint && (
          <div id="hint-section">
            <p>{hint}</p>
          </div>
        )}
        {true && (
          <div id="game-scene">
            <img
              id="kanha"
              src={Kanha}
              alt="kanha"
              style={{
                position: "absolute",
                left: posStyle.left,
                bottom: posStyle.bottom,
              }}
            />
            <img id="step1" src={Step1} alt="Step 1" />
            <img id="step2" src={Step2} alt="Step 2" />
            <img id="final" src={Final} alt="final" />
          </div>
        )}
        <button id="watch-tutorial-button" onClick={toggleTutorial}>
          {tutorialVisible ? "Hide Tutorial" : "Watch Tutorial"}
        </button>
        {tutorialVisible && (
          <video id="tutorial-video" controls>
            <source src="/video/tutorial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <audio id="victory-music" src={Victory} preload="auto" />
        <audio id="game-over-music" src={GameOver} preload="auto" />
        <audio id="bg-music" src={BgMusic} autoPlay preload="auto" />
      </main>
    </div>
  );
};

export default GameLevel;
