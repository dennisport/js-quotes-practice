document.addEventListener("DOMContentLoaded", function() {
const QUOTES = "http://localhost:3000/quotes?_embed=likes"
const quoteList = document.querySelector("#quote-list")
const quoteForm = document.querySelector("#new-quote-form")

const newQuote = document.querySelector("#new-quote")
const newAuthor = document.querySelector("#author")

quoteForm.addEventListener("submit", () => {
    event.preventDefault
    let quote = newQuote.value
    let author = newAuthor.value
    
    addNewQuote({ quote, author})
})

function addNewQuote(quote) {
    fetch(QUOTES, {
        method: 'POST',
        body: JSON.stringify(quote),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(reponse => response.json())
    .then(quote => displayQuote(quote))
}

function ce(element) {
return document.createElement(element)
}

function showQuotes () {
    fetch(QUOTES) 
    .then(response => response.json() )
    .then(quotes => { 
        quotes.forEach(quote => { 
        displayQuote(quote)
    })
})
}

function displayQuote(quote) {
    const li = ce("li")
    li.classname = "quote-card"

    const bq = ce("bq")
    bq.classname = "blockquote"

    const p = ce("p")
    p.innerText = quote.quote

    const footer = ce("footer")
    footer.innerText = quote.author

    const btn = ce('button')
    btn.classname = "btn-success"
    btn.innerText = "Like Quote"

    const dlt = ce('button')
    dlt.innerText = "Delete Quote"

    const quoteLikes = ce("p")
    quoteLikes.innerText = `Likes: ${quote.likes.length}`

    deleteFunction(dlt, quote, li)

    bq.append(p, footer, quoteLikes, btn, dlt)
    li.append(bq)
    quoteList.append(li)
}

function deleteFunction(dlt, quote, li) {
    dlt.addEventListener('click', event => {
        removeQuote(quote).then(li.remove())
    })
}

function removeQuote(quote) {
    return fetch(`http://localhost:3000/quotes/${quote.id}/?_embed=likes`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


showQuotes()
} )