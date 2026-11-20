# Portfolio · Nsayi Juscarni Geoffroy

Portfolio personnel d'un étudiant en 3e année d'ingénierie informatique à l'Université de Pérouse,
entre **data science / machine learning en Python** et **développement backend Java avec Spring Boot**.

## Contenu

- **Accueil** : présentation, fiche de profil animée et réseau de données interactif
- **À propos** : parcours et chiffres clés
- **Expérience** : stage de 225 h en machine learning (prédiction des cycles de chauffage HVAC)
- **Projets** : Aegis Defender et Snake (Java Swing) avec galeries de captures, Employee Management API,
  Studente API, dashboard Streamlit, projet de data science IBM
- **Compétences**, **Parcours** (formation, certifications, langues) et **Contact**

## Technique

Site statique, sans framework ni étape de build :

```
index.html        structure de la page
css/style.css     styles (thème noir et cyan, responsive)
js/init.js        chargé dans <head> avant le premier affichage
js/main.js        navigation, animations au défilement, compteurs, réseau animé, galeries, visionneuse
assets/icons/     logos des outils (sources et licences dans icons-credits.json)
assets/img/       captures d'Aegis Defender et de Snake
```

Les animations respectent le réglage « réduire les animations » du système.

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou servir le dossier, par exemple :

```bash
python -m http.server 8000
```

puis aller sur <http://localhost:8000>.

## Contact

- GitHub : [juscarni](https://github.com/juscarni)
- E-mail : juscarni@gmail.com
