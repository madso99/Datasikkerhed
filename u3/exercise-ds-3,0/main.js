"use strict";
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt"); // Til hashing af adgangskoder
const Rockyou = require("./Rockyou.js.js");

const SALT_ROUNDS = 10; // Antal hashing-runder

// Opret forbindelse til SQLite
const db = new sqlite3.Database("./test.db", (err) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  }
});

// Funktion til at gemme brugernavn og hash-kodeord
const saveUser = (userid, hashedPassword) => {
  const sql = `INSERT INTO user (userid, password) VALUES (?, ?)`;

  db.run(sql, [userid, hashedPassword], (err) => {
    if (err) {
      console.error("❌ Error saving user:", err.message);
    } else {
      console.log(`✅ User "${userid}" saved successfully.`);
    }
  });
};

// Håndtering af terminalinput uden readline-sync
let inputData = [];

const askForUsername = () => process.stdout.write("Enter username: ");
askForUsername(); // Sørger for at prompten altid er synlig

process.stdin.on("data", (data) => {
  inputData.push(data.toString().trim());

  if (inputData.length === 1) {
    process.stdout.write("Enter password: ");
  } else {
    const userid = inputData[0]; // Brugernavn
    const password = inputData[1]; // Adgangskode

    if (Rockyou.isBadPassword(password)) {
      console.log("❌ Weak password! Choose a stronger one.");
      process.stdin.pause();
    } else {
      console.log(`✅ Password is secure. Hashing password for: ${userid}...`);

      // Hasher adgangskoden med bcrypt
      bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
        if (err) {
          console.error("❌ Error hashing password:", err.message);
        } else {
          saveUser(userid, hashedPassword);
        }
        process.stdin.pause(); // Stop input efter vi har gemt brugeren
      });
    }
  }
});
