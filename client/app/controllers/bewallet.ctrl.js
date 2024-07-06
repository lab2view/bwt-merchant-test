angular
  .module("beWalletApp")
  .controller("BeWalletCtrl", function ($scope, $http) {
    $scope.formData = {
      application_id: window.env.applicationId,
      application_secret: window.env.applicationSecret,
      reference: "TEST0000014",
      amount: 200,
      currency: "",
      phone: "",
      operator: "",
      email: "",
      first_name: "",
      callback: window.env.callbackUrl,
      success_url: window.env.successUrl,
      cancel_url: window.env.cancelUrl,
    };

    $scope.statusIcons = {
      pending: "fas fa-clock",
      SUCCESS: "fas fa-check",
      fail: "fas fa-times",
    };

    $scope.operators = [];

    $scope.callbacks = [];

    $http
      .get(window.env.callbackUrl + "/api/callbacks", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(
        function (response) {
          this.callbacks = response.data;
          this.callbacks = this.callbacks.map(function (item) {
            const data = JSON.parse(item.data);
            return {
              reference: item.reference,
              transaction_id: data.transactionId,
              amount: data.amount,
              status: data.status,
            };
          });
          console.log(this.callbacks);
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Error fetching callbacks:", error);
      });

    this.refreshCallbacks = function () {
      $http
        .get(window.env.callbackUrl + "/api/callbacks", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(
          function (response) {
            this.callbacks = response.data;
            this.callbacks = this.callbacks.map(function (item) {
              const data = JSON.parse(item.data);
              return {
                reference: item.reference,
                transaction_id: data.transactionId,
                amount: data.amount,
                status: data.status,
              };
            });
            console.log("Callbacks refreshed:", this.callbacks);
          }.bind(this)
        )
        .catch(function (error) {
          console.error("Error fetching callbacks:", error);
        });
    };

    $scope.submit = function () {
      $http
        .post(
          "https://staging-merchant.be-wallet.net/api/v2/payments/checkout/init?locale=fr",
          $scope.formData
        )
        .then(function (response) {
          window.location.href = response.data.payment_url;
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  });
