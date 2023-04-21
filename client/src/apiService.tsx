import { useState } from "react";

const rootURL = "http://localhost:3020";

interface regUser {
  userName: string;
  email: string;
  password: string;
}

export async function createUser(user: regUser) {
  return await fetch(rootURL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => data);
}

interface item {
  UID?: string;
  title: string;
  desc: string;
  category: string;
  condition: string;
  price: string;
}

export async function addItem(item: item) {
  await fetch(rootURL + "/addItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));


    
}
