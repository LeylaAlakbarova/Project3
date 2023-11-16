let firstBtn1 = document.querySelectorAll("#from button");
let secBtn2 = document.querySelectorAll("#to button");

change = (e) => {
  for (element of e.target.parentNode.children) {
    element.style = "background-color: #fff; color: #C6C6C6;";
  }
  e.target.style = "background-color: #833AE0; color: #fff;";
};

firstBtn1.forEach((button) => {
  button.addEventListener("click", change);
});
secBtn2.forEach((button) => {
  button.addEventListener("click", change);
});




const currencyFirst = document.querySelector("#amount");

const firstSelect = document.querySelector("#from");
const secondSelect = document.querySelector("#to");

const currencySec = document.querySelectorAll("#amount")[1];

const currencyService = new CurrencyTool("RUB", "USD");

init();

function init() {
  document.addEventListener("DOMContentLoaded", () => {
    currencyService.exchange();
  });
  currencyFirst.addEventListener("input", exchangeCurrency);
  firstSelect.addEventListener("click", exchangeFrom);
  secondSelect.addEventListener("click", exchangeTo);
  currencyFirst.addEventListener("keyup", changeComma);
  currencySec.addEventListener("keyup", changeComma);
}

function changeComma(e) {
  if (e.target.value.includes(",")) {
    let newFilterComma = e.target.value.replace(",", ".");
    e.target.value = newFilterComma;
  }
}

function exchangeCurrency() {
  currencyFirst.value = currencyFirst.value.replace(/ /g, "");

  if (
    (currencyFirst.value.indexOf(",") == -1 || currencyFirst.value.indexOf(".") == -1) && currencyFirst.value.match(/[a-z&\/\\_^#@+()$~%'"`!|:*?<>{}-]/g)
  ) {
    currencyFirst.value = "";
    currencySec.value = "";
  } else {
    if (
      currencyFirst.value.indexOf(",") == -1 &&
      currencyFirst.value.indexOf(".") == -1
    ) {
      let _new = Number(currencyFirst.value);
      if (isNaN(_new)) {
        currencyFirst.value = "";
      } else {
        currencyFirst.value = _new;
      }

      currencyService.changeAmount(_new);
    } else {
      if (currencyFirst.value.indexOf(",")) {
        let _new = currencyFirst.value.replace(",", ".");
        currencyService.changeAmount(_new);
      }
    }
    currencyService.exchange().then((result) => {
      if (currencyFirst.value == 0) {
        currencySec.value = "";
      } else {
        currencySec.value = result;
      }
    });
  }
}

function exchangeFrom(e) {
  currencyService.changevalue1(e.target.textContent);

  currencyService
    .exchange()
    .then((result) => {
      if (currencyFirst.value == 0) {
        currencySec.value = "";
      } else {
        currencySec.value = result;
      }
    })
    .catch((err) => console.log(err));
}

function exchangeTo(e) {
  currencyService.changevalue2(e.target.textContent);

  currencyService
    .exchange()
    .then((result) => {
      if (currencyFirst.value == 0) {
        currencySec.value = "";
      } else {
        currencySec.value = result;
      }
    })
    .catch((err) => console.log(err));
}


