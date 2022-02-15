import { strictEqual } from "assert";
import { client } from "..";
import { EMOJI_CODES, letterCodes, colorCodes, words } from "./constants";


interface checkWord {
    answer: string |boolean
    used: string
}

const checkWord = (guessWord:string, answer:string, usedLetters:string): checkWord => {

    let letterIntensityMap  = new Map<string,number>()
    Array.from(answer).forEach(letter => {
            
        let currentValue = letterIntensityMap.get(letter);
        if (!currentValue) currentValue = 0 
        letterIntensityMap.set(letter, currentValue + 1 )
    })
    const guessArray = Array.from(guessWord.toLowerCase())
        const answerArray = Array.from(answer.toLowerCase())
        let answerWord:string |boolean = ''
        let usedLetterCount: number = 0
        for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
            const guessLetter = guessArray[letterIndex];
            const answerLetter = answerArray[letterIndex];
            const currentValue = letterIntensityMap.get(guessLetter)
            const greenEmoji = EMOJI_CODES.green[guessLetter as letterCodes]
            const yellowEmoji = EMOJI_CODES.yellow[guessLetter as letterCodes]
            const grayEmoji = EMOJI_CODES.gray[guessLetter as letterCodes]
            if (currentValue && currentValue > 0){
                    if (guessLetter == answerLetter){

                    answerWord += greenEmoji
                    letterIntensityMap.set(guessLetter, currentValue - 1 )
                    continue
                    
                }
                    else {
                    answerWord += yellowEmoji
                    
                    
                    }
                    letterIntensityMap.set(guessLetter, currentValue - 1 )
            }
            else{
                answerWord += grayEmoji
                
                if (usedLetters.startsWith('N')) usedLetters = grayEmoji
                if(!usedLetters.includes(grayEmoji)) usedLetters += grayEmoji

            }
        }
        if (answerWord.includes('undefined')){
            answerWord = false}
            usedLetters.replace(Array.from(usedLetters)[-27] ,Array.from(usedLetters)[-27] + "\n")
            console.log(usedLetters);
            
            return {used:usedLetters, answer:answerWord}
        }



const handleGame = (gameState:boolean| null, round:number, guessWord:string, answer:string) => {

    if (round >= 5) gameState = false;
    if (guessWord == answer) gameState = true;
    return gameState
}

function getRandomInt(words:string[]) {
    let min:number = 0
    let max:number = words.length
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }


export {checkWord, handleGame, getRandomInt}