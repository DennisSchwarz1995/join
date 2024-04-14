const STORAGE_TOKEN = "JYLSMO99MF505800VOUQ36W81ME0SSHGIE2XMQ3M";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Sets an item in the remote storage 
 * @param {string} key -The key for the item 
 * @param {any} value -The value of the item  
 * @returns {Promise} A promise that resolves to the response JSON 
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

/**
 * Gets an item from the remote storage 
 * @param {string} key -The key for the item to get
 * @returns {Promise} -A promise that resolves to the retieved value  
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
};

/**
 * Saves contacts to the remote storage
 */
async function saveContact() {
  try {
    let contactsJSON = JSON.stringify(contacts);
    await setItem("contacts", contactsJSON);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Loads contacts from the remote storage
 */
async function loadContacts() {
  try {
    let contactsJSON = await getItem("contacts");
    let loadedContacts = JSON.parse(contactsJSON);
    if (loadedContacts) {
      contacts = loadedContacts;
    } 
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saves tasks to the remote storage
 */
async function saveTasks() {
  try {
    let tasksJSON = JSON.stringify(tasks);
    await setItem("tasks", tasksJSON);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Loads tasks from the remote storage
 */
async function loadTasks() {
  try {
    let tasksJSON = await getItem("tasks");
    let loadedTasks = JSON.parse(tasksJSON);
    if (loadedTasks) {
      tasks = loadedTasks;
    }
  } catch (error) {
    console.error(error);
  }
};

