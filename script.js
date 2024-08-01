let username = '';
let queries = [];

// Load queries from JSON file
fetch('queries.json')
    .then(response => response.json())
    .then(data => {
        queries = data.queries;
        console.log('Queries loaded:', queries); // Debugging line
    })
    .catch(error => console.error('Error loading queries:', error));

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const issue = document.getElementById('issue').value;

    username = name;

    showChatContainer();
    addMessage('Bot', `Welcome, ${name} from ${company}! How can I help you with your issue: "${issue}"?`);

    // Ensure queries are loaded before suggesting queries
    if (queries.length) {
        suggestQueries(issue);
    } else {
        // Delay calling suggestQueries if queries aren't loaded yet
        setTimeout(() => suggestQueries(issue), 100);
    }
});

document.getElementById('send-btn').addEventListener('click', function() {
    const querySelect = document.getElementById('query-select');
    const query = querySelect.value;

    if (query) {
        if (query === 'all') {
            displayAllQueries();
        } else {
            addMessage(username, querySelect.options[querySelect.selectedIndex].text);
            getResponse(query);
        }
        querySelect.value = '';
    }
});



function showChatContainer() {
    document.getElementById('registration-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
}

function addMessage(sender, text, isLink = false, query = '') {
    const chatBody = document.getElementById('chat-body');
    const message = document.createElement('div');
    message.classList.add('chat-message', sender.toLowerCase());

    if (isLink) {
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = text;
        link.dataset.query = query;
        link.addEventListener('click', function(event) {
            event.preventDefault();
            addMessage(username, text);
            getResponse(query);
        });
        message.appendChild(link);
    } else {
        message.innerText = `${sender}: ${text}`;
    }

    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getResponse(query) {
    const response = queries.find(q => q.query === query)?.response || 'I don’t understand that query.';
    setTimeout(() => {
        addMessage('Bot', response);
    }, 1000);
}

function suggestQueries(issue) {
    const querySelect = document.getElementById('query-select');
    querySelect.innerHTML = '<option value="">Select your query...</option>';

    console.log('Suggesting queries for issue:', issue); // Debugging line

    queries.forEach(q => {
        const queryKeywords = q.text.toLowerCase().split(' ');
        const issueLower = issue.toLowerCase();
        if (queryKeywords.some(keyword => issueLower.includes(keyword))) {
            console.log('Adding query:', q.text); // Debugging line
            querySelect.innerHTML += `<option value="${q.query}">${q.text}</option>`;
        }
    });

    // Add common queries and option to show all queries
    querySelect.innerHTML += '<option value="all">Show all queries</option>';
}

function displayAllQueries() {
    addMessage('Bot', 'Here are all the available queries:');

    queries.forEach(q => {
        addMessage('Bot', q.text, true, q.query);
    });
}
