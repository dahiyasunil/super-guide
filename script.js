const quoteEndPoint =
  "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const twitterUrl = `https://twitter.com/intent/tweet?text=`;

const quoteContainerElement = document.querySelector("#quoteContainer");
const quoteElement = document.querySelector("#quote");
const authorElement = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#newQuote");
const quoteTextElement = document.querySelector("#quoteAndAuthor");
const copyToClipboardElement = document.querySelector("#copyToClipboard");
const shareToTwitterElement = document.querySelector("#shareToTwitter");
const errMsgContainerElement = document.querySelector("#errMsgContainer");

//Enabling bootstrap tooptip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
);

function displayQuote(data) {
  if (data.success) {
    const { content: quote, author } = data.data;
    quoteElement.textContent = quote;
    quoteElement.className = "fs-4";
    quoteContainerElement.className = "p-5 rounded-3";
    authorElement.textContent = author;
  } else {
    quoteElement.textContent =
      "Could not get quote at the moment, please try again!";
  }
}

function displayError(errMsg) {
  quoteElement.textContent = errMsg;
}

function fetchQuote() {
  fetch(quoteEndPoint)
    .then((res) => res.json())
    .then((data) => displayQuote(data))
    .catch((err) => {
      displayError(
        `An error occured while trying to fetch quote! Please try again later.`,
      );
      console.error("Error while trying to fetch quote: ", err.message);
    });
}

// New Quote listener
newQuoteBtn.addEventListener("click", fetchQuote);

// Copy to clipboard listener
copyToClipboardElement.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteTextElement.textContent);
});

// Share to twitter listener
shareToTwitterElement.addEventListener("click", () => {
  const quoteContent = `${quoteElement.textContent.trim()} +\n+ -by ${authorElement.textContent.trim()}`;
  if (quoteContent !== "") {
    window.open(twitterUrl + quoteContent, "_blank");
  } else {
    errMsgContainerElement.textContent = "No Quote content available to share.";
    setTimeout(() => {
      errMsgContainerElement.textContent = "";
    }, 3000);
  }
});

// Ftech first quote on page load
fetchQuote();
