const rootURL = "http://localhost:3020";

interface regUser {
  name: String;
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
    .then((data) => localStorage.setItem("userId", data._id));
}

interface item {
  img: string;
  user?: string;
  title: string;
  desc: string;
  category: string;
  condition: string;
  price: string;
  size: string;
}

export async function addItem(item: item, userId) {
  const response = await fetch(`${rootURL}/addItem/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((data) => {
    localStorage.setItem("itemId", data._id); 
    localStorage.setItem("user", data.user)});
    return response
}

export async function getProfile(userId) {
  const response = await fetch(`${rootURL}/profile/${userId}`);
  return response.json();
}

interface data {
  houseNo: number;
  streetName: string;
  postCode: string;
  city: string;
}

export async function addAddress(data: data, userId) {
  const response = await fetch(`${rootURL}/update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data);

  return response;
}

interface img{
  img: any
}

export async function sendImage(img: img) {
  await fetch(`${rootURL}/upload/image`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(img)
  })
}

export async function displayAllItems() {
  const response = await fetch(`${rootURL}/allItems`);
  return response.json();
}

export async function myWardrobe(user) {
  const response = await fetch(`${rootURL}/wardrobe/${user}`);
  return response.json()
}