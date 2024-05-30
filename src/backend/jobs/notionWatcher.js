// src/jobs/notionWatcher.js
const cron = require('node-cron');
const { Client } = require('@notionhq/client');
const { sendWebhookNotification } = require('../services/webhookService');
const { NOTION_API_KEY, NOTION_DATABASE_ID, WEBHOOK_URL } = process.env;

// Initializing a client
const notion = new Client({ auth: NOTION_API_KEY });

let lastSnapshot = [];

// Function to fetch the current snapshot from the Notion database
async function fetchCurrentSnapshot() {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID
  });
  return response.results;
}

// Function to compare the current snapshot with the last snapshot
function compareSnapshots(previous, current) {
  const previousIds = new Set(previous.map(item => item.id));
  const currentIds = new Set(current.map(item => item.id));

  const created = current.filter(item => !previousIds.has(item.id));
  const deleted = previous.filter(item => !currentIds.has(item.id));

  // For updated items, further comparison of fields would be necessary
  const updated = current.filter(item => previousIds.has(item.id) && JSON.stringify(item) !== JSON.stringify(previous.find(p => p.id === item.id)));

  return { created, deleted, updated };
}

// Function to trigger webhooks based on changes
async function triggerWebhooks(changes) {
  if (changes.created.length > 0 || changes.deleted.length > 0 || changes.updated.length > 0) {
    await sendWebhookNotification(WEBHOOK_URL, changes);
  }
}

// Schedule the job to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Checking Notion for updates...');
  try {
    const currentSnapshot = await fetchCurrentSnapshot();
    const changes = compareSnapshots(lastSnapshot, currentSnapshot);
    
    if (changes.created.length > 0 || changes.deleted.length > 0 || changes.updated.length > 0) {
      console.log('Changes detected:', changes);
      await triggerWebhooks(changes);
    } else {
      console.log('No changes detected.');
    }

    lastSnapshot = currentSnapshot; // Update the last snapshot
  } catch (error) {
    console.error('Error checking Notion updates:', error);
  }
});

module.exports = {
  fetchCurrentSnapshot,
  compareSnapshots,
  triggerWebhooks
};
