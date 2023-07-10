	const quoteTag = document.querySelector("h1");
	const quoteFrom = document.querySelector("p");
	const randomTag = document.querySelector("footer img");
	let data = [];

	fetch("quotes.json")
		.then(response => response.json())
		.then(jsonData => {
			data = jsonData;
			getQuote(); // Call getQuote() after the data is fetched and assigned
		})
		.catch(error => {
			console.log("Error fetching data:", error);
		});

		const getQuote = function() {
			// retrieve current quote to determine current id
			let previousQuote = quoteTag.innerHTML;
			let previousData = data.find(item => item.quote === previousQuote);
			let previousId = -1;
		
			if (previousData) {
				previousId = previousData.id;
			}
		
			// generate new random quote id
			let length = data.length;
			let newId = Math.floor(Math.random() * length) + 1;
		
			// compare current and previous id and regenerate new id if same
			while (newId === previousId) {
				newId = Math.floor(Math.random() * length) + 1;
			}
		
			// determine quote associated with new id
			let result = data.find(item => item.id === newId);
			quoteTag.innerHTML = result.quote;
			quoteFrom.innerHTML = "- " + result.from;
		
			// Add or remove "long" class based on quote length
			if (result.quote.length > 100) {
				quoteTag.classList.add("long");
				section.classList.add("long");
			} else {
				quoteTag.classList.remove("long");
				section.classList.remove("long");
			}
		};
		

	randomTag.addEventListener("click", function() {
	  getQuote();
	});