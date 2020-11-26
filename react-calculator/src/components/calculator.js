import React from 'react';
import CalculatorTitle from "./calculatorTitle";
import OutputScreen from "./outputScreen";
import Button from "./button";

function Calculator() {
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");

    const handleClick = (e) => {
        const value = e.target.innerText;
        switch (value) {
            case("="): {
                if (question) {
                    let ans = "";
                    try {
                        ans = eval(question);
                    } catch (err) {
                        ans = "Math Error"
                        setAnswer(ans);
                        break;
                    }
                    if (ans === undefined) {
                        setAnswer("Math Error")
                    } else {
                        setAnswer(ans);
                        setQuestion("");
                        break;
                    }
                }
            }
            case("Clear"): {
                setQuestion("");
                setAnswer("");
                break;
            }
            case("Delete"): {
                let newQuestion = question.substring(0, question.length - 1);
                setQuestion(newQuestion);
                break;
            }
            default: {
                let newQuestion = question + value;
                setQuestion(newQuestion);
                break;
            }
        }
    }

    return (
        <div>
            <CalculatorTitle/>
            <div>
                <OutputScreen question={question} answer={answer}/>

                <div>
                    <Button label="Clear" handleClick={handleClick}/>
                    <Button label="Delete" handleClick={handleClick}/>
                    <Button label="." handleClick={handleClick}/>
                    <Button label="/" handleClick={handleClick}/>
                </div>
                <div>
                    <Button label="7" handleClick={handleClick}/>
                    <Button label="8" handleClick={handleClick}/>
                    <Button label="9" handleClick={handleClick}/>
                    <Button label="*" handleClick={handleClick}/>
                </div>
                <div>
                    <Button label="4" handleClick={handleClick}/>
                    <Button label="5" handleClick={handleClick}/>
                    <Button label="6" handleClick={handleClick}/>
                    <Button label="-" handleClick={handleClick}/>
                </div>
                <div>
                    <Button label="1" handleClick={handleClick}/>
                    <Button label="2" handleClick={handleClick}/>
                    <Button label="3" handleClick={handleClick}/>
                    <Button label="+" handleClick={handleClick}/>
                </div>
                <div>
                    <Button label="0" handleClick={handleClick}/>
                    <Button label="=" handleClick={handleClick}/>

                </div>
            </div>

        </div>

    )
}

export default Calculator;