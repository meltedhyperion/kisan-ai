# KISAN BANDHU

A personalized GenAI-IoT application that leverages different aspect of the farm through ther IoT devices and the other external features like geography, climate news, market trends, goverenement schemes and etc.

An Indian farmer will without any hassle be able to add his farm details and crops he grows in which season. 
A farmer can connect multiple IoT devices with sensors that would help in understanding different aspects of the 
land and the crops which are in ither ways not possible to quanitfiably analyse.

<code>Note: It supports native language of the farmer as well</code>

```
Our project involves IoT and disconnecting it might hamper with the working. 
We didnt get much time to make the IoT connection foolproof, but the architecture 
is something fun and interesting. Kindly do have a look and let us know if 
anything there can be any improvements.


We also faced some issues with Gemini Text to speech API and OAUTH 
(they were asking for 2-3 days for verification) so for the deployment 
we have removed that and ave kept only one user, just to check out the flow.

Once we get access, we will update that as well. Thanks
```
## Bandhu
Our IoT device, called Bandhu and synchronously add data for their farm for the farmer and Gemini can make analysis and keep the context for the same.

<img width="1192" height="669" alt="image" src="https://github.com/user-attachments/assets/027f6e97-1f92-421c-9445-ef42e2a4c1b4" />

# Architecture
<img width="6919" height="2977" alt="image" src="https://github.com/user-attachments/assets/17cc3e4d-3676-420d-86a4-be955a76106f" />

### **Application Frontend & Backend** 🖥️

* **UI:** The user-facing web app is built with **Next.js** and deployed on **Firebase Hosting**.
* **Users & App Data:** **Firebase Authentication** handles user login. **Cloud Firestore** stores user profiles, farm details, and other live application data.
* **API Server:** A central backend API, built with **Express.js**, runs on **Cloud Run** to serve requests from the web app.

---

### **IoT Data Ingestion Flow (Bandhu Bots)** 🚜

* **Device to Cloud:** Raspberry Pi "Bandhu Bots" securely send sensor data to **Cloud IoT Core**.
* **Messaging:** IoT Core forwards data to **Cloud Pub/Sub** for reliable, scalable message queuing.
* **Processing & Storage:** A **Cloud Function** triggers on new messages. It uses the **Vertex AI Gemini API** to analyze and average the 10-minute data, storing the clean inference in **BigQuery** and the raw data in **Cloud Storage**.

---

### **Web Data Ingestion Flow (News & Schemes)** 🌐

* **Scheduling:** **Cloud Scheduler** runs a job daily to fetch external information.
* **Fetching & Deduplication:** The job, running on **Cloud Run**, uses the **Custom Search API** to find articles. **Vertex AI** then creates vector embeddings and uses **Vector Search** to filter out semantic duplicates.
* **Warehousing:** Unique, relevant articles are stored in **BigQuery**.

---

### **AI Voice Assistant** 🎤

* **Voice Recognition:** User voice commands are converted to text using the **Vertex AI Speech-to-Text API**.
* **Intelligence:** The **Vertex AI Gemini API** understands the request, queries the app's data from Firestore and BigQuery, and generates a natural language response.
* **Voice Synthesis:** The text response is converted back to audio in the user's language via the **Vertex AI Text-to-Speech API**.

# Features

The application has 5 tabs:
1) Explore : Personalized news and meaningful information from the web that can have a potential impact on the Farmer. (AI Generated using farmer's context)
<img height="500" alt="image" src="https://github.com/user-attachments/assets/66021b12-d9ea-489e-8d82-cb4e7f695243" />

2) Alerts : Alerts on any negatively impactful event in the farm (irrigation level less than what is expected by the crop, pests, crop damage, disease, etc)or climatic or geographic that is personalized to the farmer.
<img height="500" alt="image" src="https://github.com/user-attachments/assets/54a9f070-020e-4944-8d30-591a227b0d16" />

3) Conversational AI agent : An agent with the complete context of the farmer and his crops and land and geography etc, which can give the farmer easy and quick insights limiting the need to look for heavy technical discussions.


4) My Farm : Portal to manage farms of a farmer. It is based on crop grown. One can addd mutliple bandhu bots to the farm which can collect data and send it to our AI architecture for structured context of the farmer.
<img height="500" alt="image" src="https://github.com/user-attachments/assets/25d2dbd5-690b-4abe-8c1f-ebd4108a7d04" />
<img height="500" alt="image" src="https://github.com/user-attachments/assets/64964ef1-0a65-434f-bcf1-cbd38134eba0" />
<img height="500" alt="image" src="https://github.com/user-attachments/assets/342202ff-ddb2-4da1-9755-c602a42cc69b" />

5) My profile : Farmer's account profile.

We can toggle the whole app between English (default) and the preferred language of the farmer registered during acount creation.

<img height="500" alt="image" src="https://github.com/user-attachments/assets/4a238710-b18c-4a38-b894-d034bf4eac38" />
<img height="500" alt="image" src="https://github.com/user-attachments/assets/e7df329f-c8c9-4d08-be85-d7995df14744" />
<img height="500" alt="image" src="https://github.com/user-attachments/assets/353bb616-ba53-4512-aaa4-8d9d018af8e6" />


