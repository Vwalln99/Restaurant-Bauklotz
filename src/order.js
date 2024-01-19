import _ from 'lodash';
import { createTag, createHeader, createFooter } from './modules/functions.js';
import './normalize.css';
import './styles.css';

"use strict";

function createCustomizableItem(parent_node, item) {
  const saladIngredients = ["Vogerlsalat", "Blattsalat", "Roccula", "Jungspinat", "Tomaten", "Karotten", "Kartoffelsalat", "Kernöl", "Olivenöl", "Balsamico", "Apfelessig"];
  const pizzaIngredients = ["Tomaten", "Pfefferoni", "Ananas", "Artischocken", "Champignons", "Mais", "Oliven", "Kapern", "Salami", "Schinken", "Thunfisch", "Tofu", "Gouda", "Blauschimmelkäse", "Feta", "Parmesan"];
  const pastaIngredients = ["Penne", "Spaghetti", "Gnocchi", "Tomatensauce", "Sahnesauce", "Pesto", "Artischocken", "Champignons", "Paprika", "Spinat", "Curry", "Blauschimmelkäse", "Feta", "Parmesan", "Tofu", "Schinken"];
  const drinks = ["Wasser", "Mineralwasser", "Limonade", "Soda Zitrone", "Coca-Cola", "Fanta", "Sprite", "Bier 0,3L", "Bier 0,5L", "Weißwein 1/4", "Rotwein 1/4"];

  const customizableItemDiv = createTag(parent_node, "div", null, "customizable-item");

  const itemName = createTag(customizableItemDiv, "h2", null, null, item.getName());
  const itemPrice = createTag(customizableItemDiv, "p", null, null, "Preis: €" + item.getPrice());

  const ingredientsDiv = createTag(customizableItemDiv, "div", null, "ingredients");
  const addIngredientBtn = createTag(ingredientsDiv, "button", null, "add-ingredient-btn", "Zutaten hinzufügen");

  const selectedIngredientsDiv = createTag(customizableItemDiv, "div", null, "selected-ingredients");

  addIngredientBtn.addEventListener("click", () => {
    if (item.getType() === "Salat") {
      showIngredientsList(item, selectedIngredientsDiv, saladIngredients);
    } else if (item.getType() === "Pizza") {
      showIngredientsList(item, selectedIngredientsDiv, pizzaIngredients);
    } else if (item.getType() === "Pasta") {
      showIngredientsList(item, selectedIngredientsDiv, pastaIngredients);
    } else if (item.getType() === "Getränke") {
      showIngredientsList(item, selectedIngredientsDiv, drinks);
    } else {
      console.log(item.getType());
    }
  });

  const submitOrderBtn = createTag(customizableItemDiv, "button", null, "submit-order-btn", "Absenden");
  submitOrderBtn.addEventListener("click", () => {
    submitOrder(selectedIngredientsDiv, item);
  });

  customizableItemDiv.appendChild(submitOrderBtn);
}

function showIngredientsList(item, selectedIngredientsDiv, ingredientsList) {
  const ingredientsChecklistDiv = createTag(null, "div", null, "ingredients-checklist");

  ingredientsList.forEach((ingredient) => {
    const label = createTag(ingredientsChecklistDiv, "label", null, null, ingredient);

    const checkbox = createTag(label, "input", null, "ingredient-checkbox");
    checkbox.type = "checkbox";
    checkbox.value = ingredient;

    label.appendChild(checkbox);

    ingredientsChecklistDiv.appendChild(label);
    ingredientsChecklistDiv.appendChild(document.createElement("br"));
  });

  const submitBtn = createTag(ingredientsChecklistDiv, "button", null, "submit-ingredients-btn", "Hinzufügen");
  submitBtn.addEventListener("click", () => {
    updateSelectedIngredients(item, ingredientsChecklistDiv, selectedIngredientsDiv);
  });

  selectedIngredientsDiv.appendChild(ingredientsChecklistDiv);
}

function updateSelectedIngredients(item, ingredientsChecklistDiv, selectedIngredientsContainer) {
  console.log("Before update:", item.selectedIngredients);
  const checkboxes = ingredientsChecklistDiv.querySelectorAll(".ingredient-checkbox");

  let atLeastOneIngredientSelected = false;

  checkboxes.forEach((checkbox) => {
    const ingredient = checkbox.value;
    if (checkbox.checked) {
      atLeastOneIngredientSelected = true;
      item.selectedIngredients.push(ingredient);
    }
    checkbox.checked = false;
  });

  if (!atLeastOneIngredientSelected) {
    selectedIngredientsContainer.textContent = "Wähle mindestens eine Zutat aus!";
  } else {
    selectedIngredientsContainer.textContent = "";
  }

  console.log("After update:", item.selectedIngredients);
  displaySelectedIngredients(item.selectedIngredients, selectedIngredientsContainer);
}


function displaySelectedIngredients(selectedIngredients, selectedIngredientsContainer) {
  console.log('Selected Ingredients', selectedIngredients);
  selectedIngredients.forEach((ingredient) => {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.textContent = ingredient;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Entfernen";
    removeButton.addEventListener("click", () => {
      console.log("Item wurde gelöscht");
      console.log(ingredient);

      selectedIngredients.splice(ingredient, 1);

      ingredientDiv.remove();
    });
    ingredientDiv.appendChild(removeButton);
    selectedIngredientsContainer.appendChild(ingredientDiv);
  });
}

function submitOrder(selectedIngredientsDiv, item) {
  if (item.selectedIngredients.length > 0) {
    console.log("Bestellung abgesendet:", item.selectedIngredients);
    displayOrderSubmittedMessage(selectedIngredientsDiv);
  } else {
    console.log("Wähle mindestens eine Zutat aus!");
  }
}

function displayOrderSubmittedMessage(selectedIngredientsDiv) {
  const submitMessage = createTag(selectedIngredientsDiv, "p", null, "submit-message", "Bestellung erfolgreich abgesendet!");
}

export { createCustomizableItem, showIngredientsList, updateSelectedIngredients };
