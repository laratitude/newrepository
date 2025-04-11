const axios = require('axios');

// Define your Jira credentials and the Jira API URL
const jiraUrl = 'https://cyranix-jira.atlassian.net';  // Your Jira domain
const username = 'hannanali@gmail.com';  // Your Jira email
const apiToken = 'ATATT3xFfGF0wB7M6Ga8OGXIQaUGAt1PD6CKFgPVsL3j7HzNIDusA3pCOJM6n9fFZfdA27xEo2pQk2Rca3ArbWdrYa6anRUOc1xys2hAPD9QtOurtzFGRWrg7TrOVpoK9n5mYqX_9OxF9ng8qRmeBp-kGixb_tftzD5Rmad5Rs8KmbN45Oblg8Y=A765AC74';  // Replace with your Jira API token

// Create a base64 encoded string for Jira Basic Authentication
const auth = 'Basic ' + Buffer.from(`${username}:${apiToken}`).toString('base64');

// Function to create a Jira ticket (issue)
const createJiraIssue = async (summary, description) => {
  const issueData = {
    fields: {
      project: {
        key: 'KAN'  // The project key (KAN in this case)
      },
      summary: summary,
      description: description,
      issuetype: {
        name: 'Task'  // The issue type (change to 'Bug' or 'Story' as needed)
      }
    }
  };

  try {
    const response = await axios.post(
      `${jiraUrl}/rest/api/3/issue`,
      issueData,
      {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Jira Issue Created:', response.data.key);
  } catch (error) {
    console.error('Error creating Jira issue:', error.response ? error.response.data : error.message);
  }
};

// Example call to create a Jira issue for failed login attempts
createJiraIssue(
  'Multiple failed login attempts by user "Ali Hannan"',
  'Detected multiple failed login attempts by user Ali Hannan. Please investigate the activity.'
);
