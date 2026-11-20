# myPortfolio · Nsayi Juscarni Geoffroy

Questo è il mio portfolio personale, che ho progettato e sviluppato da zero.

Sono studente al terzo anno di **Ingegneria Informatica ed Elettronica** all'Università degli Studi di Perugia.
Lavoro su due fronti: la **data science e il machine learning in Python** e lo **sviluppo backend in Java con Spring Boot**.
Con questo sito presento i miei progetti, le mie competenze e il mio percorso.

## Cosa contiene

- **Home**: presentazione, scheda profilo animata e rete di dati interattiva
- **Chi sono**: il mio percorso e alcuni numeri chiave
- **Esperienza**: il mio tirocinio di 225 ore in machine learning (previsione della durata dei cicli di riscaldamento HVAC su oltre 640.000 osservazioni IoT)
- **Progetti**: i miei giochi Aegis Defender e Snake (Java Swing) con galleria di screenshot, Employee Management API, Studente API, dashboard Streamlit e progetto di data science IBM
- **Competenze**, **Percorso** (formazione, certificazioni, lingue) e **Contatti**

## Tecnologie

Sito statico in HTML, CSS e JavaScript, senza framework né build:

```
index.html        struttura della pagina
css/style.css     stili (tema nero e ciano, responsive)
js/init.js        caricato nel <head> prima del primo rendering
js/main.js        navigazione, animazioni allo scroll, contatori, rete animata, gallerie, visualizzatore
assets/icons/     loghi degli strumenti (fonti e licenze in icons-credits.json)
assets/img/       screenshot dei miei giochi Aegis Defender e Snake
```

Le animazioni rispettano l'impostazione di sistema «riduci movimento».

## Avvio in locale

Aprire `index.html` nel browser, oppure servire la cartella, ad esempio:

```bash
python -m http.server 8000
```

e andare su <http://localhost:8000>.

## Contatti

- GitHub: [juscarni](https://github.com/juscarni)
- E-mail: juscarni@gmail.com
