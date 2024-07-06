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

    this.callbacks = [];
    this.paginatedCallbacks = [];
    this.pageSize = 3;
    this.currentPage = 1;

    this.operators = [];

    this.callbacks = [];

    this.updatePagination = function () {
      this.totalPages = Math.ceil(this.callbacks.length / this.pageSize);

      this.currentPage = Math.min(
        Math.max(this.currentPage, 1),
        this.totalPages
      );

      const startIndex = (this.currentPage - 1) * this.pageSize;

      this.paginatedCallbacks = this.callbacks.slice(
        startIndex,
        startIndex + this.pageSize
      );
    };

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
          this.updatePagination();
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
            this.updatePagination();
            console.log("Callbacks refreshed:", this.callbacks);
            console.log(
              "Paginanted callbacks refreshed:",
              this.paginatedCallbacks
            );
          }.bind(this)
        )
        .catch(function (error) {
          console.error("Error fetching callbacks:", error);
        });
    };

    this.prevPage = function () {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagination();
      }
    };

    this.nextPage = function () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePagination();
      }
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
