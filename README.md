# 🍽️ Contribution au Projet Open Source  
## Optimisez la Gestion d’un Restaurant avec Angular & NgRx

## 📌 Contexte
Ce projet open source vise à développer une application moderne permettant de résoudre plusieurs problématiques liées à la gestion quotidienne d’un restaurant.  
Il repose sur **Angular**, **NgRx** et une architecture scalable orientée *feature*.

---

## 🎯 Objectif principal
Mettre en place :
- Une **architecture globale robuste**
- Un **socle NgRx** maintenable
- Des **services transverses**
- Un **routing modulaire**
- Un **design system cohérent** avec Tailwind CSS

---

## 🧱 Architecture globale du projet

```bash
src/
 ├─ app/
 │   ├─ core/
 │   ├─ shared/
 │   ├─ features/
 │   │   ├─ menu/
 │   │   ├─ order/
 │   │   ├─ complaint/
 │   ├─ store/
 │   ├─ app.routes.ts
 │   └─ app.config.ts
 ├─ styles.css
 └─ index.html
```


---

## 📁 Détail des dossiers & fichiers

### 🔹 `app/core/` — Socle applicatif (Singletons)
Contient tous les éléments globaux et partagés dans toute l’application.


```bash
core/
├─ services/
│ ├─ menu-api.service.ts
│ └─ local-storage.service.ts
└─ layout/
└─ main-layout.component.ts
```

#### ✅ `menu-api.service.ts`
- Service centralisé pour récupérer les plats depuis une API externe  
- Ajoute dynamiquement la notion de **disponibilité des plats**

#### ✅ `local-storage.service.ts`
- Service générique et typé
- Permet la persistance des données (cache, mode offline)
- Réutilisable par toutes les features

#### ✅ `main-layout.component.ts`
- Layout global (header / footer / contenu)
- Utilise `router-outlet`
- Applique le thème global **Tailwind CSS**

---

### 🔹 `app/shared/` — Éléments réutilisables
Contient les éléments mutualisés de l’application.

```bash
shared/
├─ models/
│ ├─ base.model.ts
│ └─ api-state.model.ts
├─ ui/
├─ pipes/
└─ directives/
```

#### ✅ `base.model.ts`
- Interface de base pour les entités métier
- Contient `id`, dates, etc.

#### ✅ `api-state.model.ts`
- Modèle générique pour gérer les états NgRx :
  - `loading`
  - `data`
  - `error`

---

### 🔹 `app/features/` — Architecture par feature
Chaque fonctionnalité est :
- Isolée
- Lazy-loaded
- Scalable

```bash
features/
├─ menu/
│ ├─ pages/
│ │ └─ menu-page.component.ts
│ ├─ store/
│ └─ menu.routes.ts
├─ order/
└─ complaint/
```

---

### 🔹 `app/store/` — Store global NgRx

```bash
 store/
 ├─ app.state.ts
 └─ index.ts
```

- Centralise l’état global de l’application
- Facilite l’extension future du store

---

## ⚙️ Installation du projet

### 🔹 Étape 1 : Cloner le dépôt
```bash
git clone https://github.com/kooutar/RestaurantWithNgRx
cd RestaurantWithNgRx
```

### 🔹 Étape 2 : Installer les dépendances
```bash
npm install
```
Cette commande installe :

Angular

NgRx

Tailwind CSS
### 🔹 Étape 3 : Lancer l’application
```bash
ng serve
```
L’application sera accessible sur :
👉 http://localhost:4200