class CurrencyTool {
    constructor(value1, value2) {
      this.value1 = value1;
      this.value2 = value2;
      const apiKey = "c3d7de20d0b8011402553c94";
      this.url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
      this.amount = null;
    }
    alert(message) {
      const div = document.createElement("div");
      div.textContent = message;
      div.className = "alert alert-danger";
      div.style.display = "block";
  
      const section = document.querySelector(".main");
  
      section.append(div);
  
      setTimeout(() => {
        div.style.display = "none";
      }, 1000);
  
      firstAmount.value = "";
    }
  
    exchange() {
      return new Promise((resolve, reject) => {
        fetch(this.url + this.value1)
          .then((res) => res.json())
          .then((data) => {
            let datas = data.conversion_rates;
            const rate = datas[this.value2];
            const newAmount = Number(this.amount);
            let result = (rate * newAmount).toFixed(4);
            let fromRate = document.querySelector("#fromRate");
            let toRate = document.querySelector("#toRate");
            fromRate.textContent = `1 ${this.value1} = ${rate.toFixed(4)} ${this.value2}`;
            toRate.textContent = `1 ${this.value2} = ${(1 / rate).toFixed(4)} ${this.value1}`;
  
            resolve(result);
          })
          .catch((err) => {
            this.alert("Check your connection!");
            reject(err);
          });
      });
    }
    changeAmount(amount) {
      this.amount = amount;
    }
  
    changevalue1(fromCurrency) {
      this.value1 = fromCurrency;
    }
  
    changevalue2(toCurrency) {
      this.value2 = toCurrency;
    }
  }
  