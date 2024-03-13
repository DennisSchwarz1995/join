const STORAGE_TOKEN = "JYLSMO99MF505800VOUQ36W81ME0SSHGIE2XMQ3M";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

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

async function saveContact() {
  try {
    let contactsJSON = JSON.stringify(contacts);
    await setItem("contacts", contactsJSON);
  } catch (error) {
    console.error(error);
  }
};

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

async function saveTasks() {
  try {
    let tasksJSON = JSON.stringify(tasks);
    console.log("savetask", tasksJSON)
    await setItem("tasks", tasksJSON);
  } catch (error) {
    console.error(error);
  }
};

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

