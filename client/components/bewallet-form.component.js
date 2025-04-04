angular.module("beWalletApp").component("bewalletForm", {
  templateUrl: "components/bewallet-form.component.html",
  controller: function ($scope, $http) {
    this.generateReference = function () {
      const prefix = "TEST";
      const timestamp = Date.now().toString();
      const randomString = Math.random().toString(36).substring(2, 7);
      const suffix = "CT1";
      return prefix + timestamp + randomString + suffix;
    };

    this.includePlayerId = false;
    this.merchantData = '';

    this.updateMerchantData = function() {
      if (this.includePlayerId) {
        this.merchantData = JSON.stringify({ playerID: '23432423' });
        this.formData.merchant_data = this.merchantData;
      } else {
        this.merchantData = '';
        this.formData.merchant_data = '';
      }
    };

    this.formData = {
      application_id: window.env.applicationId,
      application_secret: window.env.applicationSecret,
      reference: this.generateReference(),
      amount: 200,
      currency: "",
      phone: "",
      operator: "",
      email: "",
      first_name: "",
      callback: window.env.callbackUrl + "/api/payment",
      success_url: window.env.successUrl + "/success.html",
      cancel_url: window.env.cancelUrl,
      merchant_data: "" // Add merchant_data field to formData
    };

    this.$onInit = function () {
      $http
          .get("../data/operators.json")
          .then(
              function (response) {
                this.operators = response.data;
                console.log(this.operators);
              }.bind(this)
          )
          .catch(function (error) {
            console.error(error);
          });
    };

    this.submit = function () {
      if (this.formData.operator) {
        const selectedOperator = this.operators.find(
            (operator) => operator.code === this.formData.operator
        );
        if (selectedOperator) {
          this.formData.currency = selectedOperator.currency;
          console.log(this.formData);
        }
      }
      $http
          .post(
              window.env.bwtUrl + "/payments/checkout/init?locale=fr",
              this.formData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: "Bearer token",
                },
              }
          )
          .then(function (response) {
            window.location.href = response.data.payment_url;
          })
          .catch(function (error) {
            console.error(error);
          });
    };
  },
});