const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateOGPImage() {
    console.log('🚀 OGP画像生成を開始します...');
    
    // ブラウザを起動
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // ビューポートを設定（OGP画像サイズ）
        await page.setViewport({
            width: 1200,
            height: 630,
            deviceScaleFactor: 2 // 高解像度で生成
        });
        
        // HTMLファイルを読み込み
        const htmlPath = path.join(__dirname, 'images', 'ogp-image.html');
        await page.goto(`file://${htmlPath}`, {
            waitUntil: 'networkidle0'
        });
        
        // 画像が完全に読み込まれるまで待機
        await page.waitForTimeout(2000);
        
        // スクリーンショットを撮影
        const outputPath = path.join(__dirname, 'images', 'ogp-image.jpg');
        await page.screenshot({
            path: outputPath,
            type: 'jpeg',
            quality: 90,
            fullPage: false
        });
        
        console.log('✅ OGP画像が生成されました:', outputPath);
        
        // PNG版も生成
        const pngPath = path.join(__dirname, 'images', 'ogp-image.png');
        await page.screenshot({
            path: pngPath,
            type: 'png',
            fullPage: false
        });
        
        console.log('✅ PNG版も生成されました:', pngPath);
        
    } catch (error) {
        console.error('❌ エラーが発生しました:', error);
    } finally {
        await browser.close();
    }
}

// スクリプトが直接実行された場合のみ実行
if (require.main === module) {
    generateOGPImage();
}

module.exports = { generateOGPImage }; 