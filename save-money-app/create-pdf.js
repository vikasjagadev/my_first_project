const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('../Vercel-Fix-Instructions.pdf'));

doc.fontSize(24).text('How to Fix the Vercel 404 NOT FOUND Error', { align: 'center' });
doc.moveDown();

doc.fontSize(14).text('This error occurs when Vercel cannot find the package.json file in the folder you uploaded. This usually happens because Windows unzips files into an extra parent folder.');
doc.moveDown();

doc.fontSize(18).text('Step-by-Step Fix:');
doc.moveDown();

doc.fontSize(14).text('1. Extract the ZIP file');
doc.fontSize(12).text('Right-click "save-money-app-v2.zip" and choose "Extract All...".');
doc.moveDown();

doc.fontSize(14).text('2. Open the extracted folder');
doc.fontSize(12).text('Double click into the extracted folder. Keep opening folders until you see a file named exactly "package.json" (along with src, public, etc).');
doc.moveDown();

doc.fontSize(14).text('3. Identify the Correct Folder');
doc.fontSize(12).text('The folder you are currently inside (the one that contains package.json) is the ONLY folder you should upload to Vercel.');
doc.moveDown();

doc.fontSize(14).text('4. Upload to Vercel');
doc.fontSize(12).text('Go to your Vercel Dashboard, click Add New -> Project. Go up one level in your file explorer, and DRAG THAT SPECIFIC FOLDER (the one containing package.json) directly into the Vercel browser window.');
doc.moveDown();

doc.fontSize(14).text('5. Wait for Build');
doc.fontSize(12).text('Vercel will detect it as a Next.js App Router project and deploy it. The 404 error will be gone!');
doc.moveDown();
doc.moveDown();

doc.fontSize(12).text('Note: Your Next.js app is also running locally. You can always view it instantly without deploying by opening http://localhost:3000 in your browser.', { align: 'center', color: 'grey' });

doc.end();
