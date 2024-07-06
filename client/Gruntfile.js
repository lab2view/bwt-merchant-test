module.exports = function (grunt) {
  require("dotenv").config();
  grunt.initConfig({
    env: {
      applicationId: process.env.APPLICATION_ID,
      applicationSecret: process.env.APPLICATION_SECRET,
      callbackUrl: process.env.CALLBACK_URL,
      successUrl: process.env.SUCCESS_URL,
      cancelUrl: process.env.SUCCESS_URL,
      bwtUrl: process.env.BWT_URL,
    },
    template: {
      config: {
        options: {
          data: "<%= env %>",
        },
        files: {
          "./env.js": ["./env.template.js"],
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-template");

  grunt.registerTask("default", ["template:config"]);
};
