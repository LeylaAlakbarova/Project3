const amountElementLeft = document.querySelector("#amount");

const firstSelect = document.querySelector("#from");
const secondSelect = document.querySelector("#to");

const amountElementRight = document.querySelectorAll("#amount")[1];

const currencyService = new CurrencyTool("RUB", "USD");

init();

function init() {
  document.addEventListener("DOMContentLoaded", () => {
    currencyService.exchange();
  });
  amountElementLeft.addEventListener("input", exchangeCurrency);
  firstSelect.addEventListener("click", exchangeFrom);
  secondSelect.addEventListener("click", exchangeTo);
  amountElementLeft.addEventListener("keyup", changeComma);
  amountElementRight.addEventListener("keyup", changeComma);
}

function changeComma(e) {
  if (e.target.value.includes(",")) {
    let newFilterComma = e.target.value.replace(",", ".");
    e.target.value = newFilterComma;
  }
}

function exchangeCurrency() {
  amountElementLeft.value = amountElementLeft.value.replace(/ /g, "");

  if (
    (amountElementLeft.value.indexOf(",") == -1 ||
      amountElementLeft.value.indexOf(".") == -1) &&
    amountElementLeft.value.match(/[a-z&\/\\_^#@+()$~%'"`!|:*?<>{}-]/g)
  ) {
    amountElementLeft.value = "";
    amountElementRight.value = "";
  } else {
    if (
      amountElementLeft.value.indexOf(",") == -1 &&
      amountElementLeft.value.indexOf(".") == -1
    ) {
      let _new = Number(amountElementLeft.value);
      if (isNaN(_new)) {
        amountElementLeft.value = "";
      } else {
        amountElementLeft.value = _new;
      }

      currencyService.changeAmount(_new);
    } else {
      if (amountElementLeft.value.indexOf(",")) {
        let _new = amountElementLeft.value.replace(",", ".");
        currencyService.changeAmount(_new);
      }
    }
    currencyService.exchange().then((result) => {
      if (amountElementLeft.value == 0) {
        amountElementRight.value = "";
      } else {
        amountElementRight.value = result;
      }
    });
  }
}

function exchangeFrom(e) {
  currencyService.changevalue1(e.target.textContent);

  currencyService
    .exchange()
    .then((result) => {
      if (amountElementLeft.value == 0) {
        amountElementRight.value = "";
      } else {
        amountElementRight.value = result;
      }
    })
    .catch((err) => console.log(err));
}

function exchangeTo(e) {
  currencyService.changevalue2(e.target.textContent);

  currencyService
    .exchange()
    .then((result) => {
      if (amountElementLeft.value == 0) {
        amountElementRight.value = "";
      } else {
        amountElementRight.value = result;
      }
    })
    .catch((err) => console.log(err));
}


let buttonsLeft = document.querySelectorAll("#from button");
let buttonsRight = document.querySelectorAll("#to button");

change = (e) => {
  for (element of e.target.parentNode.children) {
    element.style = "background-color: #fff; color: #C6C6C6;";
  }
  e.target.style = "background-color: #833AE0; color: #fff;";
};

buttonsLeft.forEach((button) => {
  button.addEventListener("click", change);
});
buttonsRight.forEach((button) => {
  button.addEventListener("click", change);
});
