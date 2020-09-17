// DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Get Quote From API
async function getQuote() {

    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
       // const response = await fetch(proxyUrl + apiUrl);
       const response = await fetch(apiUrl);
        const data = await response.json();
    //    console.log(data);

        if (quoteText.innerText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
     
        if (data.quoteAuthor.innerText === '') {
            authorText.innerText='Unknown';
         } else {
            authorText.innerText = data.quoteAuthor;  
        }      

    } catch(error) {
       // getQuote();
        console.log('whoops, no quote', error);
    }
} 

function tweetQuote() {
    const twitterUrl = `https://www.twitter.com/intent/?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// On Load
getQuote();
