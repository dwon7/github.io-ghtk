

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const userInput = $("#username-input"),
    fnameInput = $("#fname-input"),
    emailInput = $("#email-input"),
    birthInput = $("#birth-input"),
    allInput = $$("input"),
    save = $("#btn-save"),
    reset = $("#btn-reset"),
    output = $("#output");

const api_url = "http://localhost:3000/api/user";

const userToObj = () => {
    var user = {
        userName : userInput.value,
        fullName : fnameInput.value,
        email : emailInput.value,
        birth : birthInput.value
    };
    console.log(user)
    return user;
   
};



const postUser = () => {
  axios.post(api_url, userToObj());
};

const clearInput = () => {
  allInput.forEach((element) => {
    element.value = "";
  });
};
const deleteUser=(id)=>{
   axios.delete(api_url+`/${id}`)
}

const runApp = () => {
  fetch(api_url)
    .then(function(res){
      return res.json();
    })
    .then(function(post) {
      displayListUser(post);
    }) 
    .catch(function(err) {
      console.log(err);
    })
}

const displayUser = (s, index) => {
  return `
    <tr key={index}>
        <td>${index + 1}</td>
        <td>${s.userName}</td>
        <td>${s.fullName}</td>
        <td>${s.email}</td>
        <td>${s.birth}</td>
        <td>
            <button class="btn btn-edit" id="btn-edit" type="button" onclick="editUser(${s.id})">Edit</button>
        </td>
        <td>
            <button class="btn btn-delete" id="btn-delete" onclick="deleteUser(${s.id})">Delete</button>
        </td>
    </tr>
    `;
};

const displayListUser = (data) => {
  let listUser = "";
  data.map((item, index) => {
    listUser += displayUser(item, index);
  });
  output.innerHTML = listUser;
};

const preEditUser = (id) => {
  axios.get(`api_url${id}`).then(res => {
    displayInfoUserForm(res.data);
    save.innerHTML = "Update";
    save.value = "update";
    save.setAttribute("valueId", id);
  }).catch(er => {
    console.log(er);
  });
  
}

const editUser = (id) => {
  axios
    .put(`api_url${id}`, userToObj())
    .then((res) => {
      console.log("Update successfully!");
      save.innerHTML = "Create";
      save.value = "create";
    })
    .catch((error) => {
      console.log(error);
    });
};

const displayInfoUserForm = (data) => {
  userName.value = data.userName;
  fullName.value = data.fname;
  email.value = data.email;
  birth.value = data.birth;

}


runApp();



save.addEventListener("click", postUser);
reset.addEventListener("click", clearInput);




