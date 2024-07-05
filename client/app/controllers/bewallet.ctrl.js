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

    $scope.operators = [];

    $scope.callbacks = [];

    $http
      .get("/api/callbacks")
      .then(function (response) {
        $scope.callbacks = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching callbacks:", error);
      });

    $scope.submit = function () {
      $http
        .post("/api/payment", $scope.formData)
        .then(function (response) {
          window.location.href = response.data.payment_url;
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  });
