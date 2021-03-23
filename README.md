# electron-password-gen
A password generator written with the node.js and electron.js frameworks.

## Usage
Currently this project has very few dependancies, with the only requirements being that node.js is installed, and you have electron to run it. There will be an executable for download in the future, but as of now you should just download it and run it.
### Running
If you download the source code, open a terminal in the directory where `index.js`, `index.html`, and `package.json` are. Assuming you have electron installed, you should be able to run the command `npm start` and it will open the program.

##Future
In the future I plan to add some css, add an .exe download, and clean up a lot of the code, as well as removing a few known bugs.

##Known Bugs
• Randomly cutting the printed password short- I know about the bug and why it happens, I will push a fix for this very soon.
• Pressing enter in the input field deletes the contents- This isn't a high priority bug, but I do have a potential solution and will fix very soon.
• If you run `npm make build`, there is a window that breaks the main window, and then reopens it. This will be fixed soon.
