HealingMart 추억의 그림 퍼즐 v3.4.0

1. hm-mini-game-dist 저장소 루트에 picture-puzzle 폴더를 업로드합니다.
2. 자동 목록 갱신도 사용할 경우 .github/workflows/update-picture-puzzle-artworks.yml을 저장소 루트 기준으로 업로드합니다.
3. Blogger에는 blogger/HealingMart_Memory_Picture_Puzzle_v3.4.0_Blogger.html 내용을 붙여넣습니다.

배포 주소
- 목록: https://healingmart.github.io/hm-mini-game-dist/picture-puzzle/artworks.json
- 첫 이미지: https://healingmart.github.io/hm-mini-game-dist/picture-puzzle/artworks/001.webp

이미지 규칙
- 파일명은 001부터 999까지 3자리 숫자입니다.
- 지원 확장자: webp, png, jpg, jpeg
- 같은 번호에 서로 다른 확장자의 파일을 둘 이상 올리면 자동 생성이 중단됩니다.
- 현재 24개 작품은 기존 게임의 내부 ID를 보존해 001~008, 013~016, 018, 020~025, 029~032, 034 번호를 사용합니다.
- 빠진 번호는 오류가 아니며 새 작품 번호로 사용할 수 있습니다.

중요
- Blogger HTML은 먼저 artworks.json을 읽고 실패하면 포함된 24개 외부 URL 목록을 사용합니다.
- 작품 이미지는 HTML에 Base64로 내장하지 않았습니다.
- 효과음만 매우 작은 Base64 데이터로 HTML 안에 유지했습니다.
