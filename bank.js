
const categoryList = document.getElementById('categoryList')
const savedWords = document.getElementById('savedWords')
const sentenceDisplay = document.getElementById('sentence-display')

let sentence = []

// DISPLAY SAVED CATEGORIES
fetch('/api/categories')
    .then(response => response.json())
    .then(categories => {
        categories.forEach(category => {
            const li = document.createElement('li')
            li.textContent = category.categoryName
            categoryList.appendChild(li)
        })
    })
    .catch(error => console.log(error))

// DISPLAY SAVED WORDS
fetch('/api/words')
    .then(response => response.json())
    .then(words => {
        words.forEach(item => {
            const button = document.createElement('button')
            button.textContent = item.word

            button.addEventListener('click', () => {
                sentence.push(item.word)
                showSentence()
            })

            savedWords.appendChild(button)
        })
    })
    .catch(error => console.log(error))

// SENTENCE BUILDER
function showSentence() {
    sentenceDisplay.textContent = sentence.join(' ')
}

// SPEAK
document.getElementById('speak-btn').addEventListener('click', () => {
    speechSynthesis.cancel()
    const speech = new SpeechSynthesisUtterance(sentence.join(' '))
    speechSynthesis.speak(speech)
})

// UNDO
document.getElementById('undo-btn').addEventListener('click', () => {
    sentence.pop()
    showSentence()
})

// CLEAR
document.getElementById('clear-btn').addEventListener('click', () => {
    sentence = []
    showSentence()
})
