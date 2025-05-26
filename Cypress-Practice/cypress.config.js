const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
    // retries: {
    //   runMode: 3,
    //   openMode: 2,
    // },
    // viewportHeight: 400,
    // viewportWidth: 400,
    video: true,
    projectId: "vhjes7",
  },
});
