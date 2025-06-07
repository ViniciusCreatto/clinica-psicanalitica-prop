import requests
import os
from pathlib import Path

# URL da imagem
url = "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80"

# Caminho para salvar a imagem
output_path = Path("assets") / "hero-therapy.jpg"

# Criar pasta se não existir
os.makedirs(output_path.parent, exist_ok=True)

try:
    # Fazer o download da imagem
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    # Salvar a imagem
    with open(output_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    
    print(f"Imagem baixada com sucesso para {output_path}")
    
except Exception as e:
    print(f"Erro ao baixar a imagem: {e}")
