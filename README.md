# Driver's License Scanner

This project is a simple web app that allows the user to upload or take a photo of the back of their driver's license, scan the 2D barcode on the back, and display key information in a user-friendly format, including their name, address, and the date their license was issued. The app runs completely client-side, so no data is ever stored or transmitted. Still, it is important to note that the barcode contains a lot of personal information, so users should be cautious about where they use this app and consider testing it with an example image first.

**Try out a live demo:** [drivers-license-scanner.vercel.app](https://drivers-license-scanner.vercel.app/)

## Project Architecture

Technologies used: **React, TypeScript, Vite, and Vercel**

I chose to use React and TypeScript for this project since I have enjoyed using them previously, while Vite was a new build tool that I wanted to try out. I used the `react-webcam` library for the webcam, `html5-qrcode` to implement the barcode scanner, and `aamvajs` to parse the barcode data.

## Obstacles

I encountered several major obstacles during development. My first attempt involved extracting data from the front of the driver's license. I used `opencv.js` to process images, applying thresholding and other morphological operations to isolate the text as clearly as possible, before running OCR operations from `tesseract.js`. I successfully extracted several important elements with OCR, but it was not accurate enough for the project specification, so I decided to pivot to using the barcode scanner approach.

After switching to this approach, I used `zxing.js` for scanning the barcode, but it required near-perfect conditions to correctly scan a barcode: no rotation, clear contrast, and a high-quality image. I switched to `html5-qrcode` to scan more resiliently, which made a big improvement.

I also assumed that the barcode scanner performance provided by `html5-qrcode` would be consistent across all browsers, but then discovered that Chrome scanned barcodes much more reliably than Safari or any iOS browser. This was a significant issue, as I wanted the app to be accessible to as many users as possible. I eventually traced this issue down to the BarcodeDetector API, which `html5-qrcode` uses when it's available. However, the BarcodeDetector API is [far from being universally supported](https://caniuse.com/?search=BarcodeDetector%20API) at this point. Since there is no reliable polyfill for this API that supports pdf417 barcodes, I was not able to find a solution yet.

Another major obstacle was a parsing error that I found when I tried to host the project on Vercel, which came from the `aamva` library not correctly exporting its functions. Though it's not the most elegant long-term solution, I was able to resolve the issue by manually adding a patch to the `aamva` library using the `patch-package` library.

## Credits

Many thanks to the creators of all the libraries and tools used in this project! In particular, I appreciate `@mebjas` for the `html5-qrcode` library, which I used to implement the barcode scanner, and `@winfinit` for the `aamva` JS library, which was instrumental in parsing the barcode data. I also want to thank the developers behind TechStark's version of `opencv.js`, which I used to extensively experiment with processing driver's license images, though I ended up not needing it in the final project.

## Roadmap

### Functionality

- [x] Create basic GUI
- [x] Add webcam
  - [ ] Display live feed
  - [ ] Capture and recapture images
- [x] Implement pdf417 barcode scanner
  - [ ] Test with JPG, PNG
  - [ ] Improve accuracy on browsers without BarcodeDetector API (or find a polyfill for it)
- [x] Convert pdf417 to usable barcode info
  - [ ] Fix parsing error on hosted version
- [x] Display barcode info
  - [ ] Extrapolate issuance date from expiry date and state license laws

### User Experience and Interface

- [x] Add basic navigation buttons
- [x] Add toast messages for webcam status
- [x] Add toast messages for barcode scan
- [ ] Improve experience based on user flow
- [ ] Add in-app consent agreement to clarify data use
- [ ] Add loading indicators where necessary
- [ ] Explain webcam access request
