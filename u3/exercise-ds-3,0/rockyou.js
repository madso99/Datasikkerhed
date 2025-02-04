"use strict";
const fs = require("fs");

/*
 * Rockyou as Singleton, lean and mean
 */
class Rockyou {
  static rockyou = ""; // Indlæser rockyou.txt én gang
  static #filename = "./rockyou.txt";

  static getRockyou() {
    if (Rockyou.rockyou === "") {
      console.log("✅ Loading rockyou.txt...");
      Rockyou.rockyou = fs.readFileSync(Rockyou.#filename, "utf8");
    }
  }

  static isBadPassword(password) {
    Rockyou.getRockyou(); // Sikrer, at rockyou.txt er indlæst
    return (
      Rockyou.rockyou.includes(`\n${password}\n`) ||
      Rockyou.rockyou.startsWith(`${password}\n`) ||
      Rockyou.rockyou.endsWith(`\n${password}`)
    );
  }
}

module.exports = Rockyou;
