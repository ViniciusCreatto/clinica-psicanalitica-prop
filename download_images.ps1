$images = @{
    "hero-image.jpg" = "https://images.unsplash.com/photo-1583167562185-77889832466a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "about-image.jpg" = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
}

foreach ($image in $images.GetEnumerator()) {
    $outputPath = Join-Path "C:\Users\Ana Julia\CascadeProjects\clinica-psicanalitica\assets\images" $image.Key
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
}
