let username = '';

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const issue = document.getElementById('issue').value;

    username = name;

    showChatContainer();
    addMessage('Bot', `Welcome, ${name} from ${company}! How can I help you with your issue: "${issue}"?`);
    suggestQueries(issue);
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
    let response = '';
    switch(query) {
        case 'query1':
            response = 'To reset your password, go to the login page, click on "Forgot Password?" and follow the instructions sent to your registered email.';
            break;
        case 'query2':
            response = 'Check if you are entering the correct username and password. If you’ve forgotten your password, use the "Forgot Password?" option. If the issue persists, contact support.';
            break;
        case 'query3':
            response = 'Take a note of the error message and try refreshing the page. If the issue continues, please report it to customer support with details.';
            break;
        case 'query4':
            response = 'Just drop one email - "support-idp@infrrd.ai" and our support representative will reach out to you';
            break;
        case 'query5':
            response = 'Yes, we use encryption and comply with data protection regulations to ensure your data is secure. Please refer to our privacy policy for more details.';
            break;
        case 'query6':
            response = 'Our IDP Plateform is more suitable with the Desktop browser. However, it can be accessed from any mobile device through your web browser';
            break;
        case 'query7':
            response = 'To log out, click on the top right corner and select the "Log Out" option.';
            break;
        case 'query8':
            response = 'We welcome your feedback! You can submit your suggestions through the email - rahulapte@infrrd.ai or +91-087654315';
            break;
        
        default:
            response = 'I don’t understand that query.';
    }
    setTimeout(() => {
        addMessage('Bot', response);
    }, 1000);
}

function suggestQueries(issue) {
    const querySelect = document.getElementById('query-select');
    querySelect.innerHTML = '<option value="">Select your query...</option>';

    if (issue.toLowerCase().includes('password')) {
        querySelect.innerHTML += '<option value="query1">How do I reset my password?</option>';
    } 
    if (issue.toLowerCase().includes('log')) {
        querySelect.innerHTML += '<option value="query2">What should I do if I can’t log in?</option>';
    }
    if (issue.toLowerCase().includes('error')) {
        querySelect.innerHTML += '<option value="query3">What should I do if I encounter an error message?</option>';
    } 
    if (issue.toLowerCase().includes('contact')) {
        querySelect.innerHTML += '<option value="query4">How do I contact customer support?</option>';
    }
    if (issue.toLowerCase().includes('data')) {
        querySelect.innerHTML += '<option value="query5">Is my data secure on this platform?</option>';
    } 
    if (issue.toLowerCase().includes('Mobile')) {
        querySelect.innerHTML += '<option value="query6">Can I access the application from my mobile device?</option>';
    }
    if (issue.toLowerCase().includes('log')) {
        querySelect.innerHTML += '<option value="query7">How do I log out of my account?</option>';
    } 
    if (issue.toLowerCase().includes('feedback')) {
        querySelect.innerHTML += '<option value="query8">How can I provide feedback about the application?</option>';
    }

    // Add common queries and option to show all queries
    querySelect.innerHTML += '<option value="query8">Connect with support</option>';
    querySelect.innerHTML += '<option value="all">Show all queries</option>';
}

function displayAllQueries() {
    addMessage('Bot', 'Here are all the available queries:');

    const queries = [
       { text: 'How do I reset my password?', query: 'query1' },
        { text: 'What should I do if I can’t log in?', query: 'query2' },
        { text: 'What should I do if I encounter an error message?', query: 'query3' },
        { text: 'How do I contact customer support?', query: 'query4' },
        { text: 'Is my data secure on this platform?', query: 'query5' },
        { text: 'Can I access the application from my mobile device?', query: 'query6' },
        { text: 'How do I log out of my account?', query: 'query7' },
        { text: 'How can I provide feedback about the application?', query: 'query8' }
        
    ];

    queries.forEach(q => {
        addMessage('Bot', q.text, true, q.query);
    });
}
