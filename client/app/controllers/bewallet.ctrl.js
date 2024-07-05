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
      success: "fas fa-check",
      failed: "fas fa-times",
    };

    $scope.operators = [];

    $scope.callbacks = [];

    $http
      .get("/api/callbacks")
      .then(
        function (response) {
          this.callbacks = response.data;
          console.log(this.callbacks);
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Error fetching callbacks:", error);
      });

    // $http
    //   .get("../data/callbacks.json")
    //   .then(
    //     function (response) {
    //       this.callbacks = response.data;
    //       console.log(this.callbacks);
    //     }.bind(this)
    //   )
    //   .catch(function (error) {
    //     console.error(error);
    //   });

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
