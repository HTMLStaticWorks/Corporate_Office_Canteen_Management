$files = Get-ChildItem -Path '.' -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    if ($file.Name -eq 'home-2.html') {
        $content = $content -replace '<a href="home-2.html" class="md-nav-link active">Home</a>', '<a href="index.html" class="md-nav-link">Home</a>`r`n                <a href="home-2.html" class="md-nav-link active">Home 2</a>'
    } else {
        $content = $content -replace '(<a href="index.html" class="md-nav-link">Home</a>)', '$1`r`n                <a href="home-2.html" class="md-nav-link">Home 2</a>'
        $content = $content -replace '(<a href="index.html" class="md-nav-link active">Home</a>)', '$1`r`n                <a href="home-2.html" class="md-nav-link">Home 2</a>'
    }
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}
Write-Output "Navigation updated in all HTML files."
