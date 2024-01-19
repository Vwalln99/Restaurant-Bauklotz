import _ from 'lodash';
import{createTag, createHeader, createFooter} from './modules/functions.js';
import './normalize.css';
import './styles.css';
"use strict";

function createContactContent() {

  
    const contact_section = createTag(null, "section", "contact_section");

    const contactText = createTag(contact_section, "p", null, "contact_text", "Kontaktieren Sie uns:");
    const desc= createTag(contact_section, "p", null, "desc", "Restaurant Bauklotz");
    const telNum=createTag(contact_section, "p", null, "telNumber", "01379 24 56 789")
    const address = createTag(contact_section, "p", null, "contact_address", "123 Musterstraße, 1234 Musterstadt");

  
    const textField = createTag(contact_section, "input", "message", "message_input");
    textField.type = "text";
    textField.placeholder = "Ihre Nachricht...";
    const sendButton = createTag(contact_section, "button", null, "send_button", "Senden");
  
    sendButton.addEventListener("click", () => {
      const message = textField.value;
      console.log("Nachricht gesendet: " + message);
    });



  }

export { createContactContent };
  