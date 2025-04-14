const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');

// Define icon sizes
const iconSizes = {
  icon: 1024,
  adaptiveIcon: 1024,
  splash: 1242,
  favicon: 196
};

// Function to convert SVG to PNG
async function convertSvgToPng(svgPath, outputPath, size) {
  try {
    // Read SVG file
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Convert SVG to PNG using sharp
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${outputPath}:`, error);
  }
}

// Function to create splash screen
async function createSplashScreen(iconPath, outputPath, size) {
  try {
    // Create canvas
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Fill background with white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);
    
    // Load icon
    const icon = await loadImage(iconPath);
    
    // Calculate position to center the icon (70% of the size)
    const iconSize = size * 0.7;
    const position = (size - iconSize) / 2;
    
    // Draw icon
    ctx.drawImage(icon, position, position, iconSize, iconSize);
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${outputPath}:`, error);
  }
}

// Main function
async function generateIcons() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  const svgPath = path.join(assetsDir, 'icon.svg');
  
  // Check if SVG exists
  if (!fs.existsSync(svgPath)) {
    console.error('SVG icon not found:', svgPath);
    return;
  }
  
  // Generate app icon
  await convertSvgToPng(
    svgPath,
    path.join(assetsDir, 'icon.png'),
    iconSizes.icon
  );
  
  // Generate adaptive icon
  await convertSvgToPng(
    svgPath,
    path.join(assetsDir, 'adaptive-icon.png'),
    iconSizes.adaptiveIcon
  );
  
  // Generate favicon
  await convertSvgToPng(
    svgPath,
    path.join(assetsDir, 'favicon.png'),
    iconSizes.favicon
  );
  
  // Generate splash screen
  await createSplashScreen(
    path.join(assetsDir, 'icon.png'),
    path.join(assetsDir, 'splash-icon.png'),
    iconSizes.splash
  );
  
  console.log('All icons generated successfully!');
}

// Run the script
generateIcons().catch(console.error);
