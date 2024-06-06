var userName = document.querySelector("#userName");
var userEmail = document.querySelector("#userEmail");
var userPass = document.querySelector("#userPass");
var signUpBtn = document.querySelector("#signUpBtn");
var hinttext = document.querySelector("#hinttext");
var loginSignupBtn = document.querySelector("button");
var passhelp = document.querySelector("#passhelp");
var homePage = document.querySelector("#homePage");
var loginsignuppages = document.querySelector("#loginsignuppages");
var userlogedin = document.querySelector("#userlogedin");
var inputsEmpty = document.querySelector("#inputsEmpty");
var emailExist = document.querySelector("#emailExist");
var emailOrPassNotValid = document.querySelector("#emailOrPassNotValid");
var emailNotExist = document.querySelector("#emailNotExist");
var passCheckAlert = document.querySelector("#passCheckAlert");
var recipes = document.querySelector("#recipes");

var userLogedInName;
var signUpMode = false;
var emailExistedFlag = false;
var passCheckFlag = false;
var users = JSON.parse(localStorage.getItem("users")) ?? [];

signUpBtn.addEventListener("click", function () {
  if (signUpMode == false) {
    registrationPage();
    clearInputs();
  } else {
    signInPage();
    clearInputs();
  }
});

loginSignupBtn.addEventListener("click", function () {
  if (signUpMode == false) {
    logIn();
  } else {
    storeRegistrationData();
  }
});
userEmail.addEventListener("blur", emailValidation);
userPass.addEventListener("blur", passwordValidation);

function logIn() {
  if (userEmail.value == "" || userPass.value == "") {
    inputsEmpty.classList.replace("d-none", "d-block");
  } else {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi.test(userEmail.value) &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/gi.test(
        userPass.value
      )
    ) {
      emailExistedCheck(users);
      passCheck(users);
      if (emailExistedFlag) {
        if (passCheckFlag) {
          for (var i = 0; i < users.length; i++) {
            if (users[i].email == userEmail.value) {
              userlogedin.innerHTML = users[i].name;
            }
          }
          homePage.classList.replace("d-none", "d-block");
          loginsignuppages.classList.replace("d-block", "d-none");

          clearInputs();
        }
        inputsEmpty.classList.replace("d-block", "d-none");
        emailOrPassNotValid.classList.replace("d-block", "d-none");
        emailNotExist.classList.replace("d-block", "d-none");
      } else {
        emailNotExist.classList.replace("d-none", "d-block");
        // console.log("email not existed");
      }
    } else {
      emailOrPassNotValid.classList.replace("d-none", "d-block");
    }
  }
}

function storeRegistrationData() {
  if (userName.value == "" || userEmail.value == "" || userPass.value == "") {
    inputsEmpty.classList.replace("d-none", "d-block");
  } else {
    emailExistedCheck(users);
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi.test(userEmail.value) &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/gi.test(
        userPass.value
      )
    ) {
      inputsEmpty.classList.replace("d-block", "d-none");
      emailOrPassNotValid.classList.replace("d-block", "d-none");

      if (!emailExistedFlag || users == 0) {
        setUserData();
        storeUserData(users);
        signInPage();
        clearInputs();
      }
    } else {
      emailOrPassNotValid.classList.replace("d-none", "d-block");
      inputsEmpty.classList.replace("d-block", "d-none");
    }
  }
}

function setUserData() {
  var user = {
    name: userName.value,
    email: userEmail.value,
    password: userPass.value,
  };
  users.push(user);
}

function storeUserData(arr) {
  localStorage.setItem("users", JSON.stringify(arr));
}

function registrationPage() {
  signUpMode = true;
  userName.classList.replace("d-none", "d-block");
  passhelp.classList.replace("d-none", "d-block");
  loginSignupBtn.innerHTML = "Sign Up";
  hinttext.innerHTML = "You have an account?";
  signUpBtn.innerHTML = "Sign In";
}

function signInPage() {
  signUpMode = false;
  userName.classList.replace("d-block", "d-none");
  passhelp.classList.replace("d-block", "d-none");
  loginSignupBtn.innerHTML = "Login";
  hinttext.innerHTML = "Don’t have an account?";
  signUpBtn.innerHTML = "Sign Up";
}

function emailExistedCheck(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == userEmail.value) {
      if (signUpMode) {
        emailExist.classList.replace("d-none", "d-block");
      }
      emailExistedFlag = true;
      break;
    } else {
      emailOrPassNotValid.classList.replace("d-block", "d-none");
      emailExist.classList.replace("d-block", "d-none");
      emailExistedFlag = false;
    }
  }
}
function emailValidation() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi.test(userEmail.value)) {
    userEmail.classList.remove("is-invalid");
    userEmail.classList.add("is-valid");
  } else {
    userEmail.classList.remove("is-valid");
    userEmail.classList.add("is-invalid");
  }
}

function passwordValidation() {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/gi.test(
      userPass.value
    )
  ) {
    userPass.classList.remove("is-invalid");
    userPass.classList.add("is-valid");
  } else {
    userPass.classList.remove("is-valid");
    userPass.classList.add("is-invalid");
  }
}

function passCheck(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].password == userPass.value) {
      if (!signUpMode) {
        passCheckAlert.classList.replace("d-block", "d-none");
      }
      passCheckFlag = true;
      break;
    } else {
      passCheckAlert.classList.replace("d-none", "d-block");
      inputsEmpty.classList.replace("d-block", "d-none");

      passCheckFlag = false;
    }
  }
}

function logout() {
  homePage.classList.replace("d-block", "d-none");
  loginsignuppages.classList.replace("d-none", "d-block");
}

function clearInputs() {
  userName.value = "";
  userEmail.value = "";
  userPass.value = "";
  userPass.classList.remove("is-invalid");
  userPass.classList.remove("is-valid");
}

// API section
var lemons = [];
var httpReq = new XMLHttpRequest();

httpReq.open("get", "https://forkify-api.herokuapp.com/api/search?q=lemon");
httpReq.send();

httpReq.addEventListener("readystatechange", function () {
  console.log(httpReq.readyState);
  if (httpReq.readyState == 4) {
    lemons = JSON.parse(httpReq.response).recipes;
    console.log(lemons);
    displayRecipes(lemons);
  }
});

function displayRecipes(arr) {
  var valueBox = "";
  for (var i = 0; i < arr.length; i++) {
    valueBox += ` 
         <div class="col pb-4">
            <div class="card border-0 shadow-lg rounded">
              <div class="card-img overflow-hidden">
                <img
                  src=${arr[i].image_url}
                  class="card-img-top rounded img-fluid"
                  alt="work-1"
                />
              </div>
              <div
                class="card-body row flex-wrap align-items-center justify-content-between mt-3"
                >
                <div class="card-content col-12 col-sm-8 pe-1">
                  <h6 class="card-title">${arr[i].title}</h6>
                  <div class="d-flex justify-content-between">
                    <a
                      href=${arr[i].publisher_url}
                      class="text-decoration-none"
                      >${arr[i].publisher}</a
                    >
                    <a
                      href=${arr[i].source_url}
                      class="text-decoration-none"
                      >Read More</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  }

  recipes.innerHTML = valueBox;
}
