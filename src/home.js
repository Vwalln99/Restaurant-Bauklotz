import _ from 'lodash';
import { createTag, createHeader, createFooter } from './modules/functions.js';
import './normalize.css';
import './styles.css';

function createHomeContent(){
    const home_section = createTag(null, "section", "home_section");
    const homeh1 = createTag(home_section, "h1", null, "homeh1", "Herzlich Willkommen im Restaurant Bauklotz!");
    const homeh2 = createTag(home_section, "h3", null, "homeh2", "Wie funktioniert das ganze?");
    const homeText = createTag(home_section, "p", null, "home_text", 
    "Wähle dein Gericht"+ "<br>"+
    "Wähle deine Lieblingszutaten"+ "<br>"+
    "Wähle dein Getränk"+ "<br>"+
    "Überprüfe deine Bestellung"+ "<br>"+
    "Wenn alles passt, sende deine Bestellung ab und jetzt heißt es nur noch warten!"+ "<br>"+
    "Mahlzeit!");
}




export{createHomeContent};