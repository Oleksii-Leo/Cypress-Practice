const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",
    // retries: {
    //   runMode: 3,
    //   openMode: 2,
    // },
    // viewportHeight: 400,
    // viewportWidth: 400,
    video: true,
    projectId: "vhjes7",
  },
  //});

  env: {
    Auth_UserName: "guest",
    Auth_Password: "welcome2qauto",
    TEST_USER_EMAIL: "johnywalker3@gmail.com",
    TEST_USER_PASSWORD: "Qwerty123",
  },
});
