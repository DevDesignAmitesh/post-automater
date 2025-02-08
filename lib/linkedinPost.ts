import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { launch } from "puppeteer";

puppeteer.use(StealthPlugin());

// Helper function to wait for a specified time (in milliseconds)
const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to convert file path for cross-platform compatibility
const convertFilePath = (filePath: any) => {
  const normalizedPath = filePath.replace(/\\/g, "/");
  return normalizedPath;
};

export const linkedinPost = async (
  content: any,
  imgOrVideoPath: any,
  email: any,
  password: any
) => {
  const browserlessUrl = `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`; // Replace with your Browserless API key
  console.log(browserlessUrl);
  console.log(content, imgOrVideoPath);

  let browser;
  try {
    // Launch the browser using Browserless.io WebSocket
    console.log("Connecting to Browserless...");
    browser = await launch({
      browserWSEndpoint: browserlessUrl,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page: any = await browser.newPage();

    console.log("hello");
    // Navigate to LinkedIn login page
    console.log("Navigating to LinkedIn login page...");
    await page.goto(
      "https://www.linkedin.com/authwall?trk=gf&trkInfo=AQGmjmvrG6bUygAAAZR9NB14TW3Em6_WQN15ydc3KIBOGQaOqUm13f7xh6b8mA_GDVGcKZTzxwwh7vFMljjxYSlhgWx9HB6m2fia1cYg77-LjKFG5bTby3tg-3IxIavUWU4Ab9s=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Famitesh-singh-504b2b281%2F#main-content"
    );

    // Wait for and click the login button
    const loginButtonSelector =
      "button[data-tracking-control-name='auth_wall_desktop_profile-login-toggle']";
    console.log("Clicking login button...");
    await page.waitForSelector(loginButtonSelector);
    await page.evaluate((selector: any) => {
      const button: any = document.querySelector(selector);
      if (button) {
        button.click();
      }
    }, loginButtonSelector);

    await delay(2000);

    // Enter email
    console.log("Entering email...");
    const emailSelector =
      "input[data-tracking-control-name='seo-authwall-base_sign-in-session-key']";
    await page.waitForSelector(emailSelector);
    await page.type(emailSelector, email);

    await delay(2000);

    // Enter password
    console.log("Entering password...");
    const passwordSelector =
      'input[data-tracking-control-name="seo-authwall-base_sign-in-password"]';
    await page.waitForSelector(passwordSelector);
    await page.type(passwordSelector, password);

    await delay(2000);

    // Click the sign-in button
    console.log("Clicking sign-in button...");
    const signInButtonSelector =
      'button[data-tracking-control-name="seo-authwall-base_sign-in-submit-btn"]';
    await page.waitForSelector(signInButtonSelector);
    await page.evaluate((selector: any) => {
      const button: any = document.querySelector(selector);
      if (button) {
        button.click();
      }
    }, signInButtonSelector);

    await delay(2000);

    // Post content
    console.log("Navigating to post creation...");
    const postButtonSelector =
      'button[class="artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary ember-view JegQLGkQiYkxUpAgLCgIZUcBsiThgonM"]';
    await page.waitForSelector(postButtonSelector, { visible: true });
    await delay(4000);
    await page.evaluate((selector: any) => {
      const button: any = document.querySelector(selector);
      if (button) {
        button.click();
      }
    }, postButtonSelector);

    await delay(2000);

    // Add media
    console.log("Uploading media...");
    const addMediaButtonSelector = "button[aria-label='Add media']";
    await page.waitForSelector(addMediaButtonSelector);
    await page.evaluate((selector: any) => {
      const button: any = document.querySelector(selector);
      if (button) {
        button.click();
      }
    }, addMediaButtonSelector);
    await delay(2000);

    const fileInputSelector =
      "input[class='media-editor-file-selector__upload-media-input visually-hidden']";
    await page.waitForSelector(fileInputSelector);
    const fileInput = await page.$(fileInputSelector);
    const convertedPath = convertFilePath(imgOrVideoPath); // Handle file path conversion
    await fileInput.uploadFile(convertedPath);

    await delay(2000);

    const nextButtonSelector =
      "button[class='share-box-footer__primary-btn artdeco-button artdeco-button--2 artdeco-button--primary ember-view']";
    await page.waitForSelector(nextButtonSelector);
    await page.evaluate((selector: any) => {
      const button: any = document.querySelector(selector);
      if (button) {
        button.click();
      }
    }, nextButtonSelector);

    await delay(2000);

    // Write post content
    console.log("Writing post content...");
    const postContentSelector =
      "div[data-test-ql-editor-contenteditable='true']";
    await page.waitForSelector(postContentSelector);
    await page.type(postContentSelector, content);

    await delay(3000);

    // Publish post
    console.log("Publishing post...");
    const postButtonSelector2 =
      "button[class='share-actions__primary-action artdeco-button artdeco-button--2 artdeco-button--primary ember-view']";
    await page.waitForSelector(postButtonSelector2);
    await page.evaluate((selector: any) => {
      const button: any = document.querySelector(selector);
      if (button) {
        button.click();
      }
    }, postButtonSelector2);
    return true;
  } catch (error) {
    console.error("Error posting on LinkedIn:", error);
    return false;
  } finally {
    if (browser) {
      console.log("Closing browser...");
    }
  }
};
