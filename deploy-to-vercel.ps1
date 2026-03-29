Write-Host "Starting Vercel Deployment for OpsifyLabs..."
Write-Host "============================================="
Write-Host "This will open your browser to log heavily into Vercel."
Write-Host "Just reply 'Y' (yes) to the prompts that appear here!"
Write-Host ""
$env:Path = "c:\Users\Admin\Documents\Opsifylabs\node-v20.11.1-win-x64;$env:Path"
cd c:\Users\Admin\Documents\Opsifylabs\opsifylabs-web
npx vercel
Write-Host ""
Write-Host "Deployment finished. Your live URL should be provided above!"
pause
