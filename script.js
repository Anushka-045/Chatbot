async function sendMessage() {
	const input = document.getElementById('userInput').value;
	const responseDiv = document.getElementById('response');

	if (!input) {
		responseDiv.innerHTML = 'Please enter a message.';
		return;
	}

	responseDiv.innerHTML = 'Loading...';

	try {
		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer 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', // Replace with your actual API key
				'HTTP-Referer': 'https://www.sitename.com',
				'X-Title': 'SiteName',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'deepseek/deepseek-r1:free',
				messages: [{ role: 'user', content: input }],
			}),
		});

		const data = await response.json();
		console.log(data);
		const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
		responseDiv.innerHTML = marked.parse(markdownText);
		document.getElementById('userInput').value = '';
	} catch (error) {
		responseDiv.innerHTML = 'Error: ' + error.message;
	}
}
