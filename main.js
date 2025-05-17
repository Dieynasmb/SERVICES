// main.js

import { db } from "./firebase.js";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const form = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    responseMessage.textContent = "Veuillez remplir tous les champs.";
    responseMessage.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      timestamp: Timestamp.now()
    });

    responseMessage.textContent = "Message envoyé avec succès ! Merci.";
    responseMessage.style.color = "green";
    form.reset();

  } catch (error) {
    responseMessage.textContent = "Erreur lors de l'envoi, réessayez plus tard.";
    responseMessage.style.color = "red";
    console.error("Erreur Firestore:", error);
  }
});
