# Dragon Ball Z Fighter

A 3D 1v1 fighting game inspired by Tekken 7, featuring characters from Dragon Ball Super.

## Features
- 3D graphics using Three.js
- Tekken-style movement and controls
- Attack system with combos and knockback
- Transformation at high power level (glow effect)
- Interactive level with walls
- Win/lose conditions

## Local Setup
1. Open the project in VSCode.
2. Run the server: In terminal, `cd "c:\Users\HP\gOKU\DBZ_Fighter"; & "C:\Program Files\nodejs\node.exe" server.js`
3. Open browser to http://127.0.0.1:8080/
4. Play!

## Controls
- W/A/S/D: Move player
- Q/E: Sidestep left/right
- Space: Attack (punch)
- Enemy moves and attacks automatically

## Deploy to GitHub Pages (Online)
Follow these simple steps to play online:

1. **Sign up for GitHub** (if you don't have an account):
   - Go to https://github.com
   - Click "Sign up" and create a free account.

2. **Create a New Repository**:
   - Click the "+" in the top right > "New repository".
   - Name it "DBZ-Fighter" (or anything you like).
   - Make it **Public**.
   - **Do NOT** check "Add a README file" or anything else.
   - Click "Create repository".

3. **Push Code to GitHub**:
   - Copy the repository URL (looks like https://github.com/yourusername/DBZ-Fighter.git).
   - Open Command Prompt or PowerShell in the game folder (c:\Users\HP\gOKU\DBZ_Fighter).
   - Run these commands one by one:
     ```
     & "C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/yourusername/DBZ-Fighter.git
     & "C:\Program Files\Git\cmd\git.exe" push -u origin master
     ```
     - Replace `yourusername` with your GitHub username.
     - Enter your GitHub username and password when asked.

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click "Settings" (gear icon).
   - Scroll down to "Pages" in the left menu.
   - Under "Source", select "Deploy from a branch".
   - Choose "master" branch and "/ (root)" folder.
   - Click "Save".
   - Wait 1-2 minutes, then refresh the page. You'll see a link like https://yourusername.github.io/DBZ-Fighter/

5. **Play Online**:
   - Open the link in your browser. The game will load and run!

If stuck, search "how to create GitHub repository" on YouTube for videos.

## Notes
- Characters are placeholders (colored boxes). For realistic models, load GLTF files from assets folder.
- Add more characters, transformations, combos, and stages in future updates.
- Original code implementation.