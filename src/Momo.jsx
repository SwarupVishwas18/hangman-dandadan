import { FaHeart } from "react-icons/fa";
import momo from "./assets/momo/momo.png"
import ufo from "./assets/momo/ufo.png"
import alien_chat from "./assets/momo/alien.png"
import okarun_wrong from "./assets/momo/okarun-wrong.jpg"
import okarun_correct from "./assets/momo/okarun-correct.png"
import "./Momo.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";

function Momo() {

    const [targetText, setTargetText] = useState("")
    const [revealed, setRevealed] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState([]);
    const [okarunPic, setOkarunPic] = useState(okarun_correct)
    const [momoDialog, setMomoDialog] = useState("please help momo san!!!!")
    const [tgDialog, setTGDialog] = useState("me ballsss!!!!")
    const [dIndex, setDIndex] = useState(0)
    const [momoPos, setMomoPos] = useState(70)
    const [correctGuessTotal, setCorrectGuessTotal] = useState(6)
    const [isModalVisible, setIsModalVisible] = useState(0)

    const [allDialogs, setAllDialogs] = useState(null);

    useEffect(() => {
        fetch('./dialogues.json')
            .then((res) => {
                console.log(res);
                return res.json()

            })
            .then((json) => setAllDialogs(json))
            .catch((err) => console.error('Failed to load JSON:', err));
    }, []);

    useEffect(() => {
        axios.request("https://random-word-api.herokuapp.com/word?length=5").then((data) => {
            setTargetText(data.data[0].toUpperCase())
            setRevealed(Array(data.data[0].length).fill(false))
            console.log(data.data[0]);
        })
    }, [])

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toUpperCase();
            if (!/^[A-Z]$/.test(key) || !targetText) return;

            let matched = false;
            const newRevealed = revealed.map((isRevealed, index) => {
                if (targetText[index] === key) {
                    matched = true;
                    return true;
                }
                return isRevealed;
            });

            if (matched) {
                setRevealed(newRevealed);
                setMomoDialog(allDialogs.momo_side.correct_guess[dIndex].okarun)
                setTGDialog(allDialogs.momo_side.correct_guess[dIndex].aliens)
                if (dIndex >= 4) {
                    setDIndex(0)
                } else {
                    setDIndex(dIndex => dIndex + 1)
                }

                const allTrues = revealed.filter(rev => rev == true)
                if (allTrues.length == revealed.length) setIsModalVisible(1)
                setOkarunPic(okarun_correct)
            } else if (!wrongGuesses.includes(key)) {
                setWrongGuesses((prev) => [...prev, key]);
                setMomoDialog(allDialogs.momo_side.wrong_guess[dIndex].okarun)
                setTGDialog(allDialogs.momo_side.wrong_guess[dIndex].aliens)
                if (dIndex >= 4) {
                    setDIndex(0)
                } else {
                    setDIndex(dIndex => dIndex + 1)
                }
                setMomoPos(momoPos => momoPos - 7.5)
                setOkarunPic(okarun_wrong)

                setCorrectGuessTotal(correctGuessTotal => correctGuessTotal - 1)

                if (correctGuessTotal <= 1) setIsModalVisible(-1)
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [revealed, wrongGuesses, targetText]);

    return (
        <div className="game-scene momo-side">
            {isModalVisible == 1 && <Modal msg="You did it, you save Okarun!!!" path="momo" />}
            {isModalVisible == -1 && <Modal msg={`You failed me: Word was ${targetText}`} path="momo" />}
            <div className="header-side">
                <div className="chat villain-chat">
                    <div className="chat-icon">
                        <img src={alien_chat} alt="" />
                    </div>
                    <div className="chat-bubble">
                        {tgDialog}
                    </div>
                </div>
                <div className="lives">

                    {Array.from({ length: correctGuessTotal }).map((_, index) => (
                        <FaHeart key={index} />
                    ))}
                </div>
            </div>
            <div className="momo" style={{ top: `${momoPos}%` }}>
                <img src={momo} alt="" />
            </div>
            <div className="ufo">
                <img src={ufo} alt="" />
            </div>
            <div className="bottom-left">
                <div className="words">
                    <div className="word">
                        <h2>
                            Failed Characters:
                        </h2>

                        <div className="failed-char">
                            {wrongGuesses.join(", ")}
                        </div>
                    </div>

                    <div className="word">
                        <h2>
                            Guessed Word:
                        </h2>

                        <div className="guessed-word">
                            {targetText.split("").map((char, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: "40px",
                                        height: "60px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "24px",
                                    }}
                                >
                                    {revealed[index] ? char : ""}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="chat side-chat">
                    <div className="chat-bubble">
                        {momoDialog}
                    </div>
                    <div className="chat-icon">
                        <img src={okarunPic} alt="" />
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Momo