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
      callback: window.env.callbackUrl,
      success_url: window.env.successUrl,
      cancel_url: window.env.cancelUrl,
    };

    this.$onInit = function () {
      $http
        .get("../data/operators.json")
        .then(
          function (response) {
            this.operators = response.data;
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
        }
      }
      $scope.$parent.submit(this.formData);
    };
  },
});
