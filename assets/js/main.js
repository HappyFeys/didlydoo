import { postEvent } from "./api";
import { Get, Set } from "./LocalStorage.js";
import { generateDom } from "./generateDom.js";

let evenement = Get("event", null)
generateDom(evenement)