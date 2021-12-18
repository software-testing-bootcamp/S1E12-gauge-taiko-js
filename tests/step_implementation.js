/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    toRightOf,
    emulateDevice,
    $
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
    //await emulateDevice('iPhone 6')
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Sign in", async () => {
    await click('Üyelik');
    await write("wenoy99557@wolfpat.com", into(textBox(toRightOf("E-posta"))));
    await write("testing", into(textBox(toLeftOf("Üye Olmak İstiyorum"))));
    await click("Giriş", above("Şifremi Unuttum"));
    assert.ok(await text("Testing Bootcamp").exists());  //await is important on previous of every functions
});

step("Go to url", async () => {        // Not dinamic parameter
    await goto('cikolatasepeti.com');
});

step("Go to <url>", async (url) => {        // dinamic parameter
    await goto(url);
});

step("Click sign in on home page", async () => {    // Not dinamic parameter
    await click('Üyelik');
});

step("Click sign in on home page by using selector", async () => {
    await click(await $("//div[@class='container row mb5']//div[3]//div[1]//a[@class='button']")); //example for using selector, await is important. ($ is a selector function)
});

//Example for continueOnFailure step
step("Enter username: <username>", { continueOnFailure: true }, async (username) => {   // Example for dinamic parameter
    await write(username, into(textBox(toRightOf("E-posta"))));
});

step("Enter password: <password>", async (password) => {
    await write(password, into(textBox(toLeftOf("Üye Olmak İstiyorum"))));
});

step("Click sign in button", async () => {           //Not dinamic parameter
    await click("Giriş", above("Şifremi Unuttum"));
});

step("Click <button> which above to <key>", async (button, key) => {    //all dinamic parameter
    await click(button, above(key));
});

step("Click <button>", async (button) => {           //Example for dinamic parameter
    await click(button, above("Şifremi Unuttum"));
});

step("Username should be correct", async () => {
    assert.ok(text("Testing Bootcamp123").exists());
});

step(["Enter password is <password>", "Enter password: <password> to sign in"], async (password) => {   //Assign 2 steps to one function. Use any one.
    await write(password, into(textBox(toLeftOf("Üye Olmak İstiyorum"))));
});

step("Searchbox should be exist on home page", async () => {    
    assert.ok(await textBox("Çikolata Ara").exists());
});