# Słoje — konstrukcje drewniane

Strona firmy ciesielskiej, propozycja B2 „Orzech” (wersja poprawiona). Jedna strona: oferta, realizacje, proces, opinie, FAQ i formularz wyceny.

## Struktura

- `index.html` — cała strona (HTML + CSS + JS, bez zależności)
- `img/` — zdjęcia w WebP, każde w dwóch rozmiarach (np. `stodola.webp` i `stodola-480.webp`), faktury drewna, ikona i obrazek do podglądu linku (`og.jpg`)
- `fonts/` — czcionki Manrope i Newsreader (kursywa), przycięte do polskich znaków
- `narzedzia/jeden-plik.js` — składa stronę w jeden plik HTML do podglądu / wysłania klientowi:
  ```bash
  node narzedzia/jeden-plik.js   # → dist/sloje-b2-jeden-plik.html
  ```

Na serwer wrzuca się `index.html`, `img/` i `fonts/`. Podgląd lokalny: otwórz `index.html` w przeglądarce.

## Publikacja (GitHub Pages)

Strona jest serwowana z gałęzi `gh-pages`: **https://szligor.github.io/Suchy/**

Po zmianach na `main` zaktualizuj ją tak:

```bash
git push origin main:gh-pages
```

## Przed publikacją podmień

Wszystkie miejsca są w `index.html` oznaczone jako PRZYKŁADOWE:

- telefon `+48 000 000 000`, e-mail `biuro@sloje.example`, adres, godziny, NIP,
- domenę `sloje.example` (canonical, `og:url`, `og:image` i dane firmy dla Google w `<head>`),
- linki Instagram / Facebook i link „Wystaw nam opinię w Google” (z panelu Google Firmy),
- ocenę 4,9 i liczbę opinii, przykładowe opinie, zdjęcia i dane realizacji,
- treść polityki prywatności (wzór — warto dać do sprawdzenia),
- zdjęcie na górze strony (obecnie stockowe) — najlepiej własne zdjęcie nowej konstrukcji.

## Formularz wyceny

Działa w trybie demo, dopóki `data-endpoint` w `<form … data-quote data-endpoint="">` jest pusty. Żeby wysyłał naprawdę, wpisz tam adres usługi formularzy (np. Formspree, Basin albo własny skrypt PHP) — dane idą jako `POST` z `FormData` (pola: `name`, `tel`, `email`, `type`, `msg`, `files`; `www` to pułapka na boty i powinno być puste).

## Nowe zdjęcia

WebP, około 900 px szerokości (realizacje w formacie 4:5) plus wersja 480 px z końcówką `-480` — przeglądarka sama wybiera mniejszą na telefonie.
