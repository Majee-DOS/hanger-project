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
  user?: string;
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

export async function getProfile(userId) {
  const response = await fetch(`${rootURL}/profile/${userId}`);
  return response.json();
}

interface data {
  houseNo: string;
  street: string;
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
